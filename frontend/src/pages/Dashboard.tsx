import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AIChat from '../components/AIChat';
import Notification from '../components/Notification';
import { 
  BookOpen, Bell, Sparkles, Users, Clock, 
  CreditCard, Calendar, FileText, MessageSquare, 
  UserCheck, GraduationCap, ClipboardList, 
  Award, HelpCircle, Layout, Database, 
  Globe, Settings, BarChart3, Mail
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New resource added: Machine Learning Basics', type: 'success' as const },
    { id: 2, message: 'Upcoming exam schedule released', type: 'info' as const },
  ]);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const services = [
    { label: 'Admit Card', icon: CreditCard, color: 'text-blue-600', bg: 'bg-pastel-blue' },
    { label: 'Assignments', icon: ClipboardList, color: 'text-purple-600', bg: 'bg-pastel-purple' },
    { label: 'Attendance', icon: UserCheck, color: 'text-green-600', bg: 'bg-pastel-green' },
    { label: 'Circular', icon: Bell, color: 'text-orange-600', bg: 'bg-pastel-orange' },
    { label: 'Courses', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-pastel-indigo' },
    { label: 'Fees', icon: Database, color: 'text-pink-600', bg: 'bg-pastel-pink' },
    { label: 'Feedback', icon: MessageSquare, color: 'text-teal-600', bg: 'bg-pastel-teal' },
    { label: 'LMS', icon: Layout, color: 'text-blue-500', bg: 'bg-pastel-blue' },
    { label: 'My Report Card', icon: Award, color: 'text-yellow-600', bg: 'bg-pastel-yellow' },
    { label: 'Time Table', icon: Calendar, color: 'text-purple-500', bg: 'bg-pastel-purple' },
    { label: 'Resources', icon: FileText, color: 'text-indigo-500', bg: 'bg-pastel-indigo' },
    { label: 'Performances', icon: BarChart3, color: 'text-green-500', bg: 'bg-pastel-green' },
    { label: 'Mentor Mentee', icon: Users, color: 'text-orange-500', bg: 'bg-pastel-orange' },
    { label: 'Survey', icon: HelpCircle, color: 'text-pink-500', bg: 'bg-pastel-pink' },
    { label: 'Central Comm', icon: Mail, color: 'text-teal-500', bg: 'bg-pastel-teal' },
    { label: 'College Info', icon: Globe, color: 'text-blue-600', bg: 'bg-pastel-blue' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 transition-colors duration-300">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar (Simulated) */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden xl:block h-[calc(100vh-64px)] sticky top-16 p-6 transition-colors">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Main Menu</p>
              <nav className="space-y-1">
                <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-semibold">
                  <Layout size={18} />
                  Dashboard
                </Link>
                <Link to="/resources" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                  <BookOpen size={18} />
                  Resources
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                  <Users size={18} />
                  Community
                </button>
              </nav>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Academic</p>
              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                  <Calendar size={18} />
                  Schedule
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                  <Award size={18} />
                  Grades
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Academic Portal</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">School of Engineering & Technology</p>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Academic Year: 2025-2026</span>
              </div>
            </div>

            {/* Notifications Bar */}
            {notifications.length > 0 && (
              <div className="mb-10 space-y-3">
                {notifications.map(notif => (
                  <Notification
                    key={notif.id}
                    message={notif.message}
                    type={notif.type}
                    onClose={() => removeNotification(notif.id)}
                  />
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left: Services Grid */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-10 gap-x-4">
                    {services.map((service, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center text-center group cursor-pointer"
                      >
                        <div className={`${service.bg} dark:bg-opacity-10 ${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-all border-2 border-white dark:border-slate-800`}>
                          <service.icon size={28} />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                          {service.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: AI Assistant & Quick Stats */}
              <div className="space-y-8">
                <section className="bg-indigo-600 dark:bg-indigo-700 rounded-3xl p-6 text-white overflow-hidden relative shadow-lg">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={20} />
                      <h2 className="text-lg font-bold">AI Study Buddy</h2>
                    </div>
                    <p className="text-indigo-100 text-sm mb-6">Ask me anything about your courses or resources.</p>
                    <AIChat />
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>
                </section>

                <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pastel-blue dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                          <BookOpen size={16} />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Resources</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">124</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pastel-green dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                          <Clock size={16} />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Study Time</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">4.5h</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
