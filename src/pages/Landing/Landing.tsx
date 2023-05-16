// components
import Home from '../../components/landing/Home/Home';

// mui components
import Typography from '@mui/material/Typography';

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className='page-component-container'>
      {user
      ?
        <Home
          user={user}
        />
      :
        <Typography
          variant='h3'
        >
          Please Log in or Sign up
        </Typography>
      }
    </main>
  )
}

export default Landing
