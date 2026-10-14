import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/common/PageHeader';
import schoolConfig from '@shared/school.config';
import { Target, Compass, Users } from 'lucide-react';

export default function About() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('mr') ? 'mr' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const smcMembers = [
    {
      desig: currentLang === 'mr' ? 'मुख्याध्यापक / सचिव' : currentLang === 'hi' ? 'प्रधानाचार्य / सचिव' : 'Principal / Secretary',
      name: schoolConfig.principal.name,
      role: currentLang === 'mr' ? 'शाळा प्रमुख (M.Sc., M.Ed.)' : currentLang === 'hi' ? 'विद्यालय प्रमुख (M.Sc., M.Ed.)' : 'School Administrator (M.Sc., M.Ed.)'
    },
    {
      desig: currentLang === 'mr' ? 'शाळा व्यवस्थापन समिती अध्यक्ष' : currentLang === 'hi' ? 'प्रबंधन समिति अध्यक्ष' : 'SMC President',
      name: 'Shri. Rameshwar V. Gawande',
      role: currentLang === 'mr' ? 'पालक प्रतिनिधी व सामाजिक कार्यकर्ते' : currentLang === 'hi' ? 'अभिभावक प्रतिनिधि एवं सामाजिक कार्यकर्ता' : 'Parent Representative & Community Leader'
    },
    {
      desig: currentLang === 'mr' ? 'उपाध्यक्ष' : currentLang === 'hi' ? 'उपाध्यक्ष' : 'Vice President',
      name: 'Smt. Mandakini S. Tayade',
      role: currentLang === 'mr' ? 'ग्रामपंचायत महिला प्रतिनिधी' : currentLang === 'hi' ? 'ग्राम पंचायत महिला प्रतिनिधि' : 'Gram Panchayat Representative'
    },
    {
      desig: currentLang === 'mr' ? 'शिक्षक प्रतिनिधी' : currentLang === 'hi' ? 'शिक्षक प्रतिनिधि' : 'Teacher Representative',
      name: 'Shri. Gajanan V. Kulkarni',
      role: currentLang === 'mr' ? 'माध्यमिक विभाग प्रमुख (M.Sc., B.Ed.)' : currentLang === 'hi' ? 'माध्यमिक विभाग प्रमुख (M.Sc., B.Ed.)' : 'Secondary Section Head (M.Sc., B.Ed.)'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={t('about.pageTitle', 'About Our Institution')}
        subtitle={t('about.pageSubtitle', 'History, Vision, Leadership and the 3 Academic Schools')}
        badgeText={t('about.badge', 'Institutional Heritage')}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* History & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t('about.historyTitle', '60 Years of Educational Dedication')}
            </h2>
            <p>
              {t('about.historyP1', `Established in ${schoolConfig.establishedYear}, our institution stands as an educational beacon for students across Maharashtra.`)}
            </p>
            <p>
              {t('about.historyP2', 'Over six decades, the institution expanded into a full-fledged educational hub comprising Primary, Secondary, and Junior College.')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl">
                <div className="font-bold text-slate-900 dark:text-white text-base">{t('about.mediumTitle', 'Medium of Instruction')}</div>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{t('about.mediumDesc', schoolConfig.medium)}</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl">
                <div className="font-bold text-slate-900 dark:text-white text-base">{t('about.hostelTitle', 'Residential Facility')}</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{t('about.hostelDesc', 'Free boarding and lodging for tribal & rural students')}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800"
              alt={t('about.schoolBuildingAlt', 'School Building Campus')}
              className="rounded-3xl shadow-xl border-4 border-slate-200 dark:border-slate-800 object-cover w-full h-80"
            />
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-amber-500/10 border border-amber-300 dark:border-amber-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('about.visionTitle', 'Our Vision')}</h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {t('about.visionDesc', 'To provide affordable, accessible, and high-quality modern education to students from all economic backgrounds, enabling them to excel in national competitive examinations and become responsible citizens.')}
            </p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-300 dark:border-emerald-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('about.visionTitle', 'Our Mission')}</h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {t('about.missionDesc', 'To foster critical thinking, digital literacy, scientific aptitude, and moral values through activity-based learning in early years, rigorous state board coaching in primary years, and specialized stream guidance in higher secondary.')}
            </p>
          </div>
        </div>

        {/* School Management Committee (SMC) Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentLang === 'mr' ? 'शाळा व्यवस्थापन समिती (SMC) व पदाधिकारी' : currentLang === 'hi' ? 'विद्यालय प्रबंधन समिति (SMC) एवं पदाधिकारी' : 'School Management Committee (SMC) & Authorities'}
              </h3>
              <p className="text-xs text-slate-500">
                {currentLang === 'mr' ? 'शाळा प्रशासनासाठी शासकीय वैधानिक नियामक मंडळ' : currentLang === 'hi' ? 'विद्यालय प्रशासन हेतु वैधानिक निकाय' : 'Government statutory governing body for school administration'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                <tr>
                  <th className="p-3">{t('staff.designation', 'Designation')}</th>
                  <th className="p-3">{t('results.studentName', 'Name')}</th>
                  <th className="p-3">{t('staff.qualification', 'Role & Qualification')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {smcMembers.map((m, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold text-blue-600">{m.desig}</td>
                    <td className="p-3 font-bold">{m.name}</td>
                    <td className="p-3">{m.role}</td>
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
