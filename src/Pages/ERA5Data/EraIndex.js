import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Index file for ERA5Data Route
 * 
 * @returns {JSX.Element} - EraIndex component 
 */
const EraIndex = () => {
  return (
      <div>
        ERA5 Data
        <Outlet />
      </div>
    )
}
export default EraIndex