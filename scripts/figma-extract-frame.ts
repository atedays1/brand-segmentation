#!/usr/bin/env node
/**
 * Figma frame extractor: given a file URL, flattens nodes (single frame or entire board),
 * downloads images to public/extracted/, and writes public/extracted/data.json.
 *
 * Usage:
 *   Entire board (all top-level frames on all pages):
 *     npm run figma-extract -- --url "https://www.figma.com/file/KEY/..."
 *   Single frame by name:
 *     npm run figma-extract -- --url "..." --frame "Frame Name"
 *   Single frame by node ID:
 *     npm run figma-extract -- --url "..." --node-id "1:2"
 *
 * Requires: FIGMA_ACCESS_TOKEN in env or --token
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { GetFileResponse, GetImagesResponse } from '@figma/rest-api-spec'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const FIGMA_API = 'https://api.figma.com/v1'

/** Minimal node shape for traversal (API returns untyped children in practice). */
interface FigmaNode {
  id: string
  name: string
  type: string
  children?: FigmaNode[]
  characters?: string
  visible?: boolean
  [key: string]: unknown
}

/** Flattened element for data.json */
interface FlatElement {
  id: string
  type: string
  name: string
  text?: string
  imagePath?: string
  visible?: boolean
  /** Set when extracting entire board: name of the top-level frame this node belongs to */
  frameName?: string
}

const EXPORTABLE_TYPES = new Set([
  'FRAME',
  'COMPONENT',
  'INSTANCE',
  'RECTANGLE',
  'ELLIPSE',
  'VECTOR',
  'BOOLEAN_OPERATION',
  'GROUP',
  'COMPONENT_SET',
])

function parseFileKey(url: string): string | null {
  const m = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/)
  return m ? m[1]! : null
}

