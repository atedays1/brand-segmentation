/**
 * Two large, soft emerald blobs that drift slowly in the background.
 * Used with a content layer that has backdrop-blur so text floats over a deep, shifting space.
 */
export function BackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -top-1/4 -right-1/4 w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] rounded-full bg-emerald-500/10 blur-3xl animate-[blobDrift1_28s_ease-in-out_infinite]"
      />
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[75vw] h-[75vw] max-w-[1000px] max-h-[1000px] rounded-full bg-emerald-500/5 blur-3xl animate-[blobDrift2_32s_ease-in-out_infinite]"
      />
    </div>
  )
}
