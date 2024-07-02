import store from './store/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './index.css';
import Root from './routes/root';
import Home from './routes/home';
import About from './routes/about';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
