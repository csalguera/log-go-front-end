// npm modules 
import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import MyProfile from './pages/MyProfile/MyProfile'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import AccountSettings from './pages/AccountSettings/AccountSettings'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Footer from './components/Footer/Footer'

// mui components
import { createTheme, ThemeProvider } from '@mui/material'
import { grey } from '@mui/material/colors'

// services
import * as authService from './services/authService'

// stylesheets
import './App.css'

// fonts
import '@fontsource/roboto'

// types
import { User } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()
  
  const initialFavColor = useMemo(() => {
    return authService.getUser()?.favColor
  }, [])
  
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [displayAlert, setDisplayAlert] = useState(false)
  const [favColor, setFavColor] = useState<string | undefined>(initialFavColor)
  const [darkPref, setDarkPref] = useState(false)

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  const handleClose = () => {
    setDisplayAlert(false)
  }

  useEffect(() => {
    setFavColor(user!?.favColor)
  }, [user])

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: favColor || '#1a76d2',
      },
      secondary: {
        main: '#1a76d2'
      },
      background: {
        default: grey[200],
        paper: grey[300],
      },
      text: {
        primary: '#000',
        secondary: '#fff',
      },
    }
  })

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: favColor || '#FF0770',
      },
      secondary: {
        main: '#FF0770'
      },
      background: {
        default: grey[900],
        paper: grey[800],
      },
      text: {
        primary: '#fff',
        secondary: '#000'
      },
    }
  })

  return (
    <>
      <ThemeProvider theme={darkPref ? darkTheme : lightTheme}>
        <NavBar user={user} handleLogout={handleLogout} setDarkPref={setDarkPref} />
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route
            path="/signup"
            element={
              <Signup
                handleAuthEvt={handleAuthEvt}
                displayAlert={displayAlert}
                setDisplayAlert={setDisplayAlert}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                handleAuthEvt={handleAuthEvt}
                displayAlert={displayAlert}
                setDisplayAlert={setDisplayAlert}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="/profiles"
            element={
              <ProtectedRoute user={user}>
                <Profiles user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profiles/:id'
            element={
              <ProtectedRoute user={user}>
                <ProfileDetails user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profiles/my-profile'
            element={
              <ProtectedRoute user={user}>
                <MyProfile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute user={user}>
                <ChangePassword handleAuthEvt={handleAuthEvt} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/settings'
            element={
              <ProtectedRoute user={user}>
                <AccountSettings
                  user={user}
                  handleAuthEvt={handleAuthEvt}
                  favColor={favColor}
                  setFavColor={setFavColor}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
