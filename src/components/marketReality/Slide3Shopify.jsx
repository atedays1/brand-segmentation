import { useRef } from 'react'
import { marketRealitySlides } from '../../data/marketRealitySlides'
import { marketRealityImages } from '../../data/marketRealityImages'
import { useMarketReality } from '../../context/MarketRealityContext'
import { RevealBlock } from './RevealBlock'

export function Slide3Shopify() {
  const ref = useRef(null)
  const ctx = useMarketReality()
  const s3 = marketRealitySlides.slide3
  const heroSrc = marketRealityImages?.slide3?.hero
  const stats = s3.stats || []

  const isActive = ctx?.currentSlide === 2
  const visibleUpToStep = (ctx && ctx.contentUnlocked) ? (isActive ? ctx.revealStep : 0) : 0

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 bg-white relative overflow-hidden"
    >
      {heroSrc && (
        <>
          <img
            src={heroSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-white/85" aria-hidden />
        </>
      )}
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <RevealBlock stepIndex={0} visibleUpToStep={visibleUpToStep}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{s3.title}</h2>
        </RevealBlock>
        {s3.note && (
          <RevealBlock stepIndex={1} visibleUpToStep={visibleUpToStep}>
            <p className="text-sm text-slate-500 italic mb-8">{s3.note}</p>
          </RevealBlock>
        )}
        {stats.length > 0 && (
          <RevealBlock stepIndex={2} visibleUpToStep={visibleUpToStep}>
            <div
              className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-10"
              aria-label="Key statistics"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-900 text-white rounded-xl p-4 md:p-5 text-center border border-slate-700/50 shadow-lg"
                >
                  <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-slate-300 mt-1 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>
        )}
        {(s3.blocks || []).map((block, i) => (
          <RevealBlock key={i} stepIndex={3 + i} visibleUpToStep={visibleUpToStep}>
            <div className={i === 0 ? '' : 'mt-8'}>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{block.label}</h3>
              <ul className="space-y-2 text-slate-600">
                {block.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        ))}
      </div>
    </div>
  )
}
