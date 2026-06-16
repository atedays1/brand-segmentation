export function IlluminationChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-slate-900/40 p-4 ${className}`}
    >
      {title && (
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{title}</p>
      )}
      {subtitle && <p className="text-xs text-slate-500 mb-3">{subtitle}</p>}
      {children}
    </div>
  )
}
