// services
import * as tokenService from './tokenService'

// types
import { Profile } from '../types/models'
import { ChangeUsernameFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles(): Promise<Profile[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Profile[]
  } catch (error) {
    throw error
  }
}

async function addPhoto(
  photoData: FormData, 
  profileId: number
): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
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

async function getProfile(id: string | undefined): Promise<Profile> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Profile
  } catch (error) {
    throw error
  }
}

async function getMyProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${BASE_URL}/my-profile`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Profile
  } catch (error) {
    throw error
  }
}

async function changeUsername(formData: ChangeUsernameFormData) {
  try {
    const res = await fetch(`${BASE_URL}/change-username`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const editedMovie = await res.json() as Profile
    return editedMovie
  } catch (error) {
    throw error
  }
}

export {
  getAllProfiles,
  addPhoto,
  getProfile,
  getMyProfile,
  changeUsername,
}
