import {createAsyncThunk} from '@reduxjs/toolkit';

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (_ ,thunkAPI) => {
    try {
      console.log('Login thunk called');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);