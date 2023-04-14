import React from 'react'

import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = (props) => {
  const JWT = localStorage.getItem('auth-token')

  let auth
  if (JWT == null) {
    alert('Please Login to Continue')
    auth = { token: false }
  } else {
    auth = { token: true }
  }

  return auth.token ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