function parseArgs(): { url: string; token: string; frame: string | null; nodeId: string | null } {
  const args = process.argv.slice(2)
  let url = ''
  let token = process.env.FIGMA_ACCESS_TOKEN ?? ''
  let frame: string | null = null
  let nodeId: string | null = null
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) url = (args[++i] ?? '').replace(/^["']|["']$/g, '')
    else if (args[i] === '--token' && args[i + 1]) token = (args[++i] ?? '').replace(/^["']|["']$/g, '')
    else if (args[i] === '--frame' && args[i + 1]) frame = (args[++i] ?? '').replace(/^["']|["']$/g, '').trim() || null
    else if (args[i] === '--node-id' && args[i + 1]) nodeId = (args[++i] ?? '').replace(/^["']|["']$/g, '').trim() || null
  }
  return { url, token, frame, nodeId }
}

async function fetchFigma<T>(token: string, path: string): Promise<T> {
  const res = await fetch(`${FIGMA_API}${path}`, {
    headers: { 'X-FIGMA-TOKEN': token },
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Figma API ${res.status}: ${t}`)
  }
  return res.json() as Promise<T>
}

function findFrameByName(node: FigmaNode, name: string): FigmaNode | null {
  if (node.name === name) return node
  const children = node.children ?? []
  for (const c of children) {
    const found = findFrameByName(c, name)
    if (found) return found
  }
  return null
}

function findFrameById(node: FigmaNode, id: string): FigmaNode | null {
  if (node.id === id) return node
  const children = node.children ?? []
  for (const c of children) {
    const found = findFrameById(c, id)
    if (found) return found
  }
  return null
}

function flattenNodes(root: FigmaNode, out: FlatElement[], frameName?: string): void {
  const visible = root.visible !== false
  const el: FlatElement = {
    id: root.id,
    type: root.type,
    name: root.name,
    visible: visible,
  }
  if (frameName) el.frameName = frameName
  if (root.type === 'TEXT' && typeof root.characters === 'string') {
    el.text = root.characters
  }
  out.push(el)
  const children = root.children ?? []
  for (const c of children) {
    flattenNodes(c, out, frameName)
  }
}

function collectImageNodeIds(root: FigmaNode, ids: string[]): void {
  if (root.visible === false) return
  if (EXPORTABLE_TYPES.has(root.type)) ids.push(root.id)
  const children = root.children ?? []
  for (const c of children) collectImageNodeIds(c, ids)
}

async function downloadImage(url: string, filePath: string): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`)
  const buf = await res.arrayBuffer()
  fs.writeFileSync(filePath, Buffer.from(buf))
}

function main(): void {
  const { url, token, frame, nodeId } = parseArgs()

  if (!url) {
    console.error('Missing --url. Example: --url "https://www.figma.com/file/KEY/Name"')
    process.exit(1)
  }
  if (!token) {
    console.error('Missing token. Set FIGMA_ACCESS_TOKEN or pass --token')
    process.exit(1)
  }
  const fileKey = parseFileKey(url)
  if (!fileKey) {
    console.error('Invalid Figma URL. Use https://www.figma.com/file/KEY/... or .../design/KEY/...')
    process.exit(1)
  }

  const outDir = path.join(projectRoot, 'public', 'extracted')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  run(fileKey, token, frame, nodeId, outDir).catch((e) => {
    console.error(e)
    process.exit(1)
  })
}

async function run(
  fileKey: string,
  token: string,
  frameName: string | null,
  nodeId: string | null,
  outDir: string
): Promise<void> {
  console.log('Fetching file...')
  const file = await fetchFigma<GetFileResponse>(token, `/files/${fileKey}`)
  const doc = file.document as unknown as FigmaNode
  if (!doc?.children) {
    console.error('File has no document children')
    process.exit(1)
  }

  const flat: FlatElement[] = []
  const imageIds: string[] = []
  const extractBoard = !frameName && !nodeId

  if (extractBoard) {
    // Entire board: all top-level frames on every page
    let frameCount = 0
    for (const page of doc.children) {
      const frames = page.children ?? []
      for (const frame of frames) {
        flattenNodes(frame, flat, frame.name)
        collectImageNodeIds(frame, imageIds)
        frameCount++
      }
    }
    console.log(`Extracting entire board: ${frameCount} frame(s), flattening nodes...`)
  } else {
    let root: FigmaNode | null = null
    if (nodeId) {
      root = findFrameById(doc, nodeId)
      if (!root) {
        console.error(`Node ID not found: ${nodeId}`)
        process.exit(1)
      }
    } else {
      for (const page of doc.children) {
        root = findFrameByName(page, frameName!)
        if (root) break
      }
      if (!root) {
        const topNames = doc.children?.flatMap((p: FigmaNode) => p.children ?? []).map((n: FigmaNode) => n.name) ?? []
        console.error(`Frame not found: "${frameName}". Top-level names: ${topNames.slice(0, 20).join(', ')}`)
        process.exit(1)
      }
    }
    console.log('Flattening nodes...')
    flattenNodes(root, flat)
    collectImageNodeIds(root, imageIds)
  }

  const imagePaths: Record<string, string> = {}
  if (imageIds.length > 0) {
    console.log(`Requesting ${imageIds.length} image(s)...`)
    const idsParam = imageIds.join(',')
    const imagesRes = await fetchFigma<GetImagesResponse>(
      token,
      `/images/${fileKey}?ids=${encodeURIComponent(idsParam)}&format=png&scale=2`
    )
    const urls = imagesRes.images ?? {}
    let i = 0
    for (const id of imageIds) {
      const url = urls[id]
      if (!url) {
        console.warn(`No image URL for node ${id}, skipping`)
        continue
      }
      const safeName = id.replace(/:/g, '-') + '.png'
      const filePath = path.join(outDir, safeName)
      await downloadImage(url, filePath)
      imagePaths[id] = `/extracted/${safeName}`
      i++
    }
    console.log(`Downloaded ${i} image(s) to public/extracted/`)
  }

  for (const el of flat) {
    if (imagePaths[el.id]) el.imagePath = imagePaths[el.id]
  }

  const dataPath = path.join(outDir, 'data.json')
  fs.writeFileSync(dataPath, JSON.stringify(flat, null, 2), 'utf8')
  console.log(`Wrote ${dataPath} (${flat.length} elements)`)
}

main()
