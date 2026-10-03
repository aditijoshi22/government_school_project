import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = "amber", trend, subtitle }) {
  const colorMap = {
    amber: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900",
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900",
    blue: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900",
    indigo: "bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:border-indigo-900",
    rose: "bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900"
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {title}
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl border ${colorMap[color] || colorMap.amber}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
          {trend}
        </div>
      )}
    </div>
  );
}
