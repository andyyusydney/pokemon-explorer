import { describe, expect, it, beforeEach } from 'vitest'
import { addFavorite, listFavorites, removeFavorite } from './favoritesApi'

const KEY = 'pe:favorites'

describe('favoritesApi', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds and lists favourites', async () => {
    await addFavorite('1')
    await addFavorite('2')
    await addFavorite('1') // duplicate should not create a second entry

    const result = await listFavorites()
    expect(result).toEqual(['1', '2'])
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify(['1', '2']))
  })

  it('removes favourites', async () => {
    await addFavorite('1')
    await addFavorite('2')
    await removeFavorite('1')

    const result = await listFavorites()
    expect(result).toEqual(['2'])
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify(['2']))
  })
})
