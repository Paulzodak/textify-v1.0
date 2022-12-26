import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: "",
    chats: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.currentUser;
    },

    // The list of chats
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },

    // Adds a new message to the chats
    addMessage: (state, action) => {
      state.chats.action.payload.receiverId.push(action.payload.newMessageObj);
    },
  },
});
export const { setChats, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
