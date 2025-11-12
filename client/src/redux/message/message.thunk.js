import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.js';

export const sendMessageThunk = createAsyncThunk(
  'message/sendMessage',
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/messages/send-message/${receiverId}`, {
        message
      });

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in sendMessageThunk:', error);
      const normalized =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Failed to send message';
      return rejectWithValue(normalized);
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  'message/getMessages',
  async (receiverId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/messages/get-messages/${receiverId}`);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in getMessagesThunk:', error);
      const normalized =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Failed to fetch messages';
      return rejectWithValue(normalized);
    }
  }
);