import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  screenLoading: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state, action) => {
        console.log("Login pending");
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        console.log("Login fulfilled");
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        console.log("Login rejected");
      });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;