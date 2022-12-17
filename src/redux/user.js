import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload.id;
    },
  },
});
export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
