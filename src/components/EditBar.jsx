import { useSidebarLibrary } from '../context/SidebarLibraryContext'

export function EditBar() {
  const { editMode, toggleEditMode, undo, redo, canUndo, canRedo } = useSidebarLibrary()

  return (
    <div
      className="fixed left-0 right-0 z-40 flex items-center justify-center gap-3 py-2 px-4 bg-slate-900/95 backdrop-blur border-t border-slate-700/50 shadow-[0_-4px_12px_rgba(0,0,0,0.3)]"
      style={{ bottom: 'max(3rem, env(safe-area-inset-bottom, 0px))' }}
      role="toolbar"
      aria-label="Edit mode"
    >
      <button
        type="button"
        onClick={toggleEditMode}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          editMode
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600 hover:text-white'
        }`}
        title={editMode ? 'Exit edit mode (hide resize/move handles)' : 'Enter edit mode (show move, resize, order)'}
      >
        {editMode ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Edit mode on
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit mode off
          </>
        )}
      </button>
      <button
        type="button"
        onClick={undo}
        disabled={!canUndo}
        className="px-3 py-2 rounded-lg bg-slate-700/80 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-sm font-medium"
        title="Undo"
      >
        Undo
      </button>
      <button
        type="button"
        onClick={redo}
        disabled={!canRedo}
        className="px-3 py-2 rounded-lg bg-slate-700/80 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-sm font-medium"
        title="Redo"
      >
        Redo
      </button>
      {editMode && (
        <span className="text-xs text-slate-400">
          Move, resize, and reorder elements; use layer buttons on each element.
        </span>
      )}
    </div>
  )
}
