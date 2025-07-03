import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.thunk";
import { signupUserThunk } from "./user.thunk";
import { logoutUserThunk } from "./user.thunk";
import { getUserProfileThunk } from "./user.thunk";
import { getOtherParticipantsProfileThunk } from "./user.thunk";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
const initialState = {
  isAuthenticated: false,
  screenLoading: false,
  userProfile: null,
  buttonLoading: false,
  otherUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //signup User-->
      .addCase("user/signUpUser.pending", (state, action) => {
        console.log("Signup pending");
        state.buttonLoading = true;
      })
      .addCase("user/signUpUser.fulfilled", (state, action) => {
        console.log("Signup fulfilled");
        state.buttonLoading = false;
        state.isAuthenticated = true;
        state.userProfile = action.payload.user;
        console.log("User profile:", state.userProfile);
        // navigate("/");
      })
      .addCase("user/signUpUser.rejected", (state, action) => {
        console.log("Signup rejected");
        state.buttonLoading = false;
        console.error("Error during signup:", action.payload);
      })

      //login User-->

      .addCase(loginUserThunk.pending, (state, action) => {
        console.log("Login pending");
        state.buttonLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        console.log("Login fulfilled");
        state.buttonLoading = false;
        state.isAuthenticated = true;
        state.userProfile = action.payload.user;
        console.log("User profile:", state.userProfile);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        console.log("Login rejected");
        state.buttonLoading = false;
        console.error("Error during login:", action.payload);
      })

      //logout User-->

      .addCase(logoutUserThunk.pending, (state, action) => {
        console.log("Logout pending");
        state.buttonLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        console.log("Logout fulfilled");
        state.buttonLoading = false;
        state.isAuthenticated = false;
        state.userProfile = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        console.log("Logout rejected");
        state.buttonLoading = false;
        console.error("Error during logout:", action.payload);
      });

    // get User Profile-->

    builder
      .addCase(getUserProfileThunk.pending, (state, action) => {
        console.log("Get User Profile pending");
        state.screenLoading = true;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        console.log("Get User Profile fulfilled");
        state.screenLoading = false;
        state.userProfile = action.payload?.data?.user;
        console.log("User profile:", state.userProfile);
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        console.log("Get User Profile rejected");
        state.screenLoading = false;
        console.error("Error during getting user profile:", action.payload);
      });

    builder
      .addCase(getOtherParticipantsProfileThunk.pending, (state, action) => {
        console.log("Get Other Participants pending");
        state.screenLoading = true;
      })
      .addCase(getOtherParticipantsProfileThunk.fulfilled, (state, action) => {
        console.log("Get Other Participants fulfilled");
        state.screenLoading = false;
        state.otherUsers = action.payload?.participants;
        console.log("Other users:", state.otherUsers);
      })
      .addCase(getOtherParticipantsProfileThunk.rejected, (state, action) => {
        console.log("Get Other Participants rejected");
        state.screenLoading = false;
        console.error(
          "Error during getting other participants:",
          action.payload
        );
      });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
