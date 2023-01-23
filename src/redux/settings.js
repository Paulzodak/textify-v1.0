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
          id: 0,
          title: "Edit Profile",
          icon: <PencilIcon />,
          active: true,
          duration: 0.8,
        },
        {
          id: 1,
          title: "Security",
          icon: <SecurityIcon />,
          active: false,
          duration: 1,
        },
        {
          id: 2,
          title: "Theme",
          icon: <ThemeIcon />,
          active: false,
          duration: 1.2,
        },
      ],
      utilityMenuItems: [
        { title: "Logout", icon: <PencilIcon />, action: "signout" },
      ],
    },
  },
  reducers: {
    setActive: (state, action) => {
      state.layout.navMenuItems.map((item, index) => {
        if (item.id === action.payload.index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
  },
});
export const { setActive } = settingsSlice.actions;
export default settingsSlice.reducer;
