import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.js';
// import { logout } from '../../../../server/controllers/user.controller.js';


export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', {
        username,
        password
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log('Error in loginUserThunk:', error);
      const normalized =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Login failed';
      return rejectWithValue(normalized);
    }
  }
);


export const signupUserThunk = createAsyncThunk(
  'user/signUpUser',
  async ({ fullName, username, password, gender }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/register', {
        fullName,
        username,
        password,
        gender

      });

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log('Error in signUpUserThunk:', error);
      const normalized =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Signup failed';
      return rejectWithValue(normalized);
    }
  });

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/logout');
      if (response.status === 200) {
        console.log(response?.data?.message);
        return response;
      }
    } catch (error) {
      console.log('Error in logoutUserThunk:', error);
      const normalized =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Logout failed';
      return rejectWithValue(normalized);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  'user/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/get-profile');
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log('Error in getUserProfileThunk:', error);
      const normalized =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Failed to fetch user profile';
      return rejectWithValue(normalized);
    }
  }
);

export const getOtherParticipantsProfileThunk = createAsyncThunk(
  'user/getOtherParticipantsProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/other-participants-profile`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log('Error in getOtherParticipantsProfileThunk:', error);
      const normalized =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Failed to fetch other participants profile';
      return rejectWithValue(normalized);
    }
  }
);
