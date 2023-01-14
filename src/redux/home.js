import { createSlice } from "@reduxjs/toolkit";
export const homeSlice = createSlice({
  name: "home",
  initialState: {
    layout: {
      showChatsPage: true,
      showPeoplePage: false,
      showSettingsPage: false,
      mountChats: false,
      showChat: false,
      showHomeNav: true,
    },
  },
  reducers: {
    setShowChatsPage: (state, action) => {
      state.layout.showChatsPage = action.payload.showChatsPage;
    },
    setShowPeoplePage: (state, action) => {
      state.layout.showPeoplePage = action.payload.showPeoplePage;
    },
    setMountChats: (state, action) => {
      state.layout.mountChats = action.payload.mountChats;
    },
    setShowChat: (state, action) => {
      state.layout.showChat = action.payload.showChat;
    },
    setShowHomeNav: (state, action) => {
      state.layout.showHomeNav = action.payload.showHomeNav;
    },
    setShowSettingsPage: (state, action) => {
      state.layout.showSettingsPage = action.payload.showSettingsPage;
    },
  },
});
export const {
  setShowSettingsPage,
  setShowHomeNav,
  setShowChat,
  setMountChats,
  setShowChatsPage,
  setShowPeoplePage,
} = homeSlice.actions;
export default homeSlice.reducer;
