import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import { Bell, Search, FileText, Download, AlertCircle } from 'lucide-react';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [selectedSection, setSelectedSection] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/public/notices?section=${selectedSection}`)
      .then(res => {
        if (res.data.success) {
          setNotices(res.data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedSection]);

  const filteredNotices = notices.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Official Notices & Circulars"
        titleMr="सूचना व शासकीय परिपत्रके"
        subtitle="Stay updated with school announcements, examination timetables, and circulars."
        badgeText="Official Updates"
      />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Controls Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Section Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedSection === 'all'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              All Notices
            </button>
            {SECTIONS_CONFIG.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSection(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  selectedSection === s.id
                    ? 'text-white shadow'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
                style={{
                  backgroundColor: selectedSection === s.id ? s.themeColor : undefined,
                  borderColor: selectedSection === s.id ? s.themeColor : undefined
                }}
              >
                {s.shortName}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>

        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map(notice => (
              <div key={notice.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    {notice.is_important === 1 && (
                      <span className="bg-rose-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                        Important
                      </span>
                    )}
                    <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold px-2.5 py-0.5 rounded-full uppercase text-[10px]">
                      {notice.category}
                    </span>
                  </div>
                  <span className="text-slate-400">{notice.created_at?.split('T')[0] || notice.created_at}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {notice.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {notice.content}
                </p>

                {notice.attachment_url && (
                  <div className="pt-2">
                    <a
                      href={notice.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-bold text-xs px-4 py-2 rounded-xl transition border border-slate-200 dark:border-slate-700"
                    >
                      <FileText className="w-4 h-4 text-amber-500" />
                      <span>Download Official PDF Circular</span>
                      <Download className="w-3.5 h-3.5 text-slate-400 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              No notices matching your query.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
