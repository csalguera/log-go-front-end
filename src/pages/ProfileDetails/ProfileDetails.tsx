// npm packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'

// components
import MovieCard from '../../components/movies/MovieCard/MovieCard';
import BookCard from '../../components/books/BookCard/BookCard';

// stylesheets
import styles from './ProfileDetails.module.css'

// types
import { Profile } from '../../types/models'

// props
import { ProfileDetailsProps } from '../../types/props';

const ProfileDetails = (props: ProfileDetailsProps): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const { user } = props
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
      <h1>{profile?.name}</h1>
      <img src={profile?.photo} alt="Profile Photo" />
      <div className={styles["card-container"]}>
        <MovieCard user={user} profile={profile} />
        <BookCard user={user} profile={profile} />
      </div>
    </>
  )
}

export default ProfileDetails