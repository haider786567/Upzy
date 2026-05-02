import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import MonitorsPage from '../features/monitors/pages/MonitorsPage';
import CreateMonitorPage from '../features/monitors/pages/CreateMonitorPage';
import LandingPage from '../features/landing/pages/LandingPage';
import IncidentPage from '../features/incident/pages/IncidentPage';
import AnalyticsPage from '../features/analytics/pages/AnalyticsPage';

const routes = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/dashboard', element: <DashboardPage /> },
    { path: '/dashboard/monitors', element: <MonitorsPage /> },
    { path: '/dashboard/monitors/new', element: <CreateMonitorPage /> },
    { path: '/dashboard/incidents', element: <IncidentPage /> },
    { path: '/dashboard/analytics', element: <AnalyticsPage /> },
]);

export default routes;