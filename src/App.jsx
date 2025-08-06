import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white dark:bg-secondary-800 shadow-lg border border-secondary-200 dark:border-secondary-700 hover:shadow-xl transition-all duration-200"
          >
            {sidebarOpen ? <X size={20} className="text-secondary-900 dark:text-white" /> : <Menu size={20} className="text-secondary-900 dark:text-white" />}
          </button>
        </div>

        {/* Dark mode toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-secondary-800 shadow-lg border border-secondary-200 dark:border-secondary-700 hover:shadow-xl transition-all duration-200"
          >
            {darkMode ? <Sun size={20} className="text-secondary-900 dark:text-white" /> : <Moon size={20} className="text-secondary-900 dark:text-white" />}
          </button>
        </div>

        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative h-full w-80 max-w-[80vw] bg-white dark:bg-secondary-800 shadow-xl"
              >
                <Sidebar onClose={() => setSidebarOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop sidebar */}
        <div className="hidden lg:block lg:w-80 lg:fixed lg:inset-y-0 lg:z-30">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="lg:pl-80">
          <div className="min-h-screen">
            <Header />
            <main className="p-4 sm:p-6">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/analytics" element={<Dashboard />} />
                  <Route path="/campaigns" element={<Dashboard />} />
                  <Route path="/reports" element={<Dashboard />} />
                  <Route path="/settings" element={<Dashboard />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
