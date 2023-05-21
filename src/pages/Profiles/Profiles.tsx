// npm packages
import { useState, useEffect } from 'react'

// components
import Loading from '../../components/Loading/Loading'

// mui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material'

// services
import * as profileService from '../../services/profileService'

// types
import { Profile } from '../../types/models'

// props
import { ProfilesProps } from '../../types/props'

const Profiles = (props: ProfilesProps): JSX.Element => {
  const { user } = props
  const theme = useTheme()
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

  if (!profiles.length) return <Loading />

  return (
    <main className='page-component-container' style={{ backgroundColor: theme.palette.background.default }}>
      <Typography
        variant='h3'
        color='text.primary'
        sx={{
          mb: 4,
        }}
      >
        Profiles
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {profiles.filter(profile => profile.id !== user!?.id).map(profile => 
          <Box
            key={profile.name}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 5,
              mb: 5,
            }}
          >
            <Avatar
              alt={profile.name}
              src={profile.photo ?? profile.name}
              sx={{
                mb: 1,
                height: 150,
                width: 150,
                fontSize: 75,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <Link
              key={profile.id}
              href={`/profiles/${profile.id}`}
              underline='hover'
            >
              {profile.name}
            </Link>
          </Box>
        )}
      </Box>
    </main>
  )
}

export default Profiles
