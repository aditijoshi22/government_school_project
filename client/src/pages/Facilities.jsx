import React from 'react';
import PageHeader from '../components/common/PageHeader';
import { Monitor, FlaskConical, BookOpen, Trophy, Utensils, Droplets, ShieldCheck, Sparkles } from 'lucide-react';

export default function Facilities() {
  const facilitiesList = [
    {
      title: "Computer & ICT Lab",
      desc: "30+ high-speed desktop computers with internet connectivity, programming tools, and digital literacy curriculum.",
      icon: Monitor,
      color: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900"
    },
    {
      title: "Science Practical Laboratories",
      desc: "Fully equipped Physics, Chemistry, and Biology laboratories for High School (Class 11-12) & Primary practicals.",
      icon: FlaskConical,
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900"
    },
    {
      title: "School Library & Reading Room",
      desc: "5,000+ books, reference encyclopedias, competitive exam guides (MHT-CET, NEET, JEE), and Marathi/English newspapers.",
      icon: BookOpen,
      color: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900"
    },
    {
      title: "Sports Playground & Physical Fitness",
      desc: "Spacious sports ground with Kabaddi court, Volleyball field, Athletics track, and indoor games equipment.",
      icon: Trophy,
      color: "bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900"
    },
    {
      title: "PM POSHAN Mid-Day Meal Hall",
      desc: "Clean kitchen and dining area providing hot, hygienic, and nutritious mid-day meals daily to Primary and Secondary students.",
      icon: Utensils,
      color: "bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900"
    },
    {
      title: "Clean Water & Sanitation",
      desc: "RO purified drinking water stations and clean, separate washrooms for boys, girls, and staff.",
      icon: Droplets,
      color: "bg-cyan-500/10 text-cyan-600 border-cyan-200 dark:border-cyan-900"
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Infrastructure & Facilities"
        titleMr="शासकीय सुविधा व पायाभूत सुविधा"
        subtitle="Modern learning infrastructure built to support comprehensive development."
        badgeText="Infrastructure"
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilitiesList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-4">
              <div className={`p-4 rounded-2xl border w-fit ${item.color}`}>
                <Icon className="w-8 h-8" />
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
