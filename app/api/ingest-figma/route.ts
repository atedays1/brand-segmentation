import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const FIGMA_DATA_PATH = path.join(DATA_DIR, 'figma-data.json')
const PUBLIC_FIGMA_DATA_PATH = path.join(process.cwd(), 'public', 'figma-data.json')
const EXTRACTED_IMAGES_DIR = path.join(process.cwd(), 'public', 'extracted-images')

function sanitizeId(id: string): string {
  return String(id).replace(/:/g, '-')
}

type FigmaItem = {
  id: string
  type: string
  name: string
  frameName?: string
  text?: string
  imageBase64?: string
  imagePath?: string
}

type Payload = Record<string, FigmaItem[]>

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Payload
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(EXTRACTED_IMAGES_DIR)) {
      fs.mkdirSync(EXTRACTED_IMAGES_DIR, { recursive: true })
    }

    const output: Payload = {}

    for (const [frameName, items] of Object.entries(payload)) {
      if (!Array.isArray(items)) continue
      output[frameName] = []
      for (const item of items) {
        const { id, type, name, frameName: itemFrame, text, imageBase64 } = item
        const outItem: FigmaItem = {
          id: id || '',
          type: type || 'UNKNOWN',
          name: name || '',
          frameName: frameName || itemFrame,
        }
        if (text != null) outItem.text = String(text)
        if (imageBase64) {
          const safeId = sanitizeId(id)
          const filename = `${safeId}.png`
          const filePath = path.join(EXTRACTED_IMAGES_DIR, filename)
          const buf = Buffer.from(imageBase64, 'base64')
          fs.writeFileSync(filePath, buf)
          outItem.imagePath = `/extracted-images/${filename}`
        }
        output[frameName].push(outItem)
      }
    }

    const jsonStr = JSON.stringify(output, null, 2)
    fs.writeFileSync(FIGMA_DATA_PATH, jsonStr, 'utf8')
    fs.writeFileSync(PUBLIC_FIGMA_DATA_PATH, jsonStr, 'utf8')

    const count = Object.values(output).reduce((sum, arr) => sum + arr.length, 0)
    return NextResponse.json(
      { ok: true, count },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json(
      { error: message },
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Figma ingest API. Send POST with JSON payload (frames with text and base64 images).' },
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
