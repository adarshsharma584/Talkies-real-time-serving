import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessageThunk, getMessagesThunk } from '../../redux/message/message.thunk';
import { addMessage } from '../../redux/message/message.slice';
import io from 'socket.io-client';

function MessageContainer() {
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  
  const { userProfile } = useSelector(state => state.userReducer);
  const { messages, selectedChat, loading } = useSelector(state => state.messageReducer);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    if (userProfile?._id) {
      newSocket.emit('join', userProfile._id);
    }

    return () => newSocket.close();
  }, [userProfile]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        dispatch(addMessage(message));
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (selectedChat?._id) {
      dispatch(getMessagesThunk(selectedChat._id));
    }
  }, [selectedChat, dispatch]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await dispatch(sendMessageThunk({
        receiverId: selectedChat._id,
        message: newMessage
      })).unwrap();

      socket.emit('sendMessage', {
        senderId: userProfile._id,
        receiverId: selectedChat._id,
        message: newMessage
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {selectedChat ? (
        <>
          <div className="bg-white p-4 shadow">
            <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.senderId === userProfile._id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.senderId === userProfile._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="bg-white p-4 shadow-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className={`rounded-full px-6 py-2 transition-colors ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;