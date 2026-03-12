import { BoardDeckProvider } from './context/BoardDeckContext'
import { BoardDeckContent } from './BoardDeckContent'

export default function App() {
  return (
    <BoardDeckProvider>
      <BoardDeckContent />
    </BoardDeckProvider>
  )
}
