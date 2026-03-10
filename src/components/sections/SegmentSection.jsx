import { motion } from 'framer-motion'
import { ScrollSection } from '../ScrollSection'
import { ResearchCitation } from '../ResearchCitation'
import { segments } from '../../data/segments'
import { personas } from '../../data/personas'
import { personaImages } from '../../data/personaImages'
import { narrative } from '../../data/narrative'

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function getPersona(segmentId) {
  return personas.find((p) => p.segmentId === segmentId)
}

export function SegmentSection({ segmentIndex }) {
  const segment = segments[segmentIndex]
  if (!segment) return null
  const persona = getPersona(segment.id)
  const story = narrative?.segments?.[segmentIndex]
  const headline = story?.headline || segment.name
  const transition = story?.transition

  return (
    <ScrollSection
      id={segment.id}
      className={
        segmentIndex % 2 === 0
          ? 'bg-white border-t border-slate-200'
          : 'bg-slate-100/80 border-t border-slate-200'
      }
    >
      <motion.span
        variants={item}
        className="text-sm font-medium text-slate-500 uppercase tracking-wider"
      >
        Segment {segmentIndex + 1} · {segment.share}
      </motion.span>
      {segmentIndex === 0 && (
        <motion.div variants={item} className="mt-2 mb-2">
          <ResearchCitation compact className="text-slate-500" />
        </motion.div>
      )}
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-2">
        {headline}
      </motion.h2>
      {transition && (
        <motion.p variants={item} className="text-slate-600 mb-4">
          {transition}
        </motion.p>
      )}
      {persona && (
        <motion.div variants={item} className="flex flex-col md:flex-row gap-6 mb-6 items-start">
          {personaImages?.[segment.id] && (
            <div className="flex-shrink-0 w-full md:w-72">
              <img
                src={personaImages[segment.id]}
                alt={`Lifestyle: ${persona.name}, ${persona.role}`}
                className="rounded-xl border border-slate-200 shadow-md object-cover w-full aspect-[4/3] bg-slate-100"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <p className="text-xs text-slate-500 mt-1">From our research</p>
            </div>
          )}
          <div
            className={`bg-slate-800 text-white rounded-xl p-6 ${personaImages?.[segment.id] ? 'md:flex-1' : 'max-w-xl'}`}
          >
            <p className="font-semibold text-lg">
              {persona.name}, {persona.age} — {persona.role}
            </p>
            <p className="text-slate-300 mt-1">{persona.household}</p>
            <p className="text-slate-400 text-sm mt-2">{persona.detail}</p>
          </div>
        </motion.div>
      )}
      <motion.p variants={item} className="text-slate-600 mb-4">
        {segment.narrative}
      </motion.p>
      {segmentIndex === 0 && (
        <motion.div variants={item} className="mb-6">
          <img
            src="/images/segment-overview.png"
            alt="Segment overview from Ate Days Consumer Segmentation Report"
            className="rounded-lg border border-slate-200 max-w-full shadow-sm object-contain max-h-64 bg-slate-50"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <p className="text-xs text-slate-500 mt-1">From the segmentation report</p>
        </motion.div>
      )}
      <ul className="space-y-2">
        {segment.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            variants={item}
            className="flex gap-2 text-slate-600"
          >
            <span className="text-emerald-600 mt-1">•</span>
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>
    </ScrollSection>
  )
}
