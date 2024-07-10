import { createListenerMiddleware } from "@reduxjs/toolkit";
import userApi from "../services/user.api";

function saveTokenToLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.access_token) {
      saveTokenToLocalStorage(action.payload.access_token);
    }
  },
});

listenerMiddleware.startListening({
  matcher: userApi.endpoints.register.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.access_token) {
      saveTokenToLocalStorage(action.payload.access_token);
    }
  },
});

export default listenerMiddleware;
