import { configureStore } from "@reduxjs/toolkit";
import styles from "./styles";
import user from "./user";
export default configureStore({
  reducer: {
    styles: styles,
    user: user,
  },
});
