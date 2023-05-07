// npm modules 
import { useState, useEffect } from 'react'
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
import * as profileService from './services/profileService'

// stylesheets
import './App.css'

// types
import { User, Profile } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [myProfile, setMyProfile] = useState<Profile | null>(null)

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    const fetchMyProfile = async (): Promise<void> => {
      try {
        const data: Profile = await profileService.getMyProfile()
        setMyProfile(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyProfile()
  }, [])

  return (
    <>
      <NavBar user={user} myProfile={myProfile} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user} myProfile={myProfile}>
              <Profiles user={user} myProfile={myProfile} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profiles/:id'
          element={
            <ProtectedRoute user={user} myProfile={myProfile} >
              <ProfileDetails user={user} myProfile={myProfile} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profiles/my-profile'
          element={
            <ProtectedRoute user={user} myProfile={myProfile} >
              <MyProfile user={user} myProfile={myProfile} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user} myProfile={myProfile} >
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
