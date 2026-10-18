import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/common/PageHeader';
import schoolConfig from '@shared/school.config';
import { Target, Compass, Users, Award } from 'lucide-react';

export default function About() {
  const { t, i18n } = useTranslation(['about', 'staff', 'common', 'results']);
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

  const smcMembers = [
    {
      desig: currentLang === 'mr' ? `${principalDesig} / सचिव` : currentLang === 'hi' ? `${principalDesig} / सचिव` : `${principalDesig} / Secretary`,
      name: principalName,
      role: currentLang === 'mr' ? `शाळा प्रमुख (${principalQual})` : currentLang === 'hi' ? `विद्यालय प्रमुख (${principalQual})` : `School Administrator (${principalQual})`
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

        {/* Principal's Desk & Leadership Profile */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Photo Column */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative group mb-4">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative w-52 h-64 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-slate-950">
                  <img
                    src={schoolConfig.principal.photo}
                    alt={principalName}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-3 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40 inline-block shadow">
                      {principalDesig}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="font-extrabold text-xl text-white tracking-wide">{principalName}</h3>
              <p className="text-sm text-amber-400 font-semibold mt-1">{principalQual}</p>
              <p className="text-xs text-slate-300 mt-1">{principalExp}</p>
            </div>

            {/* Message Column */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {t('about.leadershipBadge', 'Institutional Leadership')}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                  {schoolConfig.shortName || schoolConfig.name}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {t('about.principalDeskTitle', "Message from Principal's Desk")}
                </h2>
                <p className="text-xs sm:text-sm text-amber-400/90 mt-1 font-medium">
                  {t('about.principalDeskSubtitle', 'Guiding our students with vision, discipline, and values towards a brighter tomorrow')}
                </p>
              </div>

              <blockquote className="bg-slate-800/60 border-l-4 border-amber-400 p-5 rounded-r-2xl text-slate-200 text-sm leading-relaxed italic shadow-inner">
                "{principalMsg}"
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-800/40 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">{t('staff.designation', 'Designation')}</span>
                    <strong className="text-white font-semibold">{principalDesig} & SMC Secretary</strong>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">{t('staff.qualification', 'Educational Qualification')}</span>
                    <strong className="text-white font-semibold">{principalQual}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* School Management Committee (SMC) Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('about.smcTitle', 'School Management Committee (SMC) & Authorities')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('about.smcSubtitle', 'Government statutory governing body for school administration')}
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
