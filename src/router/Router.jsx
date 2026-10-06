import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { SplashPage } from "../pages/SplashPage";
import { ErrorPage } from "../pages/ErrorPage";
import { Homepage } from "../features/home/page/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "splash",
        element: <SplashPage />,
      }
    ],
  },
]);
