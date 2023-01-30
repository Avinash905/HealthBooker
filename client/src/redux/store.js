import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootSlice";

const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});

export default store;
