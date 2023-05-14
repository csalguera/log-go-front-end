// services
import * as tokenService from './tokenService'

// types
import { Book } from '../types/models'
import { BookFormData, EditBookFormData, PhotoFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/books`

const createBook = async (formData: BookFormData, photoFormData: PhotoFormData): Promise<Book> => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const newBook = await res.json() as Book
    if (photoFormData.photo) {
      const photoData = new FormData()
      photoData.append('photo', photoFormData.photo)
      await addPhoto(photoData, newBook.id)
    }
    return newBook
  } catch (error) {
    throw error
  }
}

const updateBook = async (formData: EditBookFormData, photoFormData: PhotoFormData): Promise<Book> => {
  try {
    const res = await fetch(`${BASE_URL}/${formData.bookId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const editedMovie = await res.json() as Book
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

const deleteBook = async (id: number): Promise<void> => {
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
  bookId: number
): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/add-photo`, {
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
  createBook,
  updateBook,
  deleteBook,
  addPhoto,
}
