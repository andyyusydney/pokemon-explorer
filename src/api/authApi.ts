import { readJSON, removeKey, writeJSON } from '../utils/storage'

const USER_KEY = 'pe:user'

export type AuthUser = {
  username: string
}

export async function getUser(): Promise<AuthUser | null> {
  return readJSON<AuthUser>(USER_KEY)
}

export async function login(username: string, password: string): Promise<AuthUser> {
  // Fake validation; any non-empty username/password combo works.
  if (!username || !password) {
    throw new Error('Username and password are required')
  }
  const user: AuthUser = { username }
  writeJSON(USER_KEY, user)
  return user
}

export async function logout(): Promise<void> {
  removeKey(USER_KEY)
}
