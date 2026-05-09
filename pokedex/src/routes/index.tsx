import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [search, setSearch] = useState('')
  const [pokemon, setPokemon] = useState<{ name: string } | null>(null)
  const [loading, isLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function getPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    const data = await response.json()
    console.log(data)
    setPokemon(data)
  }
  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()
    setError(null)
    isLoading(true)
    try {
      await getPokemon()
    } catch (err: Error | unknown) {
      setError('No pokemon found. Try again.')
    } finally {
      isLoading(false)
    }
  }
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-4xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">TanStack Start Base Template</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-(--sea-ink) sm:text-6xl">
          You are eventually going to learn about pokemon here!!!
        </h1>
        <p className="mb-8 max-w-2xl text-base text-(--sea-ink-soft) sm:text-lg">
          This base starter intentionally keeps things light: two routes, clean
          structure, and the essentials you need to build from scratch.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/about"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-(--lagoon-deep) no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            About This Starter
          </a>
          <a
            href="https://tanstack.com/router"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-(--sea-ink) no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            Router Guide
          </a>
        </div>
      </section>

      <section className="mt-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for Pokemon..."
            className="w-full rounded-full p-2"
          />
          <button
            type="submit"
            className="ml-2 rounded-full bg-[rgba(79,184,178,0.14)] p-2 text-sm font-semibold text-(--lagoon-deep) no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            Search
          </button>
        </form>
      </section>

      <section className="mt-8">
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p>Loading...</p>}
        {pokemon && <p>{pokemon.name}</p>}
      </section>
    </main>
  )
}
