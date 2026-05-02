import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import MonitorsPage from '../features/monitors/pages/MonitorsPage';
import CreateMonitorPage from '../features/monitors/pages/CreateMonitorPage';

const routes = createBrowserRouter([

    { path: '/', element: <Navigate to="/register" replace /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/dashboard', element: <DashboardPage /> },
    { path: '/dashboard/monitors', element: <MonitorsPage /> },
    { path: '/dashboard/monitors/new', element: <CreateMonitorPage /> },
]);

export default routes;