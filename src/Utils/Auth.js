import { useState, createContext, useContext } from 'react'

/**
 * AuthContext is a context object created using the createContext() function from React.
 * It provides the authentication state and related functions to its descendants.
 */
const AuthContext = createContext(null)

/**
 * AuthProvider component is a context provider component that manages the authentication state.
 *
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @returns {JSX.Element} - AuthProvider component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  /**
   * Sets the user as the currently logged-in user.
   *
   * @param {Object} user - User object
   * @returns {void}
   */
  const login = user => {
    setUser(user)
  }

  /**
   * Logs out the currently logged-in user.
   *
   * @returns {void}
   */
  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth is a custom hook that allows components to access the authentication context.
 *
 * @returns {Object} - Authentication context value
 */
export const useAuth = () => {
  return useContext(AuthContext)
}