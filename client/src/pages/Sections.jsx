import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { SECTIONS_CONFIG, getSectionById } from '@shared/sections.config';
import { Sparkles, BookOpen, GraduationCap, Download, Calendar, CheckCircle, FileText, Award, Layers } from 'lucide-react';

export default function Sections() {
  const { sectionId } = useParams();
  const activeSectionId = sectionId || 'pre-primary';
  const section = getSectionById(activeSectionId) || SECTIONS_CONFIG[0];

  const [academicsData, setAcademicsData] = useState(null);

  const getSectionIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={section.schoolName}
        subtitle={section.description}
        themeColor={section.themeColor}
        badgeText={`${section.schoolLevel} • ${section.classList[0]} to ${section.classList[section.classList.length - 1]}`}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Section Selection Quick Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {SECTIONS_CONFIG.map(sec => (
            <Link
              key={sec.id}
              to={`/sections/${sec.id}`}
              className={`px-5 py-3 rounded-2xl font-bold text-xs md:text-sm border transition flex items-center gap-2 ${
                sec.id === activeSectionId
                  ? 'text-white shadow-lg'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
              style={{
                backgroundColor: sec.id === activeSectionId ? sec.themeColor : undefined,
                borderColor: sec.id === activeSectionId ? sec.themeColor : undefined
              }}
            >
              {getSectionIcon(sec.iconName)}
              <span>{sec.schoolShortName}</span>
            </Link>
          ))}
        </div>

        {/* School Info Summary */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm" style={{ borderTop: `4px solid ${section.themeColor}` }}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">School Information</div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white" style={{ color: section.themeColor }}>{section.schoolName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><div className="text-slate-500">UDISE Code</div><div className="font-bold font-mono text-slate-900 dark:text-white">{section.udiseCode}</div></div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><div className="text-slate-500">Level</div><div className="font-bold text-slate-900 dark:text-white">{section.schoolLevel}</div></div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><div className="text-slate-500">Classes</div><div className="font-bold text-slate-900 dark:text-white">{section.classList[0]} to {section.classList[section.classList.length - 1]}</div></div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><div className="text-slate-500">{section.sectionHeadRole}</div><div className="font-bold text-slate-900 dark:text-white">{section.sectionHead}</div></div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><div className="text-slate-500">Assessment</div><div className="font-bold text-slate-900 dark:text-white capitalize">{section.assessmentType.replace(/-/g, ' ')}</div></div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            {section.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section Key Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview & Classes */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2" style={{ color: section.themeColor }}>
                <Layers className="w-5 h-5" />
                <span>Class Structure & Assessment Mode</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {section.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {section.classList.map((cls, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                    <div className="font-extrabold text-slate-900 dark:text-white text-sm">{cls}</div>
                    <div className="text-[10px] text-slate-500">Divisions A & B</div>
                  </div>
                ))}
              </div>
            </div>

            {/* High School Stream Specialization (Class 11-12) */}
            {section.streams && (
              <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>Class 11 & 12 Academic Streams & Combinations</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.streams.map(st => (
                    <div key={st.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-blue-200 dark:border-slate-800 shadow-sm space-y-2">
                      <div className="font-bold text-sm text-blue-700 dark:text-blue-400">{st.nameEn}</div>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        {st.subjects.map((sub, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Section Scholarship & Board Highlights */}
            {section.scholarshipClasses && (
              <div className="bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span>Class 5 & 8 Scholarship Exam & Class 10 SSC Desk</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Special scholarship coaching modules are integrated into daily schedules for Class 5 and Class 8. Class 9 and 10 students receive pre-board examination practice, previous year question banks, and hall ticket desk support.
                </p>
              </div>
            )}

            {/* Pre-Primary Descriptive Grade System */}
            {section.skills && (
              <div className="bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span>Foundational Skill-Based Progress System</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {section.skills.map((sk, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-2xl text-xs font-semibold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-slate-800 text-center">
                      {sk}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subjects Offered */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Curriculum & Subjects</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.subjects.map(sub => (
                  <div key={sub.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">{sub.nameEn}</span>
                    <span className="font-mono bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">{sub.code}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Section Head Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-center space-y-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt={section.sectionHead}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-amber-400"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{section.sectionHead}</h4>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{section.sectionHeadRole}</p>
              </div>
              <p className="text-xs text-slate-500">
                Directly responsible for academic scheduling, teacher allocation, and parent queries for {section.schoolName}.
              </p>
            </div>

            {/* Syllabus Download Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-lg border border-slate-800">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Download Syllabus & Timetable</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Get official PDF curriculum handbook and daily timetables for {section.schoolName}.
              </p>
              <Link
                to="/downloads"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Browse Download Section</span>
                <Download className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
