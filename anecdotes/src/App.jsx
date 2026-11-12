import { useAnecdotes, useActions } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { vote, add } = useActions()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target['new-anecdote'].value
    add(content)
    event.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="new-anecdote" data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
