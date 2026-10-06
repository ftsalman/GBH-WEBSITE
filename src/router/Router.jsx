import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { SplashPage } from "../pages/SplashPage";
import { ErrorPage } from "../pages/ErrorPage";
import { Hompage } from "../features/home/page/Hompage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Hompage />,
      },
      {
        path: "splash",
        element: <SplashPage />,
      }
    ],
  },
]);
