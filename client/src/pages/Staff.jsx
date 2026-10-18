import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import schoolConfig from '@shared/school.config';
import { SECTIONS_CONFIG, getSectionName } from '@shared/sections.config';
import { GraduationCap, ShieldCheck, Briefcase, Building2 } from 'lucide-react';
import { getLocalizedText } from '../utils/bilingual';

export default function Staff() {
  const { t, i18n } = useTranslation(['staff', 'common']);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('all');

  const currentLang = i18n.language?.startsWith('mr') ? 'mr' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const principalName = currentLang === 'mr' ? (schoolConfig.principal.nameMarathi || schoolConfig.principal.name)
    : currentLang === 'hi' ? (schoolConfig.principal.nameHindi || schoolConfig.principal.name)
    : schoolConfig.principal.name;

  const principalQual = currentLang === 'mr' ? (schoolConfig.principal.qualificationMarathi || schoolConfig.principal.qualification)
    : currentLang === 'hi' ? (schoolConfig.principal.qualificationHindi || schoolConfig.principal.qualification)
    : schoolConfig.principal.qualification;

  const principalDesig = currentLang === 'mr' ? (schoolConfig.principal.designationMarathi || schoolConfig.principal.designation)
    : currentLang === 'hi' ? (schoolConfig.principal.designationHindi || schoolConfig.principal.designation)
    : schoolConfig.principal.designation;

  const principalExp = currentLang === 'mr' ? (schoolConfig.principal.experienceMarathi || schoolConfig.principal.experience)
    : currentLang === 'hi' ? (schoolConfig.principal.experienceHindi || schoolConfig.principal.experience)
    : schoolConfig.principal.experience;

  const principalMsg = currentLang === 'mr' ? (schoolConfig.principal.messageMarathi || schoolConfig.principal.message)
    : currentLang === 'hi' ? (schoolConfig.principal.messageHindi || schoolConfig.principal.message)
    : schoolConfig.principal.message;

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
        
        {/* Head of Institution / Principal Spotlight Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="relative shrink-0 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-950">
                <img
                  src={schoolConfig.principal.photo}
                  alt={principalName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-1.5 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                    {principalDesig}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('staff.headOfInstitution', 'Head of the Institution')}
                </span>
                <span className="text-[11px] font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  {schoolConfig.shortName || schoolConfig.name}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{principalName}</h3>
                <p className="text-sm text-amber-400 font-semibold">{principalDesig} • {principalQual}</p>
                <p className="text-xs text-slate-300 mt-1">{principalExp}</p>
              </div>

              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed italic border-l-2 border-amber-400/70 pl-3 py-0.5">
                "{principalMsg}"
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  {t('staff.administrativeOffice', "Principal's Office")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  {t('staff.headOfInstitutionDesc', 'Supervising academic and administrative excellence across Primary, Secondary, and Junior College sections.')}
                </span>
              </div>
            </div>
          </div>
        </div>

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
            {t('staff.allStaffFilter', 'All Faculty & Staff')}
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

