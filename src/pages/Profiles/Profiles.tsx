// npm packages
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// components
import Avatar from '../../components/Avatar/Avatar'

// services
import * as profileService from '../../services/profileService'

// styles
import styles from './Profiles.module.css'

// types
import { Profile } from '../../types/models'

const Profiles = (): JSX.Element => {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect((): void => {
    const fetchProfiles = async (): Promise<void> => {
      try {
        const profileData: Profile[] = await profileService.getAllProfiles()
        setProfiles(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfiles()
  }, [])

  if(!profiles.length) return <h1>Loading...</h1>

  return (
    <>
      <h1>Hello. This is a list of all the profiles.</h1>
      <div className={styles["profiles-container"]}>
        {profiles.map((profile: Profile) =>
          <Link
            key={profile.id}
            to={`/profiles/${profile.id}`}
            className={styles["profile-link"]}
          >
            <Avatar profile={profile}/>
            <p>{profile.name}</p>
          </Link>
        )}
      </div>
    </>
  )
}

export default Profiles
