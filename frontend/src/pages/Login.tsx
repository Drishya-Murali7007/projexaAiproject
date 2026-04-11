import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { loginUser } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      await loginUser(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pastel-blue dark:bg-blue-900/20 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pastel-purple dark:bg-purple-900/20 rounded-full blur-[120px] opacity-60"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 p-8 sm:p-12 transition-colors">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none mb-6">
              <GraduationCap className="text-white w-10 h-10" />
            </div>
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">ZenSpace</h1>
            <p className="text-slate-500 dark:text-slate-400 text-center mt-2 font-medium">Academic Resource Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-transparent" />
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Remember me</span>
              </label>
              <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">Forgot?</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-slate-200 dark:shadow-none hover:shadow-indigo-200 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Portal'}
              {!isLoading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
              <Sparkles size={14} />
              <span className="text-xs font-bold uppercase tracking-widest">New Student?</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Contact your department to <span className="text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline">Request Access</span>
            </p>
          </div>
        </div>
        
        <p className="text-center text-slate-400 dark:text-slate-600 text-xs mt-8 font-medium">
          &copy; 2026 ZenSpace Academic Systems. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
