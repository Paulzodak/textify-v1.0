import { createSlice } from "@reduxjs/toolkit";
export const styleSlice = createSlice({
  name: "styles",
  initialState: {
    colors: {
      textBlack: "#171A1FFF",
      textGrey: "#9095A0FF",
      bgGrey: " #F3F4F6FF",
      mainGreen: " #00BDD6FF",
    },
    fonts: {
      main: '"Epilogue", sans-serif',
    },
  },
  reducers: {},
});
export default styleSlice.reducer;
