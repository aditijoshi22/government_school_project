import React from 'react';
import PageHeader from '../components/common/PageHeader';
import { Award, BookOpen, GraduationCap, Calendar, Download, ExternalLink } from 'lucide-react';

export default function StudentCorner() {
  const holidaysList = [
    { date: "15 Aug 2026", name: "Independence Day", day: "Saturday" },
    { date: "27 Aug 2026", name: "Ganesh Chaturthi", day: "Thursday" },
    { date: "02 Oct 2026", name: "Mahatma Gandhi Jayanti", day: "Friday" },
    { date: "20 Oct 2026", name: "Diwali Vacation Starts", day: "Tuesday" },
    { date: "26 Jan 2027", name: "Republic Day", day: "Tuesday" }
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Student Corner & Career Guidance"
        titleMr="विद्यार्थी कोपरा व करिअर मार्गदर्शन"
        subtitle="Scholarships, competitive examination resources, study materials, and holiday calendar."
        badgeText="Student Hub"
      />

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Class 5 & 8 Scholarship & NMMS Corner */}
        <div className="bg-emerald-500/10 border border-emerald-300 dark:border-emerald-900 rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Class 5 & 8 State Scholarship & NMMS Cell</h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">Maharashtra State Pre-Upper Primary & Pre-Secondary Scholarship Portal</p>
            </div>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Special coaching modules, weekly practice tests, and model question papers are provided to help Class 5 and Class 8 students clear the prestigious MSCE Scholarship & NMMS exam.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/downloads" className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Download 2026 Scholarship Practice Papers</span>
            </a>
          </div>
        </div>

        {/* High School Entrance Exam Guidance (Class 11 & 12) */}
        <div className="bg-blue-500/10 border border-blue-300 dark:border-blue-900 rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-2xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Competitive Entrance Desk (MHT-CET, NEET, JEE, CUET)</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">Junior College Science & Commerce Career Cell</p>
            </div>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Guidance for Class 11 & 12 students preparing for Engineering, Medical, Pharmacy, Agriculture, and Commerce professional degree courses. Free mentorship by alumni engineers and doctors.
          </p>
        </div>

        {/* Holiday Calendar 2026-27 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <Calendar className="w-5 h-5 text-amber-500" />
            <span>Academic Holiday List 2026-27</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Holiday / Occasion</th>
                  <th className="p-3">Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {holidaysList.map((h, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">{h.date}</td>
                    <td className="p-3 font-semibold">{h.name}</td>
                    <td className="p-3">{h.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
