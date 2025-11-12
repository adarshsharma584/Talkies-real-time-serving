import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat, clearMessages } from "../../redux/message/message.slice";

function User({ user }) {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.messageReducer);

  const isSelected = selectedChat?._id === user._id;

  const handleSelectUser = () => {
    dispatch(clearMessages());
    dispatch(setSelectedChat(user));
  };

  return (
    <div
      onClick={handleSelectUser}
      className={`flex items-center space-x-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
        isSelected ? "bg-gray-100 dark:bg-gray-700 border-l-4 border-indigo-500" : ""
      }`}
    >
      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">
          {user.username[0].toUpperCase()}
        </span>
      </div>
      <div>
        <h3 className="font-medium dark:text-white">{user.username}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Click to chat</p>
      </div>
    </div>
  );
}

export default User;
