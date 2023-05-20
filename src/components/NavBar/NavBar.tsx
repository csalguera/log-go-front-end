// npm modules
import { useState } from 'react';
import { useLocation } from 'react-router';

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
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material';
import Switch from '@mui/material/Switch';

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const pages = ['profiles']
const settings = ['profile', 'settings'];

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props

  const theme = useTheme()
  const pathname = useLocation().pathname

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

  const pascalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <>
      {user ? (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <QuestionAnswerIcon
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                  color: pathname === '/' ? theme.palette.text.secondary : theme.palette.text.primary,
                }}
              />
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
                  color: pathname === '/' ? theme.palette.text.secondary : theme.palette.text.primary,
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
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                    >
                      <Link
                        href={`/${page}`}
                        underline='none'
                        sx={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        <Typography
                          textAlign="center"
                        >
                          {pascalize(page)}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <QuestionAnswerIcon
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  mr: 1,
                  color: pathname === '/' ? theme.palette.text.secondary : theme.palette.text.primary,
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: pathname === '/' ? theme.palette.text.secondary : theme.palette.text.primary,
                  textDecoration: 'none',
                }}
              >
                log-go
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Link
                    key={page}
                    href={`/${page}`}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: pathname === `/${page}` ? theme.palette.text.secondary : theme.palette.text.primary,
                        display: 'block',
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.name}
                      src={user.profile!?.photo ?? user.name}
                    />
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
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Link
                        href={setting === 'profile' ? '/profiles/my-profile' : `/${setting}`}
                        underline='none'
                      >
                        <Typography
                          textAlign="center"
                          sx={{
                            color: theme.palette.primary.main
                          }}
                        >
                          {pascalize(setting)}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <Typography
                      color='primary'
                    >
                      Dark Mode
                    </Typography>
                    <Switch />
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                  >
                    <Link
                      href=''
                      onClick={handleLogout}
                      underline='none'
                    >
                      <Typography
                        sx={{
                          color: theme.palette.primary.main
                        }}
                      >
                        Logout
                      </Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
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
                log-go
              </Typography>
              <QuestionAnswerIcon
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                  color: pathname === '/' ? theme.palette.text.secondary : theme.palette.text.primary,
                }}
              />
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
                    color: pathname === '/' ? theme.palette.text.secondary : theme.palette.text.primary,
                    textDecoration: 'none',
                    flexGrow: 1,
                  }}
                >
                  log-go
              </Typography>
              <Link href='login'>
                <Button
                  sx={{
                    color: pathname === '/login' ? theme.palette.text.secondary : theme.palette.text.primary,
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href='signup'>
                <Button
                  sx={{
                    color: pathname === '/signup' ? theme.palette.text.secondary : theme.palette.text.primary,
                  }}
                >
                  Sign up
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  )
}

export default NavBar
