import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "./component/Redux.js/Reducer";

export const store = configureStore({
  reducer: {
    data: userDetailReducer, // Use the correct reducer export
  },
});
