import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { logoutUserThunk } from "../../redux/user/user.thunk";
import User from "./User.jsx";

function SideBar() {
  const dispatch = useDispatch();
  const { userProfile, otherUsers } = useSelector((state) => state.userReducer);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  const filteredUsers = (otherUsers || []).filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white/90 backdrop-blur-sm dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen">
      {/* Profile Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {userProfile?.username?.[0]?.toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold dark:text-white">
              {userProfile?.username || "Guest"}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users List */}
      <div className="px-4 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Chats</div>
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <User key={user._id} user={user} />)
        ) : (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">No users found</div>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          <FaSignOutAlt className="mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
