import type { Pokemon } from '../types'

export default function PokeCard({
  pokemon,
}: {
  pokemon: Pokemon
  loading: boolean
  error: string | null
}) {
  return (
    <div>
      <div className="flex items-center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h2 className="text-3xl capitalize">{pokemon.name}</h2>
      </div>
      {pokemon.types.length > 0 && (
        <div className="flex">
          {pokemon.types.map((type) => (
            <span key={type.type.name} className="text-xl capitalize italic">
              {type.type.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
