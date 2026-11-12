import { create } from 'zustand'
import { getAll } from './services/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: (id) => set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
        )
      })
    ),
    add: (content) => set(
      state => ({
        anecdotes: [...state.anecdotes, { content, id: getId(), votes: 0 }]
      })
    ),
    setFilter: value => set({ filter: value }),
    initialize: async () => {
      const anecdotes = await getAll()
      set({ anecdotes })
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const anecdoteFilter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter((anecdote) => anecdote.content.includes(anecdoteFilter))
}

export const useActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)