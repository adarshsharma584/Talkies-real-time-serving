import React from "react";
import User from "./User.jsx";
import { useDispatch } from "react-redux";
import {logoutUserThunk} from "../../redux/user/user.thunk";

function SideBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };
  return (
    <div className="flex flex-col p-4 bg-zinc-800 shadow-md  max-w-[270px] border-r-white border-r-2 h-screen">
      <h2 className="text-lg font-semibold text-black">SideBar</h2>
      <div className="flex flex-col overflow-y-scroll scroolbar-hidden h-full">
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
      <div className="footer flex justify-between
        items-center m-auto p-4 bg-zinc-700 rounded-lg">
        <User />
        <button className="btn btn-primary" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
