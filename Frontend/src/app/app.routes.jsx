import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import MonitorsPage from '../features/monitors/pages/MonitorsPage';
import CreateMonitorPage from '../features/monitors/pages/CreateMonitorPage';
import LandingPage from '../features/landing/pages/LandingPage';
import IncidentPage from '../features/incident/pages/IncidentPage';
import AnalyticsPage from '../features/analytics/pages/AnalyticsPage';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import VerifyOtp from '../features/auth/pages/VerifyOtp';
import ResetPassword from '../features/auth/pages/ResetPassword';
import AlertsPage from '../features/alerts/pages/AlertsPage';
import SettingsPage from '../features/dashboard/pages/SettingsPage';
import Layout from "../features/admin/Layout";
import Monitors from "../features/admin/monitors/pages/Monitors";

const routes = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '/dashboard', element: <DashboardPage /> },
    { path: '/dashboard/monitors', element: <MonitorsPage /> },
    { path: '/dashboard/monitors/new', element: <CreateMonitorPage /> },
    { path: '/dashboard/incidents', element: <IncidentPage /> },
    { path: '/dashboard/analytics', element: <AnalyticsPage /> },
    { path: '/dashboard/alerts', element: <AlertsPage /> },
    { path: '/dashboard/settings', element: <SettingsPage /> },
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
