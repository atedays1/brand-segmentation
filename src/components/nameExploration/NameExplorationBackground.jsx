/**
 * Soft sage/teal washes for the light name-exploration deck.
 */
export function NameExplorationBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-1/4 -right-1/4 w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] rounded-full bg-teal-400/10 blur-3xl animate-[blobDrift1_28s_ease-in-out_infinite]" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[75vw] h-[75vw] max-w-[1000px] max-h-[1000px] rounded-full bg-emerald-300/15 blur-3xl animate-[blobDrift2_32s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 left-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-cyan-200/10 blur-3xl" />
    </div>
  )
}
