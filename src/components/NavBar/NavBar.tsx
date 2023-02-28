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
  console.log(location.pathname);
  
  
  return (
    <nav className={styles.navbar}>
      {user ?
        <ul>
          <li>Welcome, {user.name}</li>
          <li className={location.pathname === '/' ? styles.active : ''}>
            <NavLink to='/'>
              Home
            </NavLink>
          </li>
          <li className={location.pathname === '/profiles' ? styles.active : ''}>
            <NavLink to="/profiles">
              Profiles
            </NavLink>
          </li>
          <li className={location.pathname === '/profiles/my-profile' ? styles.active : ''}>
            <NavLink to='/profiles/my-profile'>
              My Profile
            </NavLink>
          </li>
          <li className={location.pathname === '/change-password' ? styles.active : ''}>
            <NavLink to="/change-password">
            Change Password
            </NavLink>
          </li>
          <li>
            <NavLink to="" onClick={handleLogout}>
              LOG OUT
            </NavLink>
          </li>
        </ul>
      :
        <ul>
          <li className={location.pathname === '/login' ? styles.active : ''}>
            <NavLink to="/login">
              Log In
            </NavLink>
          </li>
          <li className={location.pathname === '/signup' ? styles.active : ''}>
            <NavLink to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
