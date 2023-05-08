// npm modules 
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import MyProfile from './pages/MyProfile/MyProfile'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
// import Footer from './components/Footer/Footer'

// fonts
import '@fontsource/roboto'

// services
import * as authService from './services/authService'

// stylesheets
import './App.css'

// types
import { User } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [displayAlert, setDisplayAlert] = useState(false)
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
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
              <Profiles user={user} loading={loading} setLoading={setLoading} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profiles/:id'
          element={
            <ProtectedRoute user={user}>
              <ProfileDetails user={user} loading={loading} setLoading={setLoading} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profiles/my-profile'
          element={
            <ProtectedRoute user={user}>
              <MyProfile user={user} loading={loading} setLoading={setLoading} />
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
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
