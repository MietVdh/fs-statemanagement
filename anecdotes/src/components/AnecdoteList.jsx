import { useAnecdotes, useActions } from "../store"
import Filter from "./Filter"

const AnecdoteList = () => {

    const anecdotes = useAnecdotes()
    const { vote, setMessage, deleteAnecdote } = useActions()

    const handleVote = (anecdote) => {
        vote(anecdote.id)
        setMessage(`You voted '${anecdote.content}'`)
        setTimeout(setMessage, 5000, '')
    }

    const handleDelete = (anecdote) => {
        if (window.confirm(`Are you sure you want to delete '${anecdote.content}'?`)) {
            deleteAnecdote(anecdote.id)
            setMessage(`You deleted '${anecdote.content}'`)
            setTimeout(setMessage, 5000, '')
        }
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
                        {anecdote.votes === 0 ? <button onClick={() => handleDelete(anecdote)}>delete</button> : ''}
                    </div>
            ))}
        </div>
    )
}

export default AnecdoteList