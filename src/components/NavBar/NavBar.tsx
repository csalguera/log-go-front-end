// npm modules
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react';

// mui components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// styles
import styles from './NavBar.module.css'

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const pages = [ 'home', 'profiles', 'movies', 'books']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  const location = useLocation()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pascalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  
  return (
    // <nav className={styles.navbar}>
    //   {user ?
    //     <ul>
    //       <li>
    //         <NavLink
    //           to='/'
    //           className={`${location.pathname === '/' ? styles.active : ''} ${styles.logo}`}
    //         >
    //           log-go
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/profiles" 
    //           className={location.pathname === '/profiles' ? styles.active : ''}
    //         >
    //           Profiles
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to='/profiles/my-profile' 
    //           className={location.pathname === '/profiles/my-profile' ? styles.active : ''}
    //         >
    //           My Profile
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/change-password"
    //           className={location.pathname === '/change-password' ? styles.active : ''}
    //         >
    //         Change Password
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="" onClick={handleLogout}>
    //           Log Out
    //         </NavLink>
    //       </li>
    //     </ul>
    //   :
    //     <ul>
    //       <li>
    //         <NavLink
    //           to="/login"
    //           className={location.pathname === '/login' ? styles.active : ''}
    //         >
    //           Log In
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/signup"
    //           className={location.pathname === '/signup' ? styles.active : ''}
    //         >
    //           Sign Up
    //         </NavLink>
    //       </li>
    //     </ul>
    //   }
    // </nav>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            log-go
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{pascalize(page)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
