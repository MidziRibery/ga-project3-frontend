import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
  },
});
