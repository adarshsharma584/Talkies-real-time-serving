import React from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
  const { userProfile } = useSelector((state) => state.userReducer);

  if (!message || typeof message !== "object") {
    return null;
  }

  const isMyMessage = String(message.senderId) === String(userProfile?._id);
  const messageText = message.message || "";
  const createdAt = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString()
    : "";

  return (
    <div
      className={`flex ${isMyMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isMyMessage
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-none"
        }`}
      >
        <p className="text-sm">{messageText}</p>
        <span
          className={`text-xs mt-1 block ${
            isMyMessage ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {createdAt}
        </span>
      </div>
    </div>
  );
}

export default Message;
