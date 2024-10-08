import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import Lessons from "./pages/Lessons.jsx";
import Lesson from "./pages/Lesson.jsx";

import SoundBank from "./pages/SoundBank.jsx";
import Sound from "./pages/Sound.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/lessons",
        element: <Lessons />,
      },
    ],
  },
  {
    path: "/lesson/:id",
    element: <App />,
    children: [
      {
        path: "/lesson/:id",
        element: <Lesson />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sound bank",
        element: <SoundBank />,
      },
    ],
  },
  {
    path: "/sound/:id",
    element: <App />,
    children: [
      {
        path: "/sound/:id",
        element: <Sound />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/reset/:passtoken",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
