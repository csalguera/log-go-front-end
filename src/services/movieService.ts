// services
import * as tokenService from './tokenService'

// types
import { Movie } from '../types/models'
import { MovieFormData, EditMovieFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/movies`

const createMovie = async (formData: MovieFormData): Promise<Movie> => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    return await res.json() as Movie
  } catch (error) {
    throw error
  }
}

const updateMovie = async (formData: EditMovieFormData): Promise<Movie> => {
  try {
    const res = await fetch(`${BASE_URL}/${formData.movieId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    return await res.json() as Movie
  } catch (error) {
    throw error
  }
}

export {
  createMovie,
  updateMovie,
}
