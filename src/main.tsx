import store from "./store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.scss";
import "./styles/icons.scss";
import "./styles/theme.scss";

import AuthGuard from "./features/authGuard";

// Auth pages
import Auth from "./layers/auth";
import Login from "./pages/login";
import Register from "./pages/register";

// App pages
import Root from "./layers/root";
import Main from "./pages/main";
import Project from "./pages/project";

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
    element: <Root />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "projects/:id",
        element: <Project />,
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
