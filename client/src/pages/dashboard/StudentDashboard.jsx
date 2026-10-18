import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import StatCard from '../../components/ui/StatCard';
import { User, BookOpen, Calendar, Bell, Download, CheckSquare, AlertCircle, Award } from 'lucide-react';
import { getSectionName } from '@shared/sections.config';
import { formatLocalizedNumber, formatLocalizedDate, getLocalizedText } from '../../utils/bilingual';

import DashboardLoadingSkeleton from '../../components/common/DashboardLoadingSkeleton';

export default function StudentDashboard({ user }) {
  const { t, i18n } = useTranslation(['dashboard', 'common', 'results']);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'marks' | 'attendance' | 'timetable' | 'homework' | 'notices' | 'downloads'

  useEffect(() => {
    fetchStudentData();
  }, [i18n.language]);

  const fetchStudentData = () => {
    setLoading(true);
    axios.get(`/api/student/dashboard?lang=${i18n.language}`)
      .then(res => {
        if (res.data.success) {
          setData(res.data.data);
          setError(null);
        }
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load student dashboard data.');
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <DashboardLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-3xl text-rose-800 dark:text-rose-200 text-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
        <button
          onClick={fetchStudentData}
          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition"
        >
          {t('common.retry', 'Retry')}
        </button>
      </div>
    );
  }

  const student = data?.student;
  const section = data?.section;
  const marks = data?.marks || [];
  const progressReport = data?.progressReport;
  const attendance = data?.attendance || [];
  const attendancePercentage = data?.attendancePercentage || '100';
  const timetable = data?.timetable || [];
  const homework = data?.homework || [];
  const notices = data?.notices || [];
  const downloads = data?.downloads || [];

  const totalMarksObtained = marks.reduce((acc, curr) => acc + curr.marks_obtained, 0);
  const totalMaxMarks = marks.reduce((acc, curr) => acc + curr.max_marks, 0);
  const percentage = totalMaxMarks > 0 ? ((totalMarksObtained / totalMaxMarks) * 100).toFixed(2) : 'N/A';

  return (
    <div className="space-y-8 pb-16">

      {/* Student Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <img
            src={student?.photo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200'}
            alt={`${student?.first_name} ${student?.last_name}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-full uppercase">
                {t('dashboard.studentDashboard')}
              </span>
              <span className="text-xs text-amber-300">• {t('dashboard.grNo')}: {student?.gr_number}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              {student?.first_name} {student?.last_name}
            </h1>
            <p className="text-xs text-slate-300">
              Class {student?.class_number} ({student?.division_name}) • {getSectionName(section, i18n.language)}
            </p>
          </div>
        </div>

        <div className="bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700 text-right">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t('dashboard.attendanceRate')}</div>
          <div className="text-2xl font-extrabold text-emerald-400">{attendancePercentage}%</div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('dashboard.classDivision')} value={`Class ${student?.class_number} (#${student?.roll_number})`} icon={User} color="blue" subtitle={`Div ${student?.division_name}`} />
        <StatCard title={t('dashboard.academicStatus')} value={percentage !== 'N/A' ? `${percentage}%` : 'Grade A'} icon={Award} color="emerald" subtitle={percentage >= 35 ? t('results.passed') : 'Active Term'} />
        <StatCard title={t('dashboard.homework')} value={homework.length} icon={CheckSquare} color="amber" subtitle="Assignments" />
        <StatCard title={t('dashboard.tabNotices')} value={notices.length} icon={Bell} color="rose" subtitle={t('dashboard.latestNoticeBadge')} />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'profile'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
        >
          <User className="w-4 h-4" />
          <span>{t('dashboard.myProfile')}</span>
        </button>

        <button
          onClick={() => setActiveTab('marks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'marks'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t('dashboard.myResults')}</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'attendance'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t('dashboard.myAttendance')}</span>
        </button>

        <button
          onClick={() => setActiveTab('timetable')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'timetable'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t('dashboard.timetable')}</span>
        </button>

        <button
          onClick={() => setActiveTab('homework')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'homework'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>{t('dashboard.homework')} ({homework.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'notices'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
        >
          <Bell className="w-4 h-4" />
          <span>{t('dashboard.tabNotices')}</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'downloads'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
        >
          <Download className="w-4 h-4" />
          <span>{t('common.download')}</span>
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            {t('dashboard.myProfile')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('dashboard.grNo')}:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{student?.gr_number}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('dashboard.rollNo')}:</span>
                <span className="font-bold text-slate-900 dark:text-white">{student?.roll_number}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('dashboard.classDivision')}:</span>
                <span className="font-bold text-slate-900 dark:text-white">Class {student?.class_number} ({student?.division_name})</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('dashboard.section')}:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{getSectionName(section, i18n.language)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('dashboard.classStream')}:</span>
                <span className="capitalize font-bold text-slate-900 dark:text-white">{student?.stream || 'General'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('dashboard.dob')}:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.dob}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('results.fatherName')}:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.father_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('results.motherName')}:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.mother_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('dashboard.phone')}:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t('common.address')}:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Marks & Results */}
      {activeTab === 'marks' && (
        <div className="space-y-6">
          {progressReport && (
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200">
                {t('results.primaryProgressTitle')} ({progressReport.academic_year})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">{t('results.readingGrade')}</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.reading_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">{t('results.writingGrade')}</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.writing_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">{t('results.numeracyGrade')}</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.numeracy_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">{t('results.artGrade')}</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.art_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">{t('results.sportsGrade')}</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.sports_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">{t('dashboard.overallGrade')}</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{progressReport.overall_grade}</div>
                </div>
              </div>
              {progressReport.teacher_remarks && (
                <div className="text-xs bg-white dark:bg-slate-900 p-3 rounded-2xl border text-slate-700 dark:text-slate-300 italic">
                  "{t('results.teacherOverallRemarks')}: {progressReport.teacher_remarks}"
                </div>
              )}
            </div>
          )}

          {marks.length > 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('results.pageTitle')}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="p-3">{t('results.subjectHeader')}</th>
                      <th className="p-3">{t('results.marksHeader')}</th>
                      <th className="p-3">{t('results.maxMarksHeader')}</th>
                      <th className="p-3">{t('results.gradeHeader')}</th>
                      <th className="p-3">{t('results.remarksHeader')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    {marks.map(m => (
                      <tr key={m.id}>
                        <td className="p-3 font-semibold">{m.subject_name}</td>
                        <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{formatLocalizedNumber(m.marks_obtained, i18n.language)}</td>
                        <td className="p-3">{formatLocalizedNumber(m.max_marks, i18n.language)}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold rounded">
                            {m.grade}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{m.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            !progressReport && (
              <div className="bg-white dark:bg-slate-900 border p-12 text-center text-slate-400 rounded-3xl">
                {t('results.noResultsFound')}
              </div>
            )
          )}
        </div>
      )}

      {/* Tab 3: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.myAttendance')}</h3>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
              {t('dashboard.attendanceRate')}: {attendancePercentage}%
            </span>
          </div>

          {attendance.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {attendance.map(a => (
                <div key={a.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 dark:text-white">{formatLocalizedDate(a.date, i18n.language)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${a.status === 'present' ? 'bg-emerald-100 text-emerald-800' : a.status === 'late' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">{t('common.noRecordsFound')}</div>
          )}
        </div>
      )}

      {/* Tab 4: Timetable */}
      {activeTab === 'timetable' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.timetable')}</h3>
          {timetable.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
                  <tr>
                    <th className="p-3">{t('dashboard.day', 'Day')}</th>
                    <th className="p-3">{t('dashboard.period')}</th>
                    <th className="p-3">{t('dashboard.time')}</th>
                    <th className="p-3">{t('dashboard.subject')}</th>
                    <th className="p-3">{t('dashboard.teacher')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {timetable.map(row => {
                    const dayLabels = {
                      Monday: { mr: 'सोमवार', hi: 'सोमवार', en: 'Monday' },
                      Tuesday: { mr: 'मंगळवार', hi: 'मंगलवार', en: 'Tuesday' },
                      Wednesday: { mr: 'बुधवार', hi: 'बुधवार', en: 'Wednesday' },
                      Thursday: { mr: 'गुरुवार', hi: 'गुरुवार', en: 'गुरुवार' },
                      Friday: { mr: 'शुक्रवार', hi: 'शुक्रवार', en: 'शुक्रवार' },
                      Saturday: { mr: 'शनिवार', hi: 'शनिवार', en: 'शनिवार' }
                    };
                    const localizedDay = dayLabels[row.day_of_week]?.[currentLang] || row.day_of_week;
                    return (
                      <tr key={row.id}>
                        <td className="p-3 font-bold">{localizedDay}</td>
                        <td className="p-3">{row.period_number}</td>
                        <td className="p-3 text-slate-500">{row.time_slot}</td>
                        <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">{row.subject_name}</td>
                        <td className="p-3">{row.teacher_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">{t('common.noRecordsFound')}</div>
          )}
        </div>
      )}

      {/* Tab 5: Homework */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.homework')}</h3>
          {homework.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homework.map(hw => (
                <div key={hw.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-600 dark:text-amber-400">{hw.subject_name}</span>
                    <span className="text-rose-600 font-semibold">{t('dashboard.dueDate')}: {hw.due_date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{getLocalizedText(hw, 'title', i18n.language)}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{getLocalizedText(hw, 'description', i18n.language)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border p-12 text-center text-slate-400 rounded-3xl">{t('common.noRecordsFound')}</div>
          )}
        </div>
      )}

      {/* Tab 6: Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.tabNotices')}</h3>
          <div className="space-y-3">
            {notices.map(notice => (
              <div key={notice.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
                    {notice.category}
                  </span>
                  <span className="text-slate-400">{formatLocalizedDate(notice.created_at, i18n.language)}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{getLocalizedText(notice, 'title', i18n.language)}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{getLocalizedText(notice, 'content', i18n.language)}</p>
                {notice.attachment_url && (
                  <a href={notice.attachment_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-600 font-bold hover:underline pt-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('common.downloadPdf')}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Downloads */}
      {activeTab === 'downloads' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('common.download')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloads.map(dl => (
              <div key={dl.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{getLocalizedText(dl, 'title', i18n.language)}</h4>
                  <p className="text-[11px] text-slate-500">{dl.category} • {dl.file_size}</p>
                </div>
                <a href={dl.file_url} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-amber-100 text-slate-900 dark:text-white">
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
