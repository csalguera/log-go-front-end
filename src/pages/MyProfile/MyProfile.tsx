// npm packages
import { useEffect, useState } from 'react'

// services
import * as profileService from '../../services/profileService'

// types
import { Profile } from '../../types/models'

const MyProfile = (): JSX.Element => {
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
    <>
      <p>{myProfile.name}</p>
    </>
  )
}

export default MyProfile