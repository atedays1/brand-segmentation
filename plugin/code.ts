/**
 * Figma plugin: scrapes selected Frames for TEXT and image nodes,
 * then POSTs JSON to http://localhost:3000/api/ingest-figma
 */
// Inlined at build time by build:plugin (see package.json)
const __html__ = '__FIGMA_UI_INLINE__';

const RECEIVER_URL = 'http://localhost:3000/api/ingest-figma';

function hasImageFill(node: SceneNode): boolean {
  if (!('fills' in node) || !node.fills) return false;
  const fills = node.fills as readonly Paint[];
  return fills.some((f) => f.type === 'IMAGE');
}

async function collectFrameData(frame: FrameNode): Promise<{ id: string; type: string; name: string; frameName: string; text?: string; imageBase64?: string }[]> {
  const frameName = frame.name;
  const items: { id: string; type: string; name: string; frameName: string; text?: string; imageBase64?: string }[] = [];

  const textNodes = frame.findAll((n) => n.type === 'TEXT') as TextNode[];
  for (const node of textNodes) {
    items.push({
      id: node.id,
      type: node.type,
      name: node.name,
      frameName,
      text: 'characters' in node ? String(node.characters) : undefined,
    });
  }

  // Nodes with image fill (pasted images, etc.)
  const imageFillNodes = frame.findAll((n) => (n.type === 'RECTANGLE' || n.type === 'INSTANCE') && hasImageFill(n));
  // Also export FRAME, COMPONENT, and any RECTANGLE/INSTANCE so we get thumbnails (not just text)
  const exportableTypes = ['FRAME', 'COMPONENT', 'INSTANCE', 'RECTANGLE', 'ELLIPSE', 'VECTOR', 'GROUP'];
  const otherVisualNodes = frame.findAll((n) => exportableTypes.includes(n.type) && n.id !== frame.id);
  const allImageCandidates = [...imageFillNodes];
  const seen = new Set(allImageCandidates.map((n) => n.id));
  for (const n of otherVisualNodes) {
    if (!seen.has(n.id)) {
      seen.add(n.id);
      allImageCandidates.push(n);
    }
  }
  const exportPromises = allImageCandidates.map(async (node) => {
    try {
      const bytes = await node.exportAsync({
        format: 'PNG',
        constraint: { type: 'SCALE', value: 4 },
      });
      const base64 = figma.base64Encode(bytes);
      return {
        id: node.id,
        type: node.type,
        name: node.name,
        frameName,
        imageBase64: base64,
      };
    } catch {
      return { id: node.id, type: node.type, name: node.name, frameName };
    }
  });

  const imageItems = await Promise.all(exportPromises);
  items.push(...imageItems);

  return items;
}

async function exportSelection(): Promise<void> {
  const selection = figma.currentPage.selection;
  const frames = selection.filter((n) => n.type === 'FRAME') as FrameNode[];

  if (frames.length === 0) {
    figma.ui.postMessage({ type: 'error', message: 'Select one or more Frames.' });
    return;
  }

  const payload: Record<string, { id: string; type: string; name: string; frameName: string; text?: string; imageBase64?: string }[]> = {};

  for (const frame of frames) {
    const items = await collectFrameData(frame);
    payload[frame.name] = items;
  }

  try {
    const res = await fetch(RECEIVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      figma.ui.postMessage({ type: 'error', message: res.status + ': ' + text });
      return;
    }

    let count = 0;
    for (const arr of Object.values(payload)) count += arr.length;
    figma.ui.postMessage({ type: 'success', count });
  } catch (e) {
    figma.ui.postMessage({ type: 'error', message: e instanceof Error ? e.message : String(e) });
  }
}

figma.showUI(__html__, { width: 240, height: 120 });

figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === 'export') {
    exportSelection();
  }
};
