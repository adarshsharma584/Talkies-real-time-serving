import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessageThunk,
  getMessagesThunk,
} from "../../redux/message/message.thunk";
import { addMessage } from "../../redux/message/message.slice";
import Message from "./Message";
import io from "socket.io-client";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";

function MessageContainer() {
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.userReducer);
  const { messages, selectedChat, loading } = useSelector(
    (state) => state.messageReducer
  );

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    if (userProfile?._id) {
      newSocket.emit("join", userProfile._id);
    }

    return () => newSocket.close();
  }, [userProfile]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        if (message.senderId === selectedChat?._id) {
          dispatch(addMessage(message));
        }
      });

      socket.on("typing", ({ userId }) => {
        if (userId === selectedChat?._id) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 3000);
        }
      });
    }
  }, [socket, dispatch, selectedChat]);

  useEffect(() => {
    if (selectedChat?._id) {
      dispatch(getMessagesThunk(selectedChat._id));
    }
  }, [selectedChat, dispatch]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (socket && selectedChat) {
      socket.emit("typing", {
        senderId: userProfile._id,
        receiverId: selectedChat._id,
      });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const messagePayload = {
        receiverId: selectedChat._id,
        message: newMessage,
      };

      const result = await dispatch(sendMessageThunk(messagePayload)).unwrap();

      if (socket) {
        socket.emit("sendMessage", {
          senderId: userProfile._id,
          receiverId: selectedChat._id,
          message: newMessage,
          _id: result.data._id,
          createdAt: result.data.createdAt,
        });
      }

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div className="bg-white dark:bg-gray-800 p-4 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {selectedChat.username?.[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">
                  {selectedChat.username}
                </h2>
                {isTyping && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    typing...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map(
                (msg, index) =>
                  msg && (
                    <Message key={msg._id || `msg-${index}`} message={msg} />
                  )
              )
            ) : (
              <div className="text-center text-gray-500">No messages yet</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <BsEmojiSmile size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading || !newMessage.trim()}
                className={`p-2 rounded-full ${
                  loading || !newMessage.trim()
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                } transition-colors`}
              >
                <FiSend size={20} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Welcome to Chat-Bird
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Select a user from the sidebar to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;
