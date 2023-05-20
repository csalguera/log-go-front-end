// components
import Home from '../../components/landing/Home/Home';

// mui components
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  const theme = useTheme()

  return (
    <main className='page-component-container' style={{ backgroundColor: theme.palette.background.default }}>
      {user ? (
        <Home
          user={user}
        />
      ) : (
        <Typography
          variant='h3'
        >
          Please Log in or Sign up
        </Typography>
      )}
    </main>
  )
}

export default Landing
