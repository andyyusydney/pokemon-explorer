import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchPokemonById } from "../../api/pokemonService";
import styles from "./PokemonDetailPage.module.css";

function PokemonDetailPage() {
  const params = useParams();
  const pokemonId = Number(params.id);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: () => fetchPokemonById(pokemonId),
    enabled: Number.isFinite(pokemonId),
  });

  const primaryImage =
    data?.sprites.other?.["official-artwork"].front_default ??
    data?.sprites.front_default;

  return (
    <section className={styles.page}>
      <div className={styles.headerRow}>
        <Link to="/" className={styles.backLink}>
          ← Back
        </Link>
      </div>

      {isLoading && <div className={styles.loading}>Loading Pokemon…</div>}

      {isError && (
        <div className={styles.error}>
          <p>Failed to load Pokemon.</p>
          <button className={styles.retry} onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className={styles.card}>
          <div className={styles.visual}>
            {primaryImage ? (
              <img
                className={styles.image}
                src={primaryImage}
                alt={data.name}
              />
            ) : (
              <div className={styles.imageFallback}>No image</div>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{data.name}</h1>
              <span className={styles.id}>#{data.id}</span>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Types</h3>
              <p className={styles.sectionText}>
                {data.types.map((t) => t.type.name).join(", ")}
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Abilities</h3>
              <p className={styles.sectionText}>
                {data.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Stats</h3>
              <p className={styles.sectionText}>
                {data.stats
                  .map((stat) => `${stat.stat.name} ${stat.base_stat}`)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PokemonDetailPage;
