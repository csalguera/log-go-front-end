// npm packages
import { useEffect, useState } from 'react'

// services
import * as profileService from '../../services/profileService'

// components
import Avatar from '../../components/Avatar/Avatar'
import MovieCard from '../../components/movies/MovieCard/MovieCard'
import BookCard from '../../components/books/BookCard/BookCard'

// types
import { Profile } from '../../types/models'

// props
import { ProfileDetailsProps } from '../../types/props'

const MyProfile = (props: ProfileDetailsProps): JSX.Element => {
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
  
  if (!myProfile) return <h1>Loading...</h1>
  return (
    <main className='page-component-container'>
      <Avatar
      profile={myProfile}
        size1='118px'
        size2='110px'
        size3='48px'
      />
    </main>
  )
}

export default MyProfile