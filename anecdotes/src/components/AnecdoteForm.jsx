import { useActions } from "../store"

const AnecdoteForm = () => {
    const { add, setMessage } = useActions() 

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target['new-anecdote'].value
        await add(content)
        setMessage(`You created: ${content}`)
        setTimeout(setMessage, 5000, '')
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