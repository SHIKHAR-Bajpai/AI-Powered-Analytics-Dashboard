import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  Settings, 
  FileText,
  Activity,
  PieChart,
  Calendar,
  Bell,
  Search,
  ChevronRight,
  X
} from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: BarChart3,
      path: '/',
      color: 'text-primary-600'
    },
    {
      title: 'Analytics',
      icon: Activity,
      path: '/analytics',
      color: 'text-success-600'
    },
    {
      title: 'Campaigns',
      icon: Target,
      path: '/campaigns',
      color: 'text-warning-600'
    },
    {
      title: 'Reports',
      icon: FileText,
      path: '/reports',
      color: 'text-secondary-600'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/settings',
      color: 'text-danger-600'
    }
  ];

  const quickActions = [
    { title: 'Revenue Overview', icon: TrendingUp, color: 'text-success-600' },
    { title: 'User Analytics', icon: Users, color: 'text-primary-600' },
    { title: 'Conversion Rates', icon: PieChart, color: 'text-warning-600' },
    { title: 'Campaign Performance', icon: Target, color: 'text-secondary-600' }
  ];

  return (
    <div className="h-full bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 flex flex-col">
      {/* Logo and Brand */}
      <div className="p-4 sm:p-6 border-b border-secondary-200 dark:border-secondary-700">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white">
                ADmyBRAND
              </h1>
              <p className="text-xs sm:text-sm text-secondary-500 dark:text-secondary-400">
                Insights
              </p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            </button>
          )}
        </motion.div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 sm:p-6">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-4">
            Navigation
          </h3>
          
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  location.pathname === item.path
                    ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                    : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className={`text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-700 dark:text-primary-300'
                    : 'text-secondary-700 dark:text-secondary-300'
                }`}>
                  {item.title}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-2 w-2 h-2 bg-primary-600 rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-4">
            Quick Actions
          </h3>
          
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (index + menuItems.length) * 0.1 }}
              >
                <button
                  onClick={() => setExpandedItem(expandedItem === action.title ? null : action.title)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                      {action.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-secondary-400 transition-transform duration-200 ${
                    expandedItem === action.title ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {expandedItem === action.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-8 mt-2 space-y-1"
                  >
                    <div className="text-xs text-secondary-500 dark:text-secondary-400 px-3 py-1">
                      Quick insights and metrics
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-secondary-200 dark:border-secondary-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-secondary-900 dark:text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
              admin@admbrand.com
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs text-secondary-500 dark:text-secondary-400">
          <span>Version 2.1.0</span>
          <span>Online</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 