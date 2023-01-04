import { createSlice } from "@reduxjs/toolkit";
export const homeSlice = createSlice({
  name: "home",
  initialState: {
    layout: {
      showChatsPage: true,
      showPeoplePage: false,
      mountChats: false,
    },
  },
  reducers: {
    setShowChatsPage: (state, action) => {
      state.layout.showChatsPage = action.payload.showChatPage;
    },
    setShowPeoplePage: (state, action) => {
      state.layout.showPeoplePage = action.payload.showPeoplePage;
    },
    setMountChats: (state, action) => {
      state.layout.mountChats = action.payload.mountChats;
    },
  },
});
export const { setMountChats, setShowChatsPage, setShowPeoplePage } =
  homeSlice.actions;
export default homeSlice.reducer;
