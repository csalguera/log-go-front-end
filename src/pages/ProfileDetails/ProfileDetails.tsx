// npm packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'

// components
import Avatar from '../../components/Avatar/Avatar';
import MovieCard from '../../components/movies/MovieCard/MovieCard';
import BookCard from '../../components/books/BookCard/BookCard';

// stylesheets
import styles from './ProfileDetails.module.css'

// types
import { Profile } from '../../types/models'

// props
import { ProfileDetailsProps } from '../../types/props';

const ProfileDetails = (props: ProfileDetailsProps): JSX.Element => {
  const { user } = props
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const size1 = "118px"
  const size2 = "110px"
  const size3 = "48px"

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
    <main className='page-component-container'>
      <div className={styles["profile-container"]}>
        <Avatar
          profile={profile}
          size1={size1}
          size2={size2}
          size3={size3}
        />
        <h2>{profile?.name}</h2>
        <div className={styles["card-container"]}>
          <MovieCard user={user} profile={profile} />
          <BookCard user={user} profile={profile} />
        </div>
      </div>
    </main>
  )
}

export default ProfileDetails