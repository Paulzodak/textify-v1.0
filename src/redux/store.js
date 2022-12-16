import { configureStore } from "@reduxjs/toolkit";
import styles from "./styles";
export default configureStore({
  reducer: {
    styles: styles,
  },
});
