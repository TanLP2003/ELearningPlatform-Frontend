import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '~/redux'

interface ProtectedRouteProps {
  element: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const currentUser = useSelector((state: RootState) => state.users.currentUser)
  if (!currentUser) {
    return <Navigate to='/auth' />
  }
  return element
}

export default ProtectedRoute
