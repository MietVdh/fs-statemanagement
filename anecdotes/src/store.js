import { create } from 'zustand'
import { getAll, createNew, update, deleteAnecdote } from './services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  message: "",
  actions: {
    vote: async (id) => {
        const anecdote = get().anecdotes.find(a => a.id === id)
        const updated = await update(id, { ...anecdote, votes: anecdote.votes + 1 })
        set(state => ({
          anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
        })
    )},
    add: async (content) => {
      const newAnecdote = await createNew(content)
      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote]}))
      },
    deleteAnecdote: async (id) => {
      await deleteAnecdote(id)
      set(state => ({ anecdotes: state.anecdotes.filter(a => a.id !== id)}))
    },
    setFilter: value => set({ filter: value }),
    initialize: async () => {
      const anecdotes = await getAll()
      set({ anecdotes })
    },
    setMessage: message => set({ message }),
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const anecdoteFilter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter((anecdote) => anecdote.content.includes(anecdoteFilter))
}

export const useActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useMessage = () => useAnecdoteStore((state) => state.message)