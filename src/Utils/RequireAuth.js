import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './Auth'

/**
 * RequireAuth component is a higher-order component that checks if the user is authenticated.
 * If the user is not authenticated, it redirects them to the specified route.
 *
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @returns {JSX.Element} - RequireAuth component
 */
export const RequireAuth = ({ children }) => {
  const location = useLocation()
  const auth = useAuth()
  if (!auth.user) {
    return <Navigate to='/' state={{ path: location.pathname }} />
  }
  return children
}