// stylesheets
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className='page-component-container'>
      <main className={styles.container}>
        <h1>{user ? `Welcome, ${user.name}` : 'Please Log In or Sign Up to access this site'}</h1>
        {user
        ?
          <>
            <h2>This is the Landing Page</h2>
            <h3>Currently Under Construction</h3>
          </>
        :
        ''
        }
      </main>
    </main>
  )
}

export default Landing
