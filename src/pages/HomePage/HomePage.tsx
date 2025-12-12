import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSummaries } from "../../api/pokemonService";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import styles from "./HomePage.module.css";

const PAGE_LIMIT = 24;

function HomePage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["pokemon", PAGE_LIMIT],
    queryFn: () => fetchPokemonSummaries(PAGE_LIMIT, 0),
    staleTime: 1000 * 60,
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    const searchKeyword = search.trim().toLowerCase();
    if (!searchKeyword) return data;
    return data.filter((p) => p.name.toLowerCase().includes(searchKeyword));
  }, [data, search]);

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Pokemon Explorer</h1>
      </div>

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search Pokémon by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isFetching && <span className={styles.fetching}>Refreshing…</span>}
      </div>

      {isError && (
        <div className={styles.error}>
          <p>Failed to load Pokémon.</p>
          <button className={styles.retry} onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {isLoading && <div className={styles.loading}>Loading Pokémon…</div>}

      {!isLoading && (
        <div className={styles.grid}>
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && !isError && (
        <div className={styles.empty}>No Pokémon match that search.</div>
      )}
    </section>
  );
}

export default HomePage;
