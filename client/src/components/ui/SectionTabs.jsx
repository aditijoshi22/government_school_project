import React from 'react';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import { Sparkles, BookOpen, GraduationCap, LayoutGrid } from 'lucide-react';

export default function SectionTabs({ activeSection, onSelectSection, showOverview = true }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm mb-6">
      {/* Scrollable Segmented Control */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {showOverview && (
          <button
            onClick={() => onSelectSection('overview')}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-bold text-sm transition shrink-0 ${
              activeSection === 'overview'
                ? 'bg-slate-900 text-amber-400 shadow-md border border-slate-800'
                : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-amber-400" />
            <span>All Sections Overview</span>
          </button>
        )}

        {SECTIONS_CONFIG.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-bold text-sm transition shrink-0 border ${
                isActive
                  ? 'text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              style={{
                backgroundColor: isActive ? sec.themeColor : undefined,
                borderColor: isActive ? sec.themeColor : undefined
              }}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                {getIcon(sec.iconName)}
              </div>
              <div className="text-left">
                <div className="leading-tight">{sec.shortName}</div>
                <div className={`text-[10px] font-medium opacity-90 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {sec.classList[0]} - {sec.classList[sec.classList.length - 1]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
