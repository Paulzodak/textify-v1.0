import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    searchedUser: {},
    chatItemData: {},
  },
  reducers: {
    setSearchedUser: (state, action) => {
      state.searchedUser = action.payload.searchedUser;
    },
    setChatItemData: (state, action) => {
      state.chatItemData = action.payload.chatItemData;
    },
  },
});

export const { setSearchedUser, setChatItemData } = peopleSlice.actions;
export default peopleSlice.reducer;
