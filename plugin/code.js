"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  const __html__ = "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body {\n      font-family: 'Inter', -apple-system, sans-serif;\n      padding: 12px;\n      min-width: 240px;\n    }\n    .hint {\n      font-size: 12px;\n      color: #666;\n      margin-bottom: 10px;\n      min-height: 1.4em;\n    }\n    .hint.ready { color: #0a0; font-weight: 500; }\n    button {\n      width: 100%;\n      padding: 10px 16px;\n      font-size: 14px;\n      font-weight: 600;\n      background: #0d99ff;\n      color: white;\n      border: none;\n      border-radius: 6px;\n      cursor: pointer;\n    }\n    button:hover:not(:disabled) {\n      background: #0b85e0;\n    }\n    button:disabled {\n      background: #ccc;\n      color: #888;\n      cursor: not-allowed;\n    }\n    #message {\n      margin-top: 8px;\n      font-size: 12px;\n      color: #666;\n      min-height: 1.2em;\n    }\n    #message.error { color: #e03; }\n    #message.success { color: #0a0; }\n  </style>\n</head>\n<body>\n  <div id=\"hint\" class=\"hint\">Select one or more Frames to enable export.</div>\n  <button id=\"exportBtn\" disabled>Export to Slide Deck</button>\n  <div id=\"message\"></div>\n  <script>\n    const btn = document.getElementById('exportBtn');\n    const hint = document.getElementById('hint');\n    const msg = document.getElementById('message');\n    function setMessage(text, type) {\n      msg.textContent = text;\n      msg.className = type || '';\n    }\n    function setSelection(frameCount) {\n      if (frameCount > 0) {\n        hint.textContent = frameCount === 1 ? '1 Frame selected' : frameCount + ' Frames selected';\n        hint.className = 'hint ready';\n        btn.disabled = false;\n      } else {\n        hint.textContent = 'Select one or more Frames to enable export.';\n        hint.className = 'hint';\n        btn.disabled = true;\n      }\n    }\n    btn.onclick = () => {\n      btn.disabled = true;\n      setMessage('Exporting...');\n      parent.postMessage({ pluginMessage: { type: 'export' } }, '*');\n    };\n    window.onmessage = (event) => {\n      const data = event.data.pluginMessage;\n      if (!data) return;\n      if (data.type === 'selectionUpdate') {\n        setSelection(data.frameCount != null ? data.frameCount : 0);\n        return;\n      }\n      btn.disabled = false;\n      if (data.type === 'success') {\n        setMessage('Success! ' + (data.count != null ? data.count + ' items.' : ''), 'success');\n      } else if (data.type === 'error') {\n        setMessage('Error: ' + (data.message || 'Unknown'), 'error');\n      }\n    };\n  </script>\n</body>\n</html>\n";
  const RECEIVER_URL = "http://localhost:3000/api/ingest-figma";
  function hasImageFill(node) {
    if (!("fills" in node) || !node.fills) return false;
    const fills = node.fills;
    return fills.some((f) => f.type === "IMAGE");
  }
  function fillToHex(fills) {
    var _a, _b, _c;
    if (!fills || fills.length === 0) return void 0;
    const first = fills[0];
    if (first.type !== "SOLID" || !("color" in first)) return void 0;
    const c = first.color;
    const r = Math.round(((_a = c.r) != null ? _a : 0) * 255);
    const g = Math.round(((_b = c.g) != null ? _b : 0) * 255);
    const b = Math.round(((_c = c.b) != null ? _c : 0) * 255);
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  function collectFrameData(frame) {
    return __async(this, null, function* () {
      const frameName = frame.name;
      const items = [];
      const textNodes = frame.findAll((n) => n.type === "TEXT");
      for (const node of textNodes) {
        const fontColor = fillToHex(node.fills);
        items.push(__spreadValues({
          id: node.id,
          type: node.type,
          name: node.name,
          frameName,
          text: "characters" in node ? String(node.characters) : void 0
        }, fontColor && { fontColor }));
      }
      const imageFillNodes = frame.findAll((n) => (n.type === "RECTANGLE" || n.type === "INSTANCE") && hasImageFill(n));
      const exportableTypes = ["FRAME", "COMPONENT", "INSTANCE", "RECTANGLE", "ELLIPSE", "VECTOR", "GROUP"];
      const otherVisualNodes = frame.findAll((n) => exportableTypes.includes(n.type) && n.id !== frame.id);
      const allImageCandidates = [...imageFillNodes];
      const seen = new Set(allImageCandidates.map((n) => n.id));
      for (const n of otherVisualNodes) {
        if (!seen.has(n.id)) {
          seen.add(n.id);
          allImageCandidates.push(n);
        }
      }
      const exportPromises = allImageCandidates.map((node) => __async(this, null, function* () {
        try {
          const bytes = yield node.exportAsync({
            format: "PNG",
            constraint: { type: "SCALE", value: 4 }
          });
          const base64 = figma.base64Encode(bytes);
          return {
            id: node.id,
            type: node.type,
            name: node.name,
            frameName,
            imageBase64: base64
          };
        } catch (e) {
          return { id: node.id, type: node.type, name: node.name, frameName };
        }
      }));
      const imageItems = yield Promise.all(exportPromises);
      items.push(...imageItems);
      return items;
    });
  }
  function exportSelection() {
    return __async(this, null, function* () {
      const selection = figma.currentPage.selection;
      const frames = selection.filter((n) => n.type === "FRAME");
      if (frames.length === 0) {
        figma.ui.postMessage({ type: "error", message: "Select one or more Frames." });
        return;
      }
      const payload = {};
      for (const frame of frames) {
        const items = yield collectFrameData(frame);
        payload[frame.name] = items;
      }
      try {
        const res = yield fetch(RECEIVER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const text = yield res.text();
        if (!res.ok) {
          figma.ui.postMessage({ type: "error", message: res.status + ": " + text });
          return;
        }
        let count = 0;
        for (const arr of Object.values(payload)) count += arr.length;
        figma.ui.postMessage({ type: "success", count });
      } catch (e) {
        figma.ui.postMessage({ type: "error", message: e instanceof Error ? e.message : String(e) });
      }
    });
  }
  function sendSelectionUpdate() {
    const frames = figma.currentPage.selection.filter((n) => n.type === "FRAME");
    figma.ui.postMessage({ type: "selectionUpdate", frameCount: frames.length });
  }
  figma.showUI(__html__, { width: 280, height: 140 });
  sendSelectionUpdate();
  figma.on("selectionchange", sendSelectionUpdate);
  figma.ui.onmessage = (msg) => {
    if (msg.type === "export") {
      exportSelection();
    }
  };
})();
