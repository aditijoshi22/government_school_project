import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import { Download, FileText, Search } from 'lucide-react';

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/public/downloads')
      .then(res => {
        if (res.data.success) {
          setDownloads(res.data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = downloads.filter(d => selectedCategory === 'all' || d.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Public Downloads Repository"
        titleMr="प्रपत्र व अर्ज डाउनलोड्स"
        subtitle="Official forms, RTI disclosures, TC applications, syllabus handbooks, and exam papers."
        badgeText="Document Center"
      />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {['all', 'Forms', 'Exam Papers', 'Syllabus'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition capitalize ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Documents' : cat}
            </button>
          ))}
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold text-amber-600">{item.category}</span>
                    <span>File Size: {item.file_size}</span>
                  </div>
                </div>
              </div>

              <a
                href={item.file_url}
                download
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
