import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.js';
// import { logout } from '../../../../server/controllers/user.controller.js';


export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({username,password} ,{rejectWithValue}) => {
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
      return rejectWithValue(error.response ? error.response.data : 'Login failed');  
    }
  }
);


 export const signupUserThunk = createAsyncThunk(
  'user/signUpUser',
  async ({fullName, username, password, gender}, {rejectWithValue}) => {
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
      return rejectWithValue(error.response ? error.response.data : 'Signup failed');
    }
  });

  export const logoutUserThunk = createAsyncThunk(
    'user/logoutUser',
    async (_, {rejectWithValue}) => {
      try {
        const response = await axiosInstance.post('/users/logout');
        if (response.status === 200) {
          console.log(response?.data?.message);
          return response;
        }
      } catch (error) {
        console.log('Error in logoutUserThunk:', error);
        return rejectWithValue(error.response ? error.response.data : 'Logout failed');
      }
    }
  );

  export const getUserProfileThunk = createAsyncThunk(
    'user/getUserProfile',
    async(_, {rejectWithValue}) => {
      try {
        const response = await axiosInstance.get('/users/get-profile');
        if (response.status === 200) {
          return response;
        }
      } catch (error) {
        console.log('Error in getUserProfileThunk:', error);
        return rejectWithValue(error.response ? error.response.data : 'Failed to fetch user profile');
      }
    }
  );

export const getOtherParticipantsProfileThunk = createAsyncThunk(
  'user/getOtherParticipantsProfile',
  async(_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(`/users/other-participants-profile`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log('Error in getOtherParticipantsProfileThunk:', error);
      return rejectWithValue(error.response ? error.response.data : 'Failed to fetch other participants profile');
    }
  }
  );
