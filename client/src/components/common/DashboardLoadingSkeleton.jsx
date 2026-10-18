import React from 'react';

export default function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse pb-16">
      {/* Banner Skeleton */}
      <div className="bg-slate-200 dark:bg-slate-800/60 p-8 rounded-3xl h-36 flex items-center justify-between border border-slate-300 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-slate-300 dark:bg-slate-700 rounded-md"></div>
            <div className="w-48 h-6 bg-slate-300 dark:bg-slate-700 rounded-md"></div>
            <div className="w-40 h-3 bg-slate-300 dark:bg-slate-700 rounded-md"></div>
          </div>
        </div>
        <div className="w-24 h-10 bg-slate-300 dark:bg-slate-700 rounded-xl hidden md:block"></div>
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-32 flex flex-col justify-between">
            <div className="w-24 h-3 bg-slate-300 dark:bg-slate-800 rounded"></div>
            <div className="w-16 h-8 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="w-32 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        ))}
      </div>

      {/* Tabs / Table Skeleton */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-32 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="w-32 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-64">
          <div className="space-y-3">
            <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
