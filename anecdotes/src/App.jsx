import { useEffect } from "react"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useActions } from "./store"

const App = () => {
  const { initialize } = useActions()

  useEffect(() => {
    initialize()
  }, [initialize])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
