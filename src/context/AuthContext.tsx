import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as authApi from '../api/authApi'

type AuthContextValue = {
  user: authApi.AuthUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<authApi.AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    authApi
      .getUser()
      .then((existing) => setUser(existing))
      .finally(() => setIsLoading(false))
  }, [])

  const handleLogin = async (username: string, password: string) => {
    const loggedIn = await authApi.login(username, password)
    setUser(loggedIn)
  }

  const handleLogout = async () => {
    await authApi.logout()
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: handleLogin,
      logout: handleLogout,
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
