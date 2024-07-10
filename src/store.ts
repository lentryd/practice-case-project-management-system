import { configureStore } from "@reduxjs/toolkit";
import listenerMiddleware from "./middleware/auth";
import { api } from "./services/api";
import user from "./features/userSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
