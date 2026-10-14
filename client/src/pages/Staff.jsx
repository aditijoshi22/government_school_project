import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { SECTIONS_CONFIG, getSectionName } from '@shared/sections.config';
import { GraduationCap } from 'lucide-react';
import { getLocalizedText } from '../utils/bilingual';

export default function Staff() {
  const { t, i18n } = useTranslation(['staff', 'common']);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('all');

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/public/staff?section=${selectedSection}&lang=${i18n.language}`)
      .then(res => {
        if (res.data.success) {
          setStaff(res.data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedSection, i18n.language]);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={t('staff.pageTitle')}
        subtitle={t('staff.pageSubtitle')}
        badgeText={t('staff.badge')}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Section Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedSection === 'all'
                ? 'bg-slate-900 text-amber-400 shadow'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {i18n.language === 'mr' ? 'सर्व शिक्षक व कर्मचारी' : i18n.language === 'hi' ? 'सभी शिक्षक व कर्मचारी' : 'All Staff'}
          </button>
          {SECTIONS_CONFIG.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSection(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                selectedSection === s.id
                  ? 'text-white shadow'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              style={{
                backgroundColor: selectedSection === s.id ? s.themeColor : undefined,
                borderColor: selectedSection === s.id ? s.themeColor : undefined
              }}
            >
              {getSectionName(s, i18n.language)}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staff.map(member => {
            const designation = getLocalizedText(member, 'designation', i18n.language) || member.designation;
            const qualification = getLocalizedText(member, 'qualification', i18n.language) || member.qualification;
            return (
              <div key={member.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition text-center space-y-3">
                <img
                  src={member.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'}
                  alt={member.full_name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-amber-400 shadow-md"
                />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{member.full_name}</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{designation}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{qualification}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-blue-500" /> {member.department}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

