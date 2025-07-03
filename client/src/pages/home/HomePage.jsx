import React from 'react'
import User from './User.jsx'
import MessageContainer from './MessageContainer.jsx'
import Message from './Message.jsx'
import SideBar from './SideBar.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function HomePage() {
  const navigate = useNavigate();
 const { isAuthenticated, screenLoading } = useSelector(state => state.userReducer);

 if(!isAuthenticated){
  navigate("/login");
 }
 return (
    <div>
     
      <SideBar/>
      <MessageContainer />
      <Message />
    </div>
  )
}

export default HomePage