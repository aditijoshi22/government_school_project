import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { Monitor, FlaskConical, BookOpen, Trophy, Utensils, Droplets, Sparkles } from 'lucide-react';
import { getLocalizedText } from '../utils/bilingual';

export default function Facilities() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('mr') ? 'mr' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const [dbFacilities, setDbFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    Monitor: Monitor,
    FlaskConical: FlaskConical,
    BookOpen: BookOpen,
    Trophy: Trophy,
    Utensils: Utensils,
    Droplets: Droplets,
    Sparkles: Sparkles
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/public/facilities?lang=${currentLang}`)
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          setDbFacilities(res.data.data);
        }
      })
      .catch(err => {
        console.warn('Could not fetch facilities from database, using fallback locales', err);
      })
      .finally(() => setLoading(false));
  }, [currentLang]);

  const fallbackFacilities = [
    {
      title: t('facilities.computerLabTitle', 'Computer & ICT Lab'),
      desc: t('facilities.computerLabDesc', '30+ high-speed desktop computers with internet connectivity, programming tools, and digital literacy curriculum.'),
      iconName: 'Monitor',
      color: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900"
    },
    {
      title: t('facilities.scienceLabTitle', 'Science Practical Laboratories'),
      desc: t('facilities.scienceLabDesc', 'Fully equipped Physics, Chemistry, and Biology laboratories for High School & Secondary practicals.'),
      iconName: 'FlaskConical',
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900"
    },
    {
      title: t('facilities.libraryTitle', 'School Library & Reading Room'),
      desc: t('facilities.libraryDesc', '5,000+ books, reference encyclopedias, competitive exam guides (MHT-CET, NEET, JEE), and newspapers.'),
      iconName: 'BookOpen',
      color: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900"
    },
    {
      title: t('facilities.sportsTitle', 'Sports Playground & Physical Fitness'),
      desc: t('facilities.sportsDesc', 'Spacious sports ground with Kabaddi court, Volleyball field, Athletics track, and indoor games equipment.'),
      iconName: 'Trophy',
      color: "bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900"
    },
    {
      title: t('facilities.midDayMealTitle', 'PM POSHAN Mid-Day Meal Hall'),
      desc: t('facilities.midDayMealDesc', 'Clean kitchen and dining area providing hot, hygienic, and nutritious mid-day meals daily to students.'),
      iconName: 'Utensils',
      color: "bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900"
    },
    {
      title: t('facilities.waterTitle', 'Clean Drinking Water & Sanitation'),
      desc: t('facilities.waterDesc', 'RO purified drinking water stations and clean, separate washrooms for boys, girls, and staff.'),
      iconName: 'Droplets',
      color: "bg-cyan-500/10 text-cyan-600 border-cyan-200 dark:border-cyan-900"
    }
  ];

  const displayList = dbFacilities.length > 0 ? dbFacilities.map(f => ({
    title: getLocalizedText(f, 'title', currentLang),
    desc: getLocalizedText(f, 'description', currentLang),
    iconName: f.icon || 'Sparkles',
    color: f.color || 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900'
  })) : fallbackFacilities;

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={t('facilities.pageTitle', 'Infrastructure & Facilities')}
        subtitle={t('facilities.pageSubtitle', 'Modern learning infrastructure built to support comprehensive development.')}
        badgeText={t('facilities.badge', 'Infrastructure')}
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayList.map((item, idx) => {
          const IconComponent = iconMap[item.iconName] || Sparkles;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-4">
              <div className={`p-4 rounded-2xl border w-fit ${item.color}`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
