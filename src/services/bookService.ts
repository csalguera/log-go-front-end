// services
import * as tokenService from './tokenService'

// types
import { Book } from '../types/models'
import { BookFormData, EditBookFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/books`

const createBook = async (formData: BookFormData): Promise<Book> => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    return await res.json() as Book
  } catch (error) {
    throw error
  }
}

const updateBook = async (formData: EditBookFormData): Promise<Book> => {
  try {
    const res = await fetch(`${BASE_URL}/${formData.bookId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    return await res.json() as Book
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

export {
  createBook,
  updateBook,
  deleteBook,
}
