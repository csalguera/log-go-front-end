// services
import * as tokenService from './tokenService'

// types
import { Movie, Book } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/`

async function fetchData(): Promise<{ movies: Movie[]; books: Book[] }> {
  try {
    const res = await fetch(`${BASE_URL}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as { movies: Movie[]; books: Book[] }
  } catch (error) {
    throw error
  }
}

export {
  fetchData,
}
