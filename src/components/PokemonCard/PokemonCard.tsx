import { Link } from "react-router-dom";
import type { PokemonSummary } from "../../api/pokemonService";
import styles from "./PokemonCard.module.css";

function PokemonCard({ pokemon }: { pokemon: PokemonSummary }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {pokemon.image ? (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.imageFallback}>No image</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.nameRow}>
          <h3 className={styles.name}>{pokemon.name}</h3>
          <span className={styles.id}>#{pokemon.id}</span>
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
