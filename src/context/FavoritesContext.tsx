import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as favoritesApi from '../api/favoritesApi'

type FavoritesContextValue = {
  favorites: Set<string>
  isLoading: boolean
  addFavorite: (id: string) => Promise<void>
  removeFavorite: (id: string) => Promise<void>
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    favoritesApi
      .listFavorites()
      .then((ids) => setFavorites(new Set(ids)))
      .finally(() => setIsLoading(false))
  }, [])

  const addFavorite = async (id: string) => {
    const ids = await favoritesApi.addFavorite(id)
    setFavorites(new Set(ids))
  }

  const removeFavorite = async (id: string) => {
    const ids = await favoritesApi.removeFavorite(id)
    setFavorites(new Set(ids))
  }

  const isFavorite = (id: string) => favorites.has(id)

  const value = useMemo(
    () => ({
      favorites,
      isLoading,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, isLoading],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return ctx
}
