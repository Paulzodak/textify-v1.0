import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: "",
    chats: [
      { id: Math.random() * 1 },
      { id: Math.random() * 2 },
      { id: Math.random() * 3 },
      { id: Math.random() * 4 },
    ],
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
    setActive: (state, action) => {
      state.currentUser.isActive = action.payload.isActive;
    },
  },
});
export const { setChats, setCurrentUser, setActive } = userSlice.actions;
export default userSlice.reducer;
