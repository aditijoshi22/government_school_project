import React from 'react';
import PageHeader from '../components/common/PageHeader';
import { ShieldCheck, Utensils, BookOpen, Award, CheckCircle } from 'lucide-react';

export default function GovernmentSchemes() {
  const schemes = [
    {
      title: "PM POSHAN Mid-Day Meal Scheme (माध्यान्ह भोजन योजना)",
      desc: "Free hot, nutritious cooked lunch provided daily to all students from Class 1 to Class 8 to improve nutrition and attendance.",
      icon: Utensils,
      tag: "Class 1 to 8"
    },
    {
      title: "Free Textbook & Uniform Scheme (मोफत पाठ्यपुस्तक व गणवेश)",
      desc: "State Government sponsored free NCERT/Balbharati textbooks and two pairs of school uniforms distributed annually to eligible categories.",
      icon: BookOpen,
      tag: "All Students"
    },
    {
      title: "Savitribai Phule Girl Child Scholarship (सावित्रीबाई फुले शिष्यवृत्ती)",
      desc: "Financial attendance incentive provided to girl students to prevent dropouts and encourage secondary education.",
      icon: Award,
      tag: "Girl Students"
    },
    {
      title: "Samagra Shiksha Abhiyan (समग्र शिक्षा अभियान)",
      desc: "Comprehensive central grant for digital classrooms, science laboratory kits, sports equipment, and inclusive special education.",
      icon: ShieldCheck,
      tag: "Infrastructure"
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Government Welfare Schemes"
        titleMr="शासकीय कल्याणकारी योजना"
        subtitle="Key welfare schemes implemented by the Maharashtra State Education Department."
        badgeText="Welfare Schemes"
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {schemes.map((scheme, idx) => {
          const Icon = scheme.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                  {scheme.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{scheme.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{scheme.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
