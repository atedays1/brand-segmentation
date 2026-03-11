import { NavLink } from 'react-router-dom'

export function AppNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-6 bg-slate-900/95 backdrop-blur py-3 border-b border-slate-700/50"
      aria-label="Main navigation"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            isActive ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700'
          }`
        }
      >
        Segmentation Deck
      </NavLink>
      <NavLink
        to="/market-reality"
        className={({ isActive }) =>
          `text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            isActive ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700'
          }`
        }
      >
        Market Reality
      </NavLink>
    </nav>
  )
}
