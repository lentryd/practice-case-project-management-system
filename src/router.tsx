import { createBrowserRouter } from "react-router-dom";

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
    ],
  },
]);

export default router;
