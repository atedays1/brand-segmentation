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
 *   Skip image export (avoids 429 rate limit; still writes data.json with text/structure):
 *     npm run figma-extract -- --url "..." --no-images
 *   With --no-images, the file response is cached for 24h so later runs avoid the API.
 *   Use --no-cache to force a fresh fetch.
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

/** Max image IDs per Figma API call to avoid "Render timeout" (400). */
const IMAGE_BATCH_SIZE = 5

/** Delay (ms) between image batch requests to avoid rate limit (429). */
const BATCH_DELAY_MS = 15000

/** How long to use cached file when using --no-images (ms). 24h to avoid repeated 429s. */
const FILE_CACHE_TTL_MS = 24 * 60 * 60 * 1000

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getFileCachePath(fileKey: string): string {
  return path.join(projectRoot, '.figma-cache', 'files', `${fileKey}.json`)
}

function readFileCache(fileKey: string): GetFileResponse | null {
  const cachePath = getFileCachePath(fileKey)
  try {
    const stat = fs.statSync(cachePath)
    if (Date.now() - stat.mtimeMs > FILE_CACHE_TTL_MS) return null
    const raw = fs.readFileSync(cachePath, 'utf8')
    return JSON.parse(raw) as GetFileResponse
  } catch {
    return null
  }
}

function writeFileCache(fileKey: string, file: GetFileResponse): void {
  const cachePath = getFileCachePath(fileKey)
  const dir = path.dirname(cachePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(cachePath, JSON.stringify(file), 'utf8')
}

function parseFileKey(url: string): string | null {
  const m = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/)
  return m ? m[1]! : null
}

function parseArgs(): { url: string; token: string; frame: string | null; nodeId: string | null; noImages: boolean; noCache: boolean } {
  const args = process.argv.slice(2)
  let url = ''
  let token = process.env.FIGMA_ACCESS_TOKEN ?? ''
  let frame: string | null = null
  let nodeId: string | null = null
  let noImages = false
  let noCache = false
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) url = (args[++i] ?? '').replace(/^["']|["']$/g, '')
    else if (args[i] === '--token' && args[i + 1]) token = (args[++i] ?? '').replace(/^["']|["']$/g, '')
    else if (args[i] === '--frame' && args[i + 1]) frame = (args[++i] ?? '').replace(/^["']|["']$/g, '').trim() || null
    else if (args[i] === '--node-id' && args[i + 1]) nodeId = (args[++i] ?? '').replace(/^["']|["']$/g, '').trim() || null
    else if (args[i] === '--no-images') noImages = true
    else if (args[i] === '--no-cache') noCache = true
  }
  return { url, token, frame, nodeId, noImages, noCache }
}

async function fetchFigma<T>(token: string, path: string, retries = 5): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${FIGMA_API}${path}`, {
      headers: { 'X-FIGMA-TOKEN': token },
    })
    if (res.ok) return res.json() as Promise<T>
    const t = await res.text()
    const isRateLimit = res.status === 429
    const isTimeout = res.status === 400 && t.includes('timeout')
    if ((isRateLimit || isTimeout) && attempt < retries) {
      let waitMs: number
      if (isRateLimit && res.headers.get('Retry-After')) {
        const sec = parseInt(res.headers.get('Retry-After')!, 10)
        waitMs = Number.isNaN(sec) ? 60000 : Math.min(sec * 1000, 120000)
        console.warn(`Figma API 429, waiting ${waitMs / 1000}s (Retry-After)...`)
      } else {
        waitMs = Math.min(10000 * Math.pow(2, attempt), 90000)
        console.warn(`Figma API ${res.status}, retrying in ${waitMs / 1000}s (${attempt + 1}/${retries})...`)
      }
      await sleep(waitMs)
      continue
    }
    throw new Error(`Figma API ${res.status}: ${t}`)
  }
  throw new Error('Figma API failed after retries')
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
  const { url, token, frame, nodeId, noImages, noCache } = parseArgs()

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

  run(fileKey, token, frame, nodeId, outDir, noImages, noCache).catch((e) => {
    console.error(e)
    process.exit(1)
  })
}

async function run(
  fileKey: string,
  token: string,
  frameName: string | null,
  nodeId: string | null,
  outDir: string,
  noImages: boolean,
  noCache: boolean
): Promise<void> {
  let file: GetFileResponse
  if (noImages && !noCache) {
    const cached = readFileCache(fileKey)
    if (cached) {
      console.log('Using cached file (skip API call). Use --no-cache to force refresh.')
      file = cached
    } else {
      console.log('Fetching file...')
      file = await fetchFigma<GetFileResponse>(token, `/files/${fileKey}`)
      writeFileCache(fileKey, file)
    }
  } else {
    console.log('Fetching file...')
    file = await fetchFigma<GetFileResponse>(token, `/files/${fileKey}`)
    if (noImages) writeFileCache(fileKey, file)
  }
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
        if (!noImages) collectImageNodeIds(frame, imageIds)
        frameCount++
      }
    }
    console.log(`Extracting entire board: ${frameCount} frame(s), flattening nodes...`)
    if (noImages) console.log('Skipping image export (--no-images). data.json will have text/structure only.')
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
    if (!noImages) collectImageNodeIds(root, imageIds)
    if (noImages) console.log('Skipping image export (--no-images). data.json will have text/structure only.')
  }

  const imagePaths: Record<string, string> = {}
  if (!noImages && imageIds.length > 0) {
    console.log(`Requesting ${imageIds.length} image(s) in batches of ${IMAGE_BATCH_SIZE}...`)
    const urls: Record<string, string> = {}
    for (let i = 0; i < imageIds.length; i += IMAGE_BATCH_SIZE) {
      if (i > 0) await sleep(BATCH_DELAY_MS)
      const batch = imageIds.slice(i, i + IMAGE_BATCH_SIZE)
      const idsParam = batch.join(',')
      const imagesRes = await fetchFigma<GetImagesResponse>(
        token,
        `/images/${fileKey}?ids=${encodeURIComponent(idsParam)}&format=png&scale=2`
      )
      Object.assign(urls, imagesRes.images ?? {})
    }
    let downloaded = 0
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
      downloaded++
    }
    console.log(`Downloaded ${downloaded} image(s) to public/extracted/`)
  }

  for (const el of flat) {
    if (imagePaths[el.id]) el.imagePath = imagePaths[el.id]
  }

  const dataPath = path.join(outDir, 'data.json')
  fs.writeFileSync(dataPath, JSON.stringify(flat, null, 2), 'utf8')
  console.log(`Wrote ${dataPath} (${flat.length} elements)`)
}

main()
