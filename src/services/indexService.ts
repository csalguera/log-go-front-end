// services
import * as tokenService from './tokenService'

// types
import { Resource } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/`

async function index(): Promise<Resource> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Resource
  } catch (error) {
    throw error
  }
}

export {
  index,
}
