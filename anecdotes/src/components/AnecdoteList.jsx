import { useAnecdotes, useActions } from "../store"
import Filter from "./Filter"

const AnecdoteList = () => {

    const anecdotes = useAnecdotes()
    const { vote, setMessage, deleteAnecdote } = useActions()

    const handleVote = async (anecdote) => {
        await vote(anecdote.id)
        setMessage(`you voted '${anecdote.content}'`)
        setTimeout(setMessage, 5000, '')
    }

    const handleDelete = async (anecdote) => {
        // if (window.confirm(`Are you sure you want to delete '${anecdote.content}'?`)) {
            await deleteAnecdote(anecdote.id)
            // setMessage(`You deleted '${anecdote.content}'`)
            setMessage('You deleted a note')
            setTimeout(setMessage, 5000, '')
        // }
    }
    
    return (
        <div>
            <Filter />
            {anecdotes
                .toSorted((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote)}>vote</button>
                        </div>
                        {anecdote.votes === 0 
                            ? <button onClick={() => handleDelete(anecdote)}>delete</button> 
                            : ''
                        }
                    </div>
            ))}
        </div>
    )
}

export default AnecdoteList