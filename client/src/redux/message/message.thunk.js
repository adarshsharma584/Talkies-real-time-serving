import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.js';

export const sendMessageThunk = createAsyncThunk(
  'message/sendMessage',
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/messages/${receiverId}`, {
        message
      });

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in sendMessageThunk:', error);
      return rejectWithValue(error.response?.data || 'Failed to send message');
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  'message/getMessages',
  async (receiverId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/messages/${receiverId}`);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in getMessagesThunk:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch messages');
    }
  }
);