import { readJSON, writeJSON } from "../utils/storage";

const FAVORITES_KEY = "pe:favorites";

export type FavoriteId = string;

function getStoredIds(): FavoriteId[] {
  return readJSON<FavoriteId[]>(FAVORITES_KEY) ?? [];
}

export async function listFavorites(): Promise<FavoriteId[]> {
  return getStoredIds();
}

export async function addFavorite(id: FavoriteId): Promise<FavoriteId[]> {
  const current = new Set(getStoredIds());
  current.add(id);
  const next = Array.from(current);
  writeJSON<FavoriteId[]>(FAVORITES_KEY, next);
  return next;
}

export async function removeFavorite(id: FavoriteId): Promise<FavoriteId[]> {
  const current = new Set(getStoredIds());
  current.delete(id);
  const next = Array.from(current);
  writeJSON<FavoriteId[]>(FAVORITES_KEY, next);
  return next;
}
