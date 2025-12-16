import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Layout,
  Dashboard,
  UsersAll,
  About,
  EncodeFace,
  RecognizeFace,
} from "./files_upload.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "recognize",
        element: <RecognizeFace />,
      },
      {
        path: "add",
        element: <EncodeFace />,
      },
      {
        path: "students",
        element: <UsersAll />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
