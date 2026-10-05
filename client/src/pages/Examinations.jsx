import React from 'react';
import PageHeader from '../components/common/PageHeader';
import { Calendar, Award, FileText, CheckCircle } from 'lucide-react';

export default function Examinations() {
  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Examinations & Assessment Portal"
        titleMr="परीक्षा व मूल्यमापन कक्ष"
        subtitle="Schedule of Unit Tests, Term Examinations, SSC & HSC Board examination desks."
        badgeText="Academic Assessment"
      />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* SSC & HSC Board Exam Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-emerald-500/10 border border-emerald-300 dark:border-emerald-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Class 10 SSC Board Examination Cell</h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">MSBSHSE Pune Board Examination Center</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Hall ticket distribution, internal oral & practical timetable, prelim exams, and SSC Board exam centers guidance for Class 10 students.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-300 dark:border-blue-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-2xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Class 12 HSC Board Examination Cell</h3>
                <p className="text-xs text-blue-800 dark:text-blue-300 font-semibold">Science, Commerce & Arts Higher Secondary Board</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Physics, Chemistry, Biology practical examination dates, internal assessment marks submission desk, and HSC Board hall tickets.
            </p>
          </div>

        </div>

        {/* Assessment System per Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>Section-Wise Assessment Guidelines</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900 space-y-2">
              <strong className="text-amber-900 dark:text-amber-200 font-bold block">Primary (Class 1-4)</strong>
              <p className="text-slate-600 dark:text-slate-300">No traditional marks or pass/fail stress. Evaluated continuously via descriptive grades (A/B/C) across reading, numeracy, sports, and social habits.</p>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-2">
              <strong className="text-emerald-900 dark:text-emerald-200 font-bold block">Secondary (Class 5-10)</strong>
              <p className="text-slate-600 dark:text-slate-300">Unit Tests (20 marks), Semester Exams (80 marks), oral & practical tests. Includes Class 5 & 8 Scholarship exam mock tests.</p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900 space-y-2">
              <strong className="text-blue-900 dark:text-blue-200 font-bold block">High School (Class 11-12)</strong>
              <p className="text-slate-600 dark:text-slate-300">Stream-based terminal examinations (70 written + 30 practical/project marks). Prelim exams prior to final HSC Board exams.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
