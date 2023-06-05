import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Index file for Home Route
 * 
 * @returns {JSX.Element} - Home component 
 */
const Home = () => {
  return (
    <div>Home
      <Outlet />
    </div>
  )
}

export default Home
