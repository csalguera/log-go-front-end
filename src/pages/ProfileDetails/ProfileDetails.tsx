// npm packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'

// components
import MovieCard from '../../components/MovieCard/MovieCard';

// types
import { Profile } from '../../types/models'

const ProfileDetails = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const data: Profile = await profileService.getProfile(id)
        setProfile(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile()
  }, [id])

  if (!profile) return <h1>Loading...</h1>
  return (
    <>
      <h1>Profile Details</h1>
      <p>{profile?.name}</p>
      <img src={profile?.photo} alt="Profile Photo" />
      <MovieCard />
    </>
  )
}

export default ProfileDetails