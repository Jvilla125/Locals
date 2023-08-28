import { configureStore } from "@reduxjs/toolkit";

import repoReducer from "./reducer/reducer";

const store = configureStore({
  reducer: {
    repos: repoReducer,
  },
});

export default store;