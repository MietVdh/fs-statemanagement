import { useActions } from "../store"

const AnecdoteForm = () => {
    const { add } = useActions() 

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target['new-anecdote'].value
        add(content)
        event.target.reset()
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                <input name="new-anecdote" data-testid="new" />
                </div>
                <button>create</button>
            </form>
        </>
    )
}
  

export default AnecdoteForm