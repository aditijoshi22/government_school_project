import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { SECTIONS_CONFIG, getSectionName, getSectionSchoolName } from '@shared/sections.config';
import schoolConfig from '@shared/school.config';
import { Search, Printer, ShieldCheck, AlertCircle, Sparkles, Award } from 'lucide-react';
import { formatLocalizedNumber } from '../utils/bilingual';

export default function Results() {
  const { t, i18n } = useTranslation(['results', 'common']);
  const [searchParams, setSearchParams] = useState({
    section_id: 'primary',
    class_number: '8',
    roll_number: '12',
    dob: '2012-08-20'
  });

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setResultData(null);

    try {
      const res = await axios.post('/api/public/results/lookup', searchParams);
      if (res.data.success) {
        setResultData(res.data);
      } else {
        setErrorMsg(res.data.message || t('results.noResultsFound'));
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || t('results.noResultsFound'));
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentSection = SECTIONS_CONFIG.find(s => s.id === searchParams.section_id);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={t('results.pageTitle')}
        subtitle={t('results.pageSubtitle')}
        badgeText={t('results.badge')}
      />

      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Search Box Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('results.deskTitle')}</h3>
              <p className="text-xs text-slate-500">{t('results.deskDesc')}</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('results.selectSection')}</label>
              <select
                value={searchParams.section_id}
                onChange={(e) => {
                  const sec = SECTIONS_CONFIG.find(s => s.id === e.target.value);
                  setSearchParams({
                    ...searchParams,
                    section_id: e.target.value,
                    class_number: String(sec.classes[0])
                  });
                }}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                {SECTIONS_CONFIG.map(s => (
                  <option key={s.id} value={s.id}>{getSectionName(s, i18n.language)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('results.selectClass')}</label>
              <select
                value={searchParams.class_number}
                onChange={(e) => setSearchParams({ ...searchParams, class_number: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                {currentSection.classes.map(c => (
                  <option key={c} value={c}>{t('common.class', 'Class')} {formatLocalizedNumber(c, i18n.language)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('results.rollNumber')}</label>
              <input
                type="number"
                required
                placeholder={t('results.rollNumberPlaceholder')}
                value={searchParams.roll_number}
                onChange={(e) => setSearchParams({ ...searchParams, roll_number: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('results.dob')}</label>
              <input
                type="date"
                required
                value={searchParams.dob}
                onChange={(e) => setSearchParams({ ...searchParams, dob: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? t('results.searchingBtn') : t('results.searchBtn')}</span>
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="mt-4 p-4 bg-rose-50 text-rose-800 border border-rose-300 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Printable Result Card */}
        {resultData && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-end">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-900 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-2 shadow hover:bg-slate-800 transition"
              >
                <Printer className="w-4 h-4" />
                <span>{t('results.printMarksheet')}</span>
              </button>
            </div>

            <div id="printable-area" className="bg-white text-slate-900 border-4 border-slate-900 rounded-3xl p-8 shadow-2xl space-y-6">
              
              {/* Marksheet Header */}
              <div className="border-b-2 border-slate-900 pb-6 text-center space-y-2">
                <img
                  src={schoolConfig.logoUrl}
                  alt="School Logo"
                  className="w-16 h-16 rounded-full mx-auto object-cover border border-slate-900 shadow-sm"
                />
                <div className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {i18n.language === 'mr' ? 'महाराष्ट्र शासन • जिल्हा परिषद शिक्षण विभाग' : i18n.language === 'hi' ? 'महाराष्ट्र शासन • जिला परिषद शिक्षा विभाग' : 'GOVERNMENT OF MAHARASHTRA • ZILLA PARISHAD EDUCATION BOARD'}
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold uppercase">
                  {getSectionSchoolName(resultData.section, i18n.language) || schoolConfig.name}
                </h2>
                <p className="text-xs text-slate-600">
                  {schoolConfig.contact.address} • {t('common.udisePrefix')}: {resultData.section?.udiseCode}
                </p>
                <div className="pt-2">
                  <span className="inline-block bg-slate-900 text-amber-400 font-bold text-xs px-4 py-1 rounded-full uppercase">
                    {resultData.type === 'grade-based' ? t('results.primaryProgressTitle') : t('results.pageTitle')}
                  </span>
                </div>
              </div>

              {/* Student Metadata Table */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="text-slate-500">{t('results.studentName')}:</span> <strong className="block text-sm">{resultData.student.first_name} {resultData.student.last_name}</strong></div>
                <div><span className="text-slate-500">{t('results.grNumber')}:</span> <strong className="block text-sm font-mono">{resultData.student.gr_number}</strong></div>
                <div><span className="text-slate-500">{t('results.selectClass')} & {t('results.selectSection')}:</span> <strong className="block text-sm">{t('results.selectClass')} {formatLocalizedNumber(resultData.student.class_number, i18n.language)} ({getSectionName(resultData.section, i18n.language)})</strong></div>
                <div><span className="text-slate-500">{t('results.rollNumber')}:</span> <strong className="block text-sm">{formatLocalizedNumber(resultData.student.roll_number, i18n.language)}</strong></div>
              </div>

              {/* Grade-based Progress Report (Primary) */}
              {resultData.type === 'grade-based' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-300">
                      <thead className="bg-slate-100 font-bold border-b border-slate-300">
                        <tr>
                          <th className="p-3">{i18n.language === 'mr' ? 'कौशल्य व विकास क्षेत्र' : i18n.language === 'hi' ? 'कौशल एवं विकास क्षेत्र' : 'Skill & Development Domain'}</th>
                          <th className="p-3">{t('results.gradeHeader')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr><td className="p-3 font-semibold">{t('results.readingGrade')}</td><td className="p-3 font-bold text-amber-600">{resultData.report.reading_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">{t('results.writingGrade')}</td><td className="p-3 font-bold text-amber-600">{resultData.report.writing_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">{t('results.numeracyGrade')}</td><td className="p-3 font-bold text-amber-600">{resultData.report.numeracy_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">{t('results.artGrade')}</td><td className="p-3 font-bold text-amber-600">{resultData.report.art_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">{t('results.sportsGrade')}</td><td className="p-3 font-bold text-amber-600">{resultData.report.sports_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">{t('results.disciplineGrade')}</td><td className="p-3 font-bold text-amber-600">{resultData.report.discipline_grade}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs">
                    <strong className="text-amber-900 block mb-1">{t('results.teacherOverallRemarks')}:</strong>
                    <p className="italic text-slate-700">{resultData.report.teacher_remarks}</p>
                  </div>
                </div>
              )}

              {/* Marks Table (Primary & High School) */}
              {resultData.type === 'marks' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-300">
                      <thead className="bg-slate-100 font-bold border-b border-slate-300">
                        <tr>
                          <th className="p-3">{t('results.subjectHeader')}</th>
                          <th className="p-3">{t('results.marksHeader')}</th>
                          <th className="p-3">{t('results.maxMarksHeader')}</th>
                          <th className="p-3">{t('results.gradeHeader')}</th>
                          <th className="p-3">{t('results.remarksHeader')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium">
                        {resultData.marks.map(m => (
                          <tr key={m.id}>
                            <td className="p-3 font-bold">{m.subject_name}</td>
                            <td className="p-3 font-mono font-bold text-sm text-emerald-700">{formatLocalizedNumber(m.marks_obtained, i18n.language)}</td>
                            <td className="p-3 font-mono">{formatLocalizedNumber(m.max_marks, i18n.language)}</td>
                            <td className="p-3 font-bold">{m.grade}</td>
                            <td className="p-3 text-slate-500">{m.remarks || (i18n.language === 'mr' ? 'उत्तम' : i18n.language === 'hi' ? 'उत्तम' : 'Good')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-2xl text-xs font-bold">
                    <div>{t('results.resultStatus')}: <span className="text-emerald-400 text-sm ml-2">{resultData.summary.resultStatus === 'PASSED' ? t('results.passed') : resultData.summary.resultStatus}</span></div>
                    <div>{t('results.percentage')}: <span className="text-amber-400 text-base ml-2">{resultData.summary.percentage}%</span></div>
                  </div>
                </div>
              )}

              {/* Signatures */}
              <div className="pt-12 flex justify-between items-end text-xs text-slate-600">
                <div className="text-center space-y-8">
                  <div className="border-t border-slate-400 w-40">{i18n.language === 'mr' ? 'वर्ग शिक्षक स्वाक्षरी' : i18n.language === 'hi' ? 'वर्ग शिक्षक हस्ताक्षर' : 'Class Teacher Signature'}</div>
                </div>
                <div className="text-center space-y-8">
                  <div className="border-t border-slate-400 w-40">{i18n.language === 'mr' ? 'मुख्याध्यापक / प्राचार्य शिक्का व सही' : i18n.language === 'hi' ? 'मुख्याध्यापक / प्राचार्य मोहर व हस्ताक्षर' : 'Principal / Headmaster Stamp'}</div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

