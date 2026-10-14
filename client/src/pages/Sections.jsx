import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/common/PageHeader';
import { SECTIONS_CONFIG, getSectionById, getSectionSchoolName, getSectionDescription, getSectionClasses } from '@shared/sections.config';
import { Sparkles, BookOpen, GraduationCap, Download, CheckCircle, Award, Layers } from 'lucide-react';

export default function Sections() {
  const { t, i18n } = useTranslation();
  const { sectionId } = useParams();
  const activeSectionId = sectionId || 'primary';
  const section = getSectionById(activeSectionId) || SECTIONS_CONFIG[0];

  const currentLang = i18n.language?.startsWith('mr') ? 'mr' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const getSectionIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  const schoolName = getSectionSchoolName(section, currentLang);
  const description = getSectionDescription(section, currentLang);
  const classes = getSectionClasses(section, currentLang);
  const rangeLabel = classes.length > 0 ? `${classes[0]} - ${classes[classes.length - 1]}` : '';
  const levelName = typeof section.schoolLevel === 'object' ? (section.schoolLevel[currentLang] || section.schoolLevel.en) : section.schoolLevel;
  const roleName = typeof section.sectionHeadRole === 'object' ? (section.sectionHeadRole[currentLang] || section.sectionHeadRole.en) : section.sectionHeadRole;
  const featuresList = section.features?.[currentLang] || section.features?.en || (Array.isArray(section.features) ? section.features : []);

  const getAssessmentLabel = () => {
    if (section.assessmentType === 'grade-based') return t('sections.gradeBasedAssessment');
    if (section.assessmentType === 'marks-with-streams') return t('sections.marksWithStreamsAssessment');
    return t('sections.marksAssessment');
  };

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={schoolName}
        subtitle={description}
        themeColor={section.themeColor}
        badgeText={`${levelName} • ${rangeLabel}`}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Section Selection Quick Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {SECTIONS_CONFIG.map(sec => {
            const secName = typeof sec.schoolShortName === 'object' ? (sec.schoolShortName[currentLang] || sec.schoolShortName.en) : sec.schoolShortName;
            return (
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
                <span>{secName}</span>
              </Link>
            );
          })}
        </div>

        {/* School Info Summary */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm" style={{ borderTop: `4px solid ${section.themeColor}` }}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">{t('sections.badge', 'School Information')}</div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white" style={{ color: section.themeColor }}>{schoolName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl">
              <div className="text-slate-500">{t('sections.udiseCode', 'UDISE Code')}</div>
              <div className="font-bold font-mono text-slate-900 dark:text-white">{section.udiseCode}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl">
              <div className="text-slate-500">{t('sections.level', 'Level')}</div>
              <div className="font-bold text-slate-900 dark:text-white">{levelName}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl">
              <div className="text-slate-500">{t('sections.classes', 'Classes')}</div>
              <div className="font-bold text-slate-900 dark:text-white">{rangeLabel}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl">
              <div className="text-slate-500">{t('sections.sectionHead', 'Section Head')}</div>
              <div className="font-bold text-slate-900 dark:text-white">{section.sectionHead}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl">
              <div className="text-slate-500">{t('sections.assessment', 'Assessment')}</div>
              <div className="font-bold text-slate-900 dark:text-white capitalize">{section.assessmentType.replace(/-/g, ' ')}</div>
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            {featuresList.map((f, i) => (
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
                <span>{t('sections.overview', 'Class Structure & Assessment Mode')}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {classes.map((cls, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                    <div className="font-extrabold text-slate-900 dark:text-white text-sm">{cls}</div>
                    <div className="text-[10px] text-slate-500">{currentLang === 'mr' ? 'तुकडी अ व ब' : currentLang === 'hi' ? 'वर्ग अ एवं ब' : 'Divisions A & B'}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* High School Stream Specialization (Class 11-12) */}
            {section.streams && (
              <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>{t('sections.streams', 'Academic Streams & Specializations')}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.streams.map(st => {
                    const stName = currentLang === 'mr' ? (st.nameMr || st.nameEn) : currentLang === 'hi' ? (st.nameHi || st.nameEn) : st.nameEn;
                    return (
                      <div key={st.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-blue-200 dark:border-slate-800 shadow-sm space-y-2">
                        <div className="font-bold text-sm text-blue-700 dark:text-blue-400">{stName}</div>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          {st.subjects.map((sub, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Assessment Details Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>{t('sections.assessment', 'Assessment Pattern')}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {getAssessmentLabel()}
              </p>
            </div>

            {/* Subjects Offered */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>{t('sections.curriculum', 'Curriculum & Subjects')}</span>
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
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{roleName}</p>
              </div>
              <p className="text-xs text-slate-500">
                {currentLang === 'mr'
                  ? `${schoolName} च्या शैक्षणिक वेळापत्रक व नियोजनाची थेट जबाबदारी.`
                  : currentLang === 'hi'
                  ? `${schoolName} के शैक्षणिक संचालन एवं प्रबंधन का कार्यभार।`
                  : `Directly responsible for academic scheduling and student growth for ${schoolName}.`}
              </p>
            </div>

            {/* Apply & Download Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-lg border border-slate-800">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>{t('navbar.downloads', 'Downloads')} & {t('navbar.admissions', 'Admissions')}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentLang === 'mr'
                  ? `या विभागात प्रवेशासाठी ऑनलाइन अर्ज करा किंवा अभ्यासक्रम पुस्तिका डाउनलोड करा.`
                  : currentLang === 'hi'
                  ? `इस विभाग में प्रवेश हेतु ऑनलाइन आवेदन करें अथवा पाठ्यक्रम पुस्तिका डाउनलोड करें।`
                  : `Apply for online admission or download the official curriculum syllabus.`}
              </p>
              <div className="space-y-2">
                <Link
                  to="/admissions"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>{t('sections.applyForSection', 'Apply for Admission')}</span>
                </Link>
                <Link
                  to="/downloads"
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition border border-slate-700"
                >
                  <span>{t('navbar.downloads', 'Downloads')}</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
