import React from 'react'
import User from './User.jsx'
function SideBar() {
  return (
    <div className="flex flex-col p-4 bg-zinc-800 shadow-md  max-w-[270px] border-r-white border-r-2 h-screen">
      <h2 className="text-lg font-semibold text-black">SideBar</h2>
      <div className='flex flex-col overflow-y-scroll scroolbar-hidden h-full'> 
        <User />
      <User />
      <User />
      <User />
      <User />
      <User />
       <User />
      <User />
      <User />
      <User />
      <User />
      <User />
       <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      </div>
      <div className='footer'>
        <p className='text-sm text-gray-500'>GupShup © 2023</p>
      </div>
    </div>
  )
}

export default SideBar