import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ProtectedRoute({children}) {

const dispatch= useDispatch();
const {isAuthenticated,screenloading}= useSelector(state => state.userReducer);
const navigate= useNavigate();
  return (
    <>
      {screenloading && !isAuthenticated ? (
        navigate("/login")
      ) : (
        children
      )}
    </>
  )
}

export default ProtectedRoute