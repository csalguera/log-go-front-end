// npm modules
import { NavLink, useLocation } from 'react-router-dom'

// styles
import styles from './NavBar.module.css'

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  const location = useLocation()
  
  return (
    <nav className={styles.navbar}>
      {user ?
        <ul>
          <li>
            <NavLink
              to='/'
              className={`${location.pathname === '/' ? styles.active : ''} ${styles.logo}`}
            >
              log-go
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profiles" 
              className={location.pathname === '/profiles' ? styles.active : ''}
            >
              Profiles
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profiles/my-profile' 
              className={location.pathname === '/profiles/my-profile' ? styles.active : ''}
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/change-password"
              className={location.pathname === '/change-password' ? styles.active : ''}
            >
            Change Password
            </NavLink>
          </li>
          <li>
            <NavLink to="" onClick={handleLogout}>
              Log Out
            </NavLink>
          </li>
        </ul>
      :
        <ul>
          <li>
            <NavLink
              to="/login"
              className={location.pathname === '/login' ? styles.active : ''}
            >
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={location.pathname === '/signup' ? styles.active : ''}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
