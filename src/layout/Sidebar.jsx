import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Sidebar = ({ collapsed = false, onCollapse }) => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Projects', href: '/projects', icon: '📁' },
    { label: 'Scans', href: '/scans', icon: '🔍' },
    { label: 'Schedule', href: '/schedule', icon: '📅' },
    { label: 'Notifications', href: '/notifications', icon: '🔔' },
    { label: 'Settings', href: '/settings', icon: '⚙️' },
    { label: 'Support', href: '/support', icon: '❓' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className={`${
      collapsed ? 'w-20' : 'w-64'
    } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-screen`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-teal-accent">SecureVault</h1>
          )}
          <button
            onClick={onCollapse}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive(item.href)
                ? 'bg-teal-accent text-black'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
        >
          <span>{isDark ? '☀️' : '🌙'}</span>
          {!collapsed && <span className="text-sm">{isDark ? 'Light' : 'Dark'}</span>}
        </button>

        <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${collapsed && 'p-0 justify-center'}`}>
          <div className="w-10 h-10 rounded-full bg-teal-accent flex items-center justify-center text-white font-bold text-sm">
            JD
          </div>
          {!collapsed && (
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar collapsed={sidebarCollapsed} onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};
