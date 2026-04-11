import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ResourceCard from '../components/ResourceCard';
import { Search, Filter, BookOpen, Loader2, Layout, Users, Calendar, Award, ChevronRight, FileText } from 'lucide-react';
import { getResources } from '../services/api';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  const [resources, setResources] = useState<{ id: number; title: string; downloadUrl: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getResources();
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 transition-colors duration-300">
      <Navbar />

      <div className="flex">
        {/* Sidebar (Consistent with Dashboard) */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden xl:block h-[calc(100vh-64px)] sticky top-16 p-6 transition-colors">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Main Menu</p>
              <nav className="space-y-1">
                <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                  <Layout size={18} />
                  Dashboard
                </Link>
                <Link to="/resources" className="flex items-center gap-3 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-semibold">
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
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Categories</p>
              <nav className="space-y-1">
                <button className="w-full flex items-center justify-between px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                  <span className="flex items-center gap-3"><BookOpen size={18} /> Textbooks</span>
                  <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                  <span className="flex items-center gap-3"><FileText size={18} /> Lab Manuals</span>
                  <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                  <span className="flex items-center gap-3"><Award size={18} /> Question Papers</span>
                  <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Academic Resources</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Access all your study materials and textbooks in one place.</p>
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-72 transition-all shadow-sm text-slate-900 dark:text-slate-100"
                  />
                </div>
                <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-indigo-600 dark:text-indigo-400 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-semibold mt-6">Curating your resources...</p>
              </div>
            ) : (
              <>
                {filteredResources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((resource, idx) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <ResourceCard
                          title={resource.title}
                          downloadUrl={resource.downloadUrl}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
                    <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No resources found</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">We couldn't find any resources matching your search. Try different keywords.</p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-8 px-6 py-2.5 bg-indigo-600 dark:bg-indigo-700 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resources;
