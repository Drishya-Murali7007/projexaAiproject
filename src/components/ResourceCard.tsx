import React from 'react';
import { Download, FileText, Share2, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

interface ResourceCardProps {
  title: string;
  downloadUrl: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, downloadUrl }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-pastel-indigo dark:bg-indigo-900/30 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 border-2 border-white dark:border-slate-800 shadow-sm transition-colors">
          <FileText size={24} />
        </div>
        <div className="flex gap-1">
          <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Share2 size={16} />
          </button>
          <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-2 py-0.5 bg-pastel-blue dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase rounded-md transition-colors">PDF</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">2.4 MB • 12 Oct 2025</span>
        </div>
      </div>
      
      <a
        href={downloadUrl}
        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-2xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
      >
        <Download size={16} />
        Download Resource
      </a>
    </motion.div>
  );
};

export default ResourceCard;
