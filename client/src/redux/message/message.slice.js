import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk, getMessagesThunk } from "./message.thunk";

const initialState = {
  messages: [],
  loading: false,
  error: null,
  selectedChat: null
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Send Message
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.messages.push(action.payload.data);
        }
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Messages
      .addCase(getMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload?.responseData)) {
          state.messages = action.payload.responseData;
        } else {
          state.messages = [];
        }
      })
      .addCase(getMessagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedChat, addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;