import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import StatCard from '../../components/ui/StatCard';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/common/Modal';
import { getSectionById, getSectionName } from '@shared/sections.config';
import { Users, GraduationCap, Bell, Plus, BookOpen, AlertCircle } from 'lucide-react';
import { formatLocalizedDate, getLocalizedText } from '../../utils/bilingual';

export default function TeacherDashboard({ user }) {
  const { t, i18n } = useTranslation(['dashboard', 'common']);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [noticeLangTab, setNoticeLangTab] = useState('en');
  const [noticeForm, setNoticeForm] = useState({
    title_en: '',
    title_mr: '',
    title_hi: '',
    content_en: '',
    content_mr: '',
    content_hi: '',
    category: 'general',
    is_important: false
  });

  const [marksModalOpen, setMarksModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marksForm, setMarksForm] = useState({ subject_id: '', subject_name: '', marks_obtained: 85, max_marks: 100, remarks: '' });
  const [progressReportForm, setProgressReportForm] = useState({
    reading_grade: 'A',
    writing_grade: 'A',
    numeracy_grade: 'B+',
    art_grade: 'A+',
    sports_grade: 'A',
    discipline_grade: 'A',
    overall_grade: 'Excellent',
    teacher_remarks: ''
  });

  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'notices'

  useEffect(() => {
    fetchTeacherData();
  }, [i18n.language]);

  const fetchTeacherData = () => {
    setLoading(true);
    axios.get(`/api/teacher/dashboard?lang=${i18n.language}`)
      .then(res => {
        if (res.data.success) {
          setData(res.data.data);
          setError(null);
        }
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load teacher dashboard data.');
      })
      .finally(() => setLoading(false));
  };

  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/admin/notices', {
      ...noticeForm,
      title: noticeForm.title_en || noticeForm.title_mr || noticeForm.title_hi,
      content: noticeForm.content_en || noticeForm.content_mr || noticeForm.content_hi,
      section_id: data?.teacher?.section_id
    }).then(res => {
      if (res.data.success) {
        setNoticeModalOpen(false);
        setNoticeForm({
          title_en: '',
          title_mr: '',
          title_hi: '',
          content_en: '',
          content_mr: '',
          content_hi: '',
          category: 'general',
          is_important: false
        });
        fetchTeacherData();
      }
    });
  };

  const handleSaveMarks = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    const currentSec = getSectionById(selectedStudent.section_id);

    if (currentSec?.assessmentType === 'grade-based') {
      axios.post('/api/academics/progress-reports', {
        student_id: selectedStudent.id,
        ...progressReportForm
      }).then(res => {
        if (res.data.success) {
          setMarksModalOpen(false);
          alert(i18n.language === 'mr' ? 'प्रगती पुस्तक यशस्वीपणे जतन केले!' : i18n.language === 'hi' ? 'प्रगति पत्र सफलतापूर्वक सुरक्षित किया गया!' : 'Progress Report Card saved successfully!');
        }
      }).catch(err => alert(err.response?.data?.message || 'Failed to save progress report.'));
    } else {
      axios.post('/api/academics/marks', {
        student_id: selectedStudent.id,
        ...marksForm
      }).then(res => {
        if (res.data.success) {
          setMarksModalOpen(false);
          alert(i18n.language === 'mr' ? 'गुण यशस्वीरित्या नोंदवले गेले!' : i18n.language === 'hi' ? 'अंक सफलतापूर्वक दर्ज किए गए!' : 'Academic marks recorded successfully!');
        }
      }).catch(err => alert(err.response?.data?.message || 'Failed to save marks.'));
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 animate-pulse">
        {t('common.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl text-rose-800 text-sm flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  const teacher = data?.teacher;
  const section = getSectionById(teacher?.section_id);
  const students = data?.students || [];
  const assignments = data?.assignments || [];
  const notices = data?.notices || [];

  const studentColumns = [
    { header: t('dashboard.grNo'), accessor: 'gr_number', render: (r) => <span className="font-mono font-bold">{r.gr_number}</span> },
    { header: t('dashboard.rollNo'), accessor: 'roll_number' },
    { header: t('dashboard.studentName'), render: (r) => <span className="font-semibold text-slate-900 dark:text-white">{r.first_name} {r.last_name}</span> },
    { header: t('dashboard.classDivision'), render: (r) => `Class ${r.class_number} (${r.division_name})` },
    { header: t('dashboard.gender'), accessor: 'gender' },
    { header: t('dashboard.parentContact'), accessor: 'phone' },
    {
      header: t('dashboard.actions'),
      render: (r) => (
        <button
          onClick={() => {
            setSelectedStudent(r);
            if (assignments.length > 0) {
              setMarksForm(prev => ({
                ...prev,
                subject_id: assignments[0].subject_id || 'sub-1-math',
                subject_name: assignments[0].subject_id === 'sub-p-math' ? 'Mathematics' : 'Subject Test'
              }));
            }
            setMarksModalOpen(true);
          }}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{section?.assessmentType === 'grade-based' ? t('dashboard.primarySectionCount') : t('dashboard.enterMarks')}</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Teacher Profile & Greeting Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <img
            src={teacher?.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'}
            alt={teacher?.full_name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                {t('dashboard.teacherDashboard')}
              </span>
              <span className="text-xs text-slate-400">• ID: {teacher?.employee_id}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">{teacher?.full_name}</h1>
            <p className="text-xs text-slate-300">
              {getLocalizedText(teacher, 'designation', i18n.language) || teacher?.designation} • {teacher?.department}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setNoticeModalOpen(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>{t('dashboard.publishNotice')}</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title={t('dashboard.section')} value={getSectionName(section, i18n.language) || 'Primary'} icon={GraduationCap} color="emerald" subtitle={section?.shortName} />
        <StatCard title={t('dashboard.totalStudents')} value={students.length} icon={Users} color="blue" subtitle={t('dashboard.studentRecords')} />
        <StatCard title={t('dashboard.subject')} value={assignments.length || 2} icon={BookOpen} color="amber" subtitle="Active teaching assignments" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'students'
              ? 'bg-slate-900 text-emerald-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('dashboard.assignedClassStudents')}</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'notices'
              ? 'bg-slate-900 text-emerald-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{t('dashboard.tabNotices')}</span>
        </button>
      </div>

      {/* Tab 1: Students Table */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t('dashboard.studentRecords')} ({getSectionName(section, i18n.language)})
            </h3>
          </div>

          <DataTable
            columns={studentColumns}
            data={students}
            searchPlaceholder={t('common.search')}
          />
        </div>
      )}

      {/* Tab 2: Section Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.manageNotices')}</h3>
            <button
              onClick={() => setNoticeModalOpen(true)}
              className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('dashboard.publishNotice')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map(notice => (
              <div key={notice.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase text-[10px]">
                    {notice.category}
                  </span>
                  <span className="text-slate-400">{formatLocalizedDate(notice.created_at, i18n.language)}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{getLocalizedText(notice, 'title', i18n.language)}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{getLocalizedText(notice, 'content', i18n.language)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publish Notice Modal */}
      <Modal isOpen={noticeModalOpen} onClose={() => setNoticeModalOpen(false)} title={t('dashboard.publishNotice')}>
        <form onSubmit={handleNoticeSubmit} className="space-y-4 text-xs">
          
          {/* Language Selection Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-700 gap-2 pb-2">
            <button
              type="button"
              onClick={() => setNoticeLangTab('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                noticeLangTab === 'en'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{t('dashboard.tabEnglish')}</span>
              <span className="text-[10px] text-amber-400 font-normal">({i18n.language === 'mr' ? 'आवश्यक' : 'Required'})</span>
            </button>

            <button
              type="button"
              onClick={() => setNoticeLangTab('mr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                noticeLangTab === 'mr'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{t('dashboard.tabMarathi')}</span>
              <span className="text-[10px] text-slate-400 font-normal">({i18n.language === 'mr' ? 'ऐच्छिक' : 'Optional'})</span>
            </button>

            <button
              type="button"
              onClick={() => setNoticeLangTab('hi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                noticeLangTab === 'hi'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{t('dashboard.tabHindi')}</span>
              <span className="text-[10px] text-slate-400 font-normal">({i18n.language === 'mr' ? 'ऐच्छिक' : 'Optional'})</span>
            </button>
          </div>

          {noticeLangTab === 'en' && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.fieldTitleEn')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('dashboard.noticeTitlePlaceholderEn', 'Notice title in English...')}
                  value={noticeForm.title_en}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title_en: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.fieldDescEn')}</label>
                <textarea
                  rows="3"
                  required
                  placeholder={t('dashboard.noticeContentPlaceholderEn', 'Detailed instructions in English...')}
                  value={noticeForm.content_en}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content_en: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                ></textarea>
              </div>
            </div>
          )}

          {noticeLangTab === 'mr' && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.fieldTitleMr')}</label>
                <input
                  type="text"
                  placeholder={t('dashboard.noticeTitlePlaceholderMr', 'मराठीत शीर्षक...')}
                  value={noticeForm.title_mr}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title_mr: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-devanagari"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.fieldDescMr')}</label>
                <textarea
                  rows="3"
                  placeholder={t('dashboard.noticeContentPlaceholderMr', 'मराठीत सविस्तर मजकूर...')}
                  value={noticeForm.content_mr}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content_mr: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-devanagari"
                ></textarea>
              </div>
            </div>
          )}

          {noticeLangTab === 'hi' && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.fieldTitleHi')}</label>
                <input
                  type="text"
                  placeholder={t('dashboard.noticeTitlePlaceholderHi', 'हिंदी में शीर्षक...')}
                  value={noticeForm.title_hi}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title_hi: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.fieldDescHi')}</label>
                <textarea
                  rows="3"
                  placeholder={t('dashboard.noticeContentPlaceholderHi', 'हिंदी में विस्तृत जानकारी...')}
                  value={noticeForm.content_hi}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content_hi: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                ></textarea>
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow">
            {t('dashboard.publishNotice')}
          </button>
        </form>
      </Modal>

      {/* Marks / Progress Report Entry Modal */}
      <Modal
        isOpen={marksModalOpen}
        onClose={() => setMarksModalOpen(false)}
        title={section?.assessmentType === 'grade-based' ? `${t('dashboard.primarySectionCount')}: ${selectedStudent?.first_name} ${selectedStudent?.last_name}` : `${t('dashboard.marksEntryModalTitle')}: ${selectedStudent?.first_name} ${selectedStudent?.last_name}`}
      >
        <form onSubmit={handleSaveMarks} className="space-y-4 text-xs">
          {section?.assessmentType === 'grade-based' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{t('results.readingGrade', 'Reading Skill Grade')}</label>
                  <input type="text" value={progressReportForm.reading_grade} onChange={e => setProgressReportForm({...progressReportForm, reading_grade: e.target.value})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('results.writingGrade', 'Writing Skill Grade')}</label>
                  <input type="text" value={progressReportForm.writing_grade} onChange={e => setProgressReportForm({...progressReportForm, writing_grade: e.target.value})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('results.numeracyGrade', 'Numeracy Skill Grade')}</label>
                  <input type="text" value={progressReportForm.numeracy_grade} onChange={e => setProgressReportForm({...progressReportForm, numeracy_grade: e.target.value})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('results.artGrade', 'Art & Craft Grade')}</label>
                  <input type="text" value={progressReportForm.art_grade} onChange={e => setProgressReportForm({...progressReportForm, art_grade: e.target.value})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">{t('results.teacherOverallRemarks', "Teacher's Overall Remarks")}</label>
                <textarea rows="3" value={progressReportForm.teacher_remarks} onChange={e => setProgressReportForm({...progressReportForm, teacher_remarks: e.target.value})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"></textarea>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.subject')}</label>
                <input type="text" required value={marksForm.subject_name} onChange={e => setMarksForm({...marksForm, subject_name: e.target.value})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" placeholder="e.g. Mathematics" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{t('dashboard.marksObtained')}</label>
                  <input type="number" required value={marksForm.marks_obtained} onChange={e => setMarksForm({...marksForm, marks_obtained: parseFloat(e.target.value)})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('dashboard.maxMarks')}</label>
                  <input type="number" required value={marksForm.max_marks} onChange={e => setMarksForm({...marksForm, max_marks: parseFloat(e.target.value)})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.gradeRemarks')}</label>
                <input type="text" value={marksForm.remarks} onChange={e => setMarksForm({...marksForm, remarks: e.target.value})} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" placeholder="Remarks..." />
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow">
            {t('dashboard.saveMarks')}
          </button>
        </form>
      </Modal>

    </div>
  );
}

