import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import schoolConfig from '@shared/school.config';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import { Sparkles, BookOpen, GraduationCap, Award, Calendar, ArrowRight, Bell, Users, CheckCircle, MapPin, ChevronRight, FileText } from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/public/home')
      .then(res => {
        if (res.data.success) {
          setHomeData(res.data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getSectionIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'BookOpen': return <BookOpen className="w-8 h-8" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8" />;
      default: return <BookOpen className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner Slider */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1600')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow">
              <Sparkles className="w-3.5 h-3.5" />
              Primary • Secondary • Junior College
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {schoolConfig.projectShortName}
            </h1>
            <p className="text-amber-300 text-lg md:text-xl font-medium">
              {schoolConfig.projectTagline}
            </p>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
              One portal for our three schools. Choose a school below to see its classes, curriculum, faculty head and more.
            </p>
            <div className="flex flex-col gap-2 max-w-2xl">
              {SECTIONS_CONFIG.map((sec) => (
                <Link
                  key={sec.id}
                  to={`/sections/${sec.id}`}
                  className="flex items-center justify-between gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: sec.themeColor }}></span>
                    {sec.schoolName}
                  </span>
                  <ChevronRight className="w-4 h-4 text-amber-300 shrink-0" />
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/admissions"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <span>Online Admission 2026-27</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/results"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl border border-slate-700 shadow transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Result & Progress Card Portal</span>
              </Link>
            </div>
          </div>

          {/* Quick Notice Ticker Card */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Bell className="w-5 h-5 animate-bounce" />
                <span>Latest Circulars & Notices</span>
              </div>
              <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">LIVE</span>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {homeData?.notices?.map((notice) => (
                <div key={notice.id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs space-y-1 hover:border-amber-400/50 transition">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="text-amber-400 font-semibold uppercase">{notice.category}</span>
                    <span>{notice.created_at?.split('T')[0] || notice.created_at}</span>
                  </div>
                  <h4 className="font-semibold text-white leading-snug">{notice.title}</h4>
                </div>
              ))}
            </div>

            <Link to="/notices" className="block text-center text-xs font-bold text-amber-300 hover:text-white pt-4 transition">
              View All Official Notices & Circulars →
            </Link>
          </div>
        </div>
      </section>

      {/* THREE Academic Section Cards (Main Requirement) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
            Our Schools
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Our Three Schools
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Click on a school to view its complete information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SECTIONS_CONFIG.map((sec) => (
            <div
              key={sec.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${sec.themeBadge}`}>
                    {getSectionIcon(sec.iconName)}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {sec.classList[0]} to {sec.classList[sec.classList.length - 1]}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1 transition" style={{ color: sec.themeColor }}>
                  <Link to={`/sections/${sec.id}`} className="hover:underline">{sec.schoolName}</Link>
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  {sec.schoolLevel}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {sec.description}
                </p>

                {/* Key Features List */}
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                  {sec.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
                  <span>Section Head:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{sec.sectionHead}</span>
                </div>
                <Link
                  to={`/sections/${sec.id}`}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${sec.themeButton}`}
                >
                  <span>View School Info</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-amber-400">{schoolConfig.stats.totalStudents}+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Enrolled Students</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-400">{schoolConfig.stats.totalTeachers}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Experienced Faculty</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-blue-400">{schoolConfig.stats.passPercentage}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">SSC/HSC Pass Percentage</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-rose-400">60+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Years Educational Legacy</div>
          </div>
        </div>
      </section>

      {/* Principal's Desk Message */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-slate-700">
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <img
              src={schoolConfig.principal.photo}
              alt={schoolConfig.principal.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-amber-400 shadow-xl mb-4"
            />
            <h3 className="font-bold text-lg text-white">{schoolConfig.principal.name}</h3>
            <p className="text-xs text-amber-400">{schoolConfig.principal.qualification}</p>
            <p className="text-[11px] text-slate-400 mt-1">{schoolConfig.principal.experience}</p>
          </div>
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
              Message from Principal's Desk
            </span>
            <h2 className="text-2xl font-bold leading-tight">
              "Nurturing Character, Empowering Knowledge, Shaping Future Leaders"
            </h2>
            <blockquote className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-amber-400 pl-4 py-1">
              "{schoolConfig.principal.message}"
            </blockquote>
            <Link to="/about" className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs hover:underline pt-2">
              <span>Read Full Message & History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events & Top Achievers Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Events */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span>Upcoming School Events</span>
            </h3>
            <Link to="/gallery" className="text-xs text-amber-600 font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {homeData?.events?.map(event => (
              <div key={event.id} className="flex gap-4 items-center bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="bg-amber-500 text-slate-950 px-3 py-2 rounded-xl text-center shrink-0 font-bold">
                  <div className="text-xs uppercase">{event.event_date?.split('-')[1] || 'OCT'}</div>
                  <div className="text-lg leading-none">{event.event_date?.split('-')[2] || '12'}</div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{event.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{event.description}</p>
                  <div className="flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Achievers */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              <span>Academic Merit Achievers</span>
            </h3>
          </div>
          <div className="space-y-4">
            {homeData?.topAchievers?.map((achiever, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <img src={achiever.photo} alt={achiever.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{achiever.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{achiever.class}</p>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{achiever.title}</p>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm px-3 py-1 rounded-xl">
                  {achiever.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
