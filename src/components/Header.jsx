import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  ChevronDown,
  Calendar,
  Filter
} from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New campaign launched successfully', time: '2 min ago', unread: true },
    { id: 2, message: 'Revenue target exceeded by 15%', time: '1 hour ago', unread: true },
    { id: 3, message: 'System maintenance scheduled', time: '3 hours ago', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search and Filters */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>

          {/* Date Filter - Hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-secondary-500 dark:text-secondary-400" />
            <select className="bg-transparent text-secondary-700 dark:text-secondary-300 border-none focus:outline-none focus:ring-0 text-sm cursor-pointer">
              <option className="bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">Last 30 days</option>
              <option className="bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">Last 7 days</option>
              <option className="bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">Last 90 days</option>
              <option className="bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">Custom range</option>
            </select>
          </div>

          {/* Filter Button - Hidden on mobile */}
          <button className="hidden sm:block p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors duration-200">
            <Filter className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
          </button>
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors duration-200 relative">
              <Bell className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {unreadCount}
                </motion.div>
              )}
            </button>
          </div>

          {/* Settings - Hidden on mobile */}
          <button className="hidden sm:block p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors duration-200">
            <Settings className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-secondary-900 dark:text-white">
                  Admin User
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  admin@admbrand.com
                </p>
              </div>
              <ChevronDown className={`w-4 h-4 text-secondary-500 dark:text-secondary-400 transition-transform duration-200 ${
                showUserMenu ? 'rotate-180' : ''
              }`} />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
                  <p className="text-sm font-medium text-secondary-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">admin@admbrand.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-secondary-200 dark:border-secondary-700 my-1"></div>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors duration-200">
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 