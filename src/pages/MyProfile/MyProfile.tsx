// npm packages
import { useEffect, useState } from 'react'

// services
import * as profileService from '../../services/profileService'

// components
import MovieCard from '../../components/movies/MovieCard/MovieCard'
import BookCard from '../../components/books/BookCard/BookCard'

// types
import { Profile } from '../../types/models'

// props

const MyProfile = (props): JSX.Element => {
  const { user } = props
  const [myProfile, setMyProfile] = useState<Profile | null>(null)
  
  useEffect(() => {
    const fetchMyProfile = async (): Promise<void> => {
      try {
        const data: Profile = await profileService.getMyProfile()
        setMyProfile(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyProfile()
  }, [])

  console.log(myProfile);
  

  if (!myProfile) return <h1>Loading...</h1>
  return (
    <>
    </>
  )
}

export default MyProfile