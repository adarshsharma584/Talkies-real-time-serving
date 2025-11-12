import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { isAuthenticated, screenLoading } = useSelector((state) => state.userReducer)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && !screenLoading) {
      navigate('/login')
    }
  }, [isAuthenticated, screenLoading, navigate])

  return <>{children}</>
}

export default ProtectedRoute