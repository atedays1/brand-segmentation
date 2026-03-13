import { useRef } from 'react'
import { marketRealitySlides } from '../../data/marketRealitySlides'
import { marketRealityImages } from '../../data/marketRealityImages'
import { useMarketReality } from '../../context/MarketRealityContext'
import { RevealBlock } from './RevealBlock'
import { EditableElement } from '../EditableElement'

export function Slide1MarketReality({ positionIndex = 0 }) {
  const ref = useRef(null)
  const ctx = useMarketReality()
  const s1 = marketRealitySlides.slide1
  const heroSrc = marketRealityImages?.slide1?.hero

  const presentMode = ctx?.presentMode ?? false
  const unlocked = presentMode ? (ctx && ctx.contentUnlocked) : true
  const isActive = ctx?.currentSlide === positionIndex
  const visibleUpToStep = presentMode ? (unlocked ? (isActive ? ctx.revealStep : 0) : 0) : 999
  const storySentences = (s1.story || '').split(/(?<=[.!?])\s+/).filter(Boolean)

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {heroSrc && (
        <>
          <img
            src={heroSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-slate-900/70" aria-hidden />
        </>
      )}
      {!unlocked ? null : (
      <EditableElement id={`slide-${positionIndex}`} className="max-w-3xl mx-auto w-full relative z-10">
        <div className="w-full">
        <RevealBlock stepIndex={0} visibleUpToStep={visibleUpToStep}>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{s1.title}</h1>
        </RevealBlock>
        {storySentences.map((line, i) => (
          <RevealBlock key={i} stepIndex={1 + i} visibleUpToStep={visibleUpToStep}>
            <p className="text-lg md:text-xl text-slate-300 mb-4 leading-relaxed">{line}</p>
          </RevealBlock>
        ))}
        <RevealBlock stepIndex={1 + storySentences.length} visibleUpToStep={visibleUpToStep}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">
            {s1.friction.label}
          </h2>
        </RevealBlock>
        {(s1.friction.bullets || []).map((bullet, i) => (
          <RevealBlock
            key={i}
            stepIndex={2 + storySentences.length + i}
            visibleUpToStep={visibleUpToStep}
          >
            <div className="flex gap-2 text-slate-300 mb-2">
              <span className="text-emerald-500 mt-1">•</span>
              <span>{bullet}</span>
            </div>
          </RevealBlock>
        ))}
        <RevealBlock stepIndex={2 + storySentences.length + (s1.friction.bullets?.length ?? 0)} visibleUpToStep={visibleUpToStep}>
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">
              {s1.solution.label}
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed">{s1.solution.body}</p>
          </div>
        </RevealBlock>
        </div>
      </EditableElement>
      )}
    </div>
  )
}
