// npm packages
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// components
import Avatar from '../../components/Avatar/Avatar'
import Loading from '../../components/Loading/Loading'

// mui components
import Typography from '@mui/material/Typography'

// services
import * as profileService from '../../services/profileService'

// styles
import styles from './Profiles.module.css'

// types
import { Profile } from '../../types/models'

// props
import { ProfilesProps } from '../../types/props'

const Profiles = (props: ProfilesProps): JSX.Element => {
  const { user } = props
  const [profiles, setProfiles] = useState<Profile[]>([])
  const size1 = "187px"
  const size2 = "175px"
  const size3 = "80px"

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

  if (!profiles.length) return <Loading />

  return (
    <main className='page-component-container'>
      <Typography
        variant='h3'
        sx={{
          mb: 4,
        }}
      >
        Profiles
      </Typography>
      {/* <h1>Profiles</h1>
      <div className={styles["profiles-container"]}>
        {profiles.filter((profile: Profile) => profile.id !== user!?.id).map((profile: Profile) =>
          <Link
            key={profile.id}
            to={`/profiles/${profile.id}`}
            className={styles["profile-link"]}
          >
            <Avatar
              profile={profile}
              size1={size1}
              size2={size2}
              size3={size3}
            />
            <p>{profile.name}</p>
          </Link>
        )}
      </div> */}
    </main>
  )
}

export default Profiles
