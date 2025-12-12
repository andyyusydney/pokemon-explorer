import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import type { PokemonSummary } from '../../api/pokemonService'
import styles from './PokemonCard.module.css'

type Props = {
  pokemon: PokemonSummary
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

function PokemonCard({ pokemon, isFavorite, onToggleFavorite }: Props) {
  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onToggleFavorite(pokemon.id)
  }

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {pokemon.image ? (
          <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
        ) : (
          <div className={styles.imageFallback}>No image</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.nameRow}>
          <div>
            <h3 className={styles.name}>{pokemon.name}</h3>
            <span className={styles.id}>#{pokemon.id}</span>
          </div>
          <button
            type="button"
            className={styles.favoriteButton}
            onClick={handleToggle}
          >
            {isFavorite ? 'Unfavourite' : 'Favourite'}
          </button>
        </div>
      </div>
    </Link>
  )
}

export default PokemonCard
