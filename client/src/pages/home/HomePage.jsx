import React from 'react'
import User from './User.jsx'
import MessageContainer from './MessageContainer.jsx'
import Message from './Message.jsx'
import SideBar from './SideBar.jsx'
function HomePage() {
  return (
    <div>
     
      <SideBar/>
      <MessageContainer />
      <Message />
    </div>
  )
}

export default HomePage