import store from "./store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.scss";
import "./styles/icons.scss";
import "./styles/theme.scss";

import AuthGuard from "./features/authGuard";

// Auth pages
import Auth from "./layers/auth/auth";
import Login from "./pages/login";
import Register from "./pages/register";

// App pages
import App from "./layers/root/app";

const router = createBrowserRouter([
  // Auth routes
  {
    path: "/login",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },

  // App routes
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <h1>Home page</h1>,
      },
      {
        path: "about",
        element: <h1>About page</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <AuthGuard>
      <RouterProvider router={router} />
    </AuthGuard>
  </Provider>
);
