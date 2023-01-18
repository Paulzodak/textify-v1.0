import { createSlice } from "@reduxjs/toolkit";
export const styleSlice = createSlice({
  name: "styles",
  initialState: {
    colors: {
      textBlack: "#171A1FFF",
      textGrey: "#9095A0FF",
      bgGrey: " #F3F4F6FF",
      lightBgGreen: "#EBFDFFFF",
      errBgRed: "#ffebeb",
      mainGreen: " #00BDD6FF",
      darkMainGreen: "#00A9C0FF",
    },
    fonts: {
      main: '"Epilogue", sans-serif',
      altmain: " 'Inter', sans-serif",
    },
  },
  reducers: {},
});
export default styleSlice.reducer;
