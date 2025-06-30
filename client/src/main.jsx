import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './pages/home/HomePage.jsx'
import Login from './pages/authentication/Login.jsx'
import Signup from './pages/authentication/Signup.jsx'
import {store} from './redux/store/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
])
createRoot(document.getElementById('root')).render(
 <Provider  store={store}>
   <RouterProvider router={router}>
    <App />
  </RouterProvider>
 </Provider>
)
