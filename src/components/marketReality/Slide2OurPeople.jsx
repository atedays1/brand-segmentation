import { useRef } from 'react'
import { marketRealitySlides } from '../../data/marketRealitySlides'
import { marketRealityImages } from '../../data/marketRealityImages'
import { personaImages } from '../../data/personaImages'
import { useMarketReality } from '../../context/MarketRealityContext'
import { RevealBlock } from './RevealBlock'

// Step 0: title, 1: intro, 2: Mike card+headline, 3–6: Mike paras, 7: Maria card+headline, 8–11: Maria paras

function PersonaCardHeader({ persona, imageSrc }) {
  return (
    <>
      {imageSrc ? (
        <div className="mb-6 -mx-6 -mt-6 md:-mx-8 md:-mt-8">
          <img
            src={imageSrc}
            alt={`${persona.name}, ${persona.role}`}
            className="w-full h-48 md:h-56 object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      ) : (
        <div className="w-full h-32 bg-slate-100 rounded-lg mb-6 flex items-center justify-center text-slate-400 text-sm">
          Photo placeholder
        </div>
      )}
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
        {persona.segment} <span className="text-slate-500 font-normal">({persona.segmentPctLabel})</span>
      </h3>
      <p className="text-base font-medium text-slate-600">
        {persona.name}, {persona.age} — {persona.role}
      </p>
      <p className="text-slate-500 text-sm mt-0.5">{persona.household}</p>
    </>
  )
}

function PersonaCardParagraphs({ persona, stepIndexStart, visibleUpToStep }) {
  const sections = [
    { label: 'Mindset', text: persona.mindset },
    { label: 'The Approach', text: persona.approach },
    { label: 'The Barrier', text: persona.barrier },
    {
      label: `Winning the ${persona.segment.replace('The ', '')} (${persona.name})`,
      text: persona.winning,
    },
  ]
  return (
    <div className="mt-6 space-y-4 text-slate-700 text-sm leading-relaxed">
      {sections.map((section, i) => (
        <RevealBlock
          key={i}
          stepIndex={stepIndexStart + i}
          visibleUpToStep={visibleUpToStep}
        >
          <div>
            <p className="font-semibold text-slate-800 mb-1">{section.label}</p>
            <p>{section.text}</p>
          </div>
        </RevealBlock>
      ))}
    </div>
  )
}

export function Slide2OurPeople({ positionIndex = 1 }) {
  const ref = useRef(null)
  const ctx = useMarketReality()
  const s2 = marketRealitySlides.slide2
  const heroSrc = marketRealityImages?.slide2?.hero

  const unlocked = ctx && ctx.contentUnlocked
  const isActive = ctx?.currentSlide === positionIndex
  const visibleUpToStep = unlocked ? (isActive ? ctx.revealStep : 0) : 0

  const showMikeCard = visibleUpToStep > 2
  const showMariaCard = visibleUpToStep > 6

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 bg-slate-100 relative overflow-hidden"
    >
      {heroSrc && (
        <>
          <img
            src={heroSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-slate-100/80" aria-hidden />
        </>
      )}
      {!unlocked ? null : (
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <RevealBlock stepIndex={0} visibleUpToStep={visibleUpToStep}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {s2.title}
            </h2>
          </RevealBlock>
          <RevealBlock stepIndex={1} visibleUpToStep={visibleUpToStep}>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl">{s2.intro}</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
            {/* Mike: card + headline at step 2, then paragraphs 3–6 */}
            <div>
              {showMikeCard && (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-xl">
                  <div className="p-6 md:p-8">
                    <RevealBlock stepIndex={2} visibleUpToStep={visibleUpToStep}>
                      <PersonaCardHeader
                        persona={s2.mike}
                        imageSrc={personaImages['practical-minimalists']}
                      />
                    </RevealBlock>
                    <PersonaCardParagraphs
                      persona={s2.mike}
                      stepIndexStart={3}
                      visibleUpToStep={visibleUpToStep}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Maria: card + headline at step 7, then paragraphs 8–11 */}
            <div>
              {showMariaCard && (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-xl">
                  <div className="p-6 md:p-8">
                    <RevealBlock stepIndex={7} visibleUpToStep={visibleUpToStep}>
                      <PersonaCardHeader
                        persona={s2.maria}
                        imageSrc={personaImages['wellness-optimizers']}
                      />
                    </RevealBlock>
                    <PersonaCardParagraphs
                      persona={s2.maria}
                      stepIndexStart={8}
                      visibleUpToStep={visibleUpToStep}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
