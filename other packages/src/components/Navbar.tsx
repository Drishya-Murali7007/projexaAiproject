import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, User, LogOut, Search, GraduationCap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Menu & Logo */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Menu size={20} />
              <span className="text-sm font-medium hidden sm:block">Menu</span>
            </button>
            
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">ZenSpace</span>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-1.5 w-96 transition-colors">
            <Search size={16} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search resources, assignments..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
            />
          </div>
          
          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
            
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">Ishita Singh</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-bold">Student</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-pastel-indigo dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden">
                <User size={20} />
              </div>
            </div>

            <Link
              to="/"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
