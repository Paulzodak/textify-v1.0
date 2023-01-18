import { configureStore } from "@reduxjs/toolkit";
import styles from "./styles";
import user from "./user";
import people from "./people";
import home from "./home";
import settings from "./settings";
export default configureStore({
  reducer: {
    styles: styles,
    user: user,
    people: people,
    home: home,
    settings: settings,
  },
});
