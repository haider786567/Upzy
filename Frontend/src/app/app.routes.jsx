import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import MonitorsPage from "../features/monitors/pages/MonitorsPage";
import CreateMonitorPage from "../features/monitors/pages/CreateMonitorPage";
import LandingPage from "../features/landing/pages/LandingPage";

import Layout from "../features/admin/Layout";
import Monitors from "../features/admin/monitors/pages/Monitors";

const routes = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/dashboard/monitors", element: <MonitorsPage /> },
  { path: "/dashboard/monitors/new", element: <CreateMonitorPage /> },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/admin/monitors" replace /> },
      { path: "monitors", element: <Monitors /> },
    ],
  },
]);

export default routes;
