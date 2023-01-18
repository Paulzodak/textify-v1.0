import { createSlice } from "@reduxjs/toolkit";
import { HiPencil as PencilIcon } from "react-icons/hi";
import { MdOutlineSecurity as SecurityIcon } from "react-icons/md";
import { MdModeNight as ThemeIcon } from "react-icons/md";
export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    layout: {
      // WOULD BE REFACTORED LATER {USING ELEMENTS IN REDUX STATES IS A BAD APPROACH}
      navMenuItems: [
        {
          title: "Edit Profile",
          icon: <PencilIcon />,
          active: true,
          duration: 0.8,
        },
        {
          title: "Security",
          icon: <SecurityIcon />,
          active: false,
          duration: 1,
        },
        { title: "Theme", icon: <ThemeIcon />, active: false, duration: 1.2 },
      ],
      utilityMenuItems: [
        { title: "Logout", icon: <PencilIcon />, action: "signout" },
      ],
    },
  },
});
export const {} = settingsSlice.actions;
export default settingsSlice.reducer;
