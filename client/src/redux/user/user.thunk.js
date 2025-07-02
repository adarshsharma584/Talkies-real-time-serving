import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.js';


export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({username,password} ,{rejectWithValues}) => {
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
      return rejectWithValues(error.response ? error.response.data : 'Login failed');  
    }
  }
);


 export const signupUserThunk = createAsyncThunk(
  'user/signUpUser',
  async ({fullName, username, password, gender}, {rejectWithValues}) => {
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
      return rejectWithValues(error.response ? error.response.data : 'Signup failed');
    }
  });