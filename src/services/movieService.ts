// services
import * as tokenService from './tokenService'

// types
import { Movie } from '../types/models'
import { MovieFormData, EditMovieFormData, PhotoFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/movies`

const createMovie = async (formData: MovieFormData, photoFormData: PhotoFormData): Promise<Movie> => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const newMovie = await res.json() as Movie
    if (photoFormData.photo) {
      const photoData = new FormData()
      photoData.append('photo', photoFormData.photo)
      await addPhoto(photoData, newMovie.id)
    }
    return newMovie
  } catch (error) {
    throw error
  }
}

const updateMovie = async (formData: EditMovieFormData, photoFormData: PhotoFormData): Promise<Movie> => {
  try {
    const res = await fetch(`${BASE_URL}/${formData.movieId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const editedMovie = await res.json() as Movie
    if (photoFormData.photo) {
      const photoData = new FormData()
      photoData.append('photo', photoFormData.photo)
      await addPhoto(photoData, editedMovie.id)
    }
    return editedMovie
  } catch (error) {
    throw error
  }
}

const deleteMovie = async (id: number): Promise<void> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

async function addPhoto(
  photoData: FormData, 
  movieId: number
): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoData
    })
    return await res.json() as string
  } catch (error) {
    throw error
  }
}

export {
  createMovie,
  updateMovie,
  deleteMovie,
  addPhoto,
}
