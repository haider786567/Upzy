import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Shield, 
  Settings, 
  LogOut, 
  BarChart3,
  Bell
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Activity, label: 'Monitors', path: '/dashboard/monitors' },
    { icon: Shield, label: 'Incidents', path: '/dashboard/incidents' },
    { icon: Bell, label: 'Alerts', path: '/dashboard/alerts' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: LogOut, label: 'Logout', path: '/login' },
  ];

  return (
    <div className="h-full w-64 bg-linear-to-b from-dark to-deep text-cream flex flex-col p-6 shadow-2xl z-50 border-r border-white/5">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
          <Activity size={24} className="text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tight">Upzy</span>
      </div>

      <div className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                isActive 
                ? 'bg-cream text-primary font-bold shadow-lg shadow-black/20' 
                : 'hover:bg-cream/10 text-rose'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-primary' : 'group-hover:text-cream'} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="space-y-2 pt-6 border-t border-cream/10">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-cream/10 text-rose transition-all group"
          >
            <item.icon size={20} className="group-hover:text-cream" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
