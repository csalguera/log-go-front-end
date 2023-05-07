// npm modules
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// types
import { User, Profile } from '../../types/models'

interface ProtectedRouteProps {
  user: User | null;
  myProfile: Profile | null;
  children: ReactNode;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
  const { user, myProfile, children } = props

  if (!user) return <Navigate to="/login" />
  return <> { children } </>
}

export default ProtectedRoute
