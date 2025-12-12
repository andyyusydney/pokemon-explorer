import {
  PokemonClient,
  type NamedAPIResourceList,
  type Pokemon,
} from "pokenode-ts";

const client = new PokemonClient();

export type PokemonSummary = {
  id: number;
  name: string;
  image: string | null;
};

function extractIdFromUrl(url: string): number {
  const segments = url.split("/").filter(Boolean);
  const maybeId = segments[segments.length - 1];
  return Number.parseInt(maybeId, 10);
}

function buildImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function fetchPokemonList(
  limit = 24,
  offset = 0
): Promise<NamedAPIResourceList> {
  return client.listPokemons(offset, limit);
}

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  return client.getPokemonByName(name);
}

export async function fetchPokemonById(id: number): Promise<Pokemon> {
  return client.getPokemonById(id);
}

export async function fetchPokemonSummaries(
  limit = 24,
  offset = 0
): Promise<PokemonSummary[]> {
  const list = await fetchPokemonList(limit, offset);

  return list.results.map((item) => {
    const id = extractIdFromUrl(item.url);
    return {
      id,
      name: item.name,
      image: !Number.isNaN(id) ? buildImageUrl(id) : null,
    };
  });
}
