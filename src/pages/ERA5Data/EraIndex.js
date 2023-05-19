import React from 'react'
import { Outlet } from 'react-router-dom'

const EraIndex = () => {
  return (
      <div>
        ERA5 Data
        <Outlet />
      </div>
    )
}

export default EraIndex