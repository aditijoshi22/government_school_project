import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import SectionTabs from '../../components/ui/SectionTabs';
import StatCard from '../../components/ui/StatCard';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/common/Modal';
import { SECTIONS_CONFIG, getSectionById, getSectionName } from '@shared/sections.config';
import { Users, GraduationCap, FileText, Bell, CheckCircle, XCircle, Plus, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatLocalizedNumber, formatLocalizedDate } from '../../utils/bilingual';
import DashboardLoadingSkeleton from '../../components/common/DashboardLoadingSkeleton';

export default function AdminDashboard({ user }) {
  const { t, i18n } = useTranslation(['dashboard', 'common', 'sections']);
  const isSuperAdmin = user?.role === 'super_admin' || user?.role === 'admin';
  const defaultTab = isSuperAdmin ? 'overview' : (user?.section_id || 'primary');

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [noticesList, setNoticesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Notice Publisher state with Language Tabs
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [noticeLangTab, setNoticeLangTab] = useState('en'); // 'en' | 'mr' | 'hi'
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

  // Marks / Progress Report Entry Modal state
  const [marksModalOpen, setMarksModalOpen] = useState(false);
  const [selectedStudentForMarks, setSelectedStudentForMarks] = useState(null);
  const [marksForm, setMarksForm] = useState({ subject_id: 'sub-p-math', subject_name: 'Mathematics', marks_obtained: 85, max_marks: 100, remarks: 'Good' });
  const [progressReportForm, setProgressReportForm] = useState({
    reading_grade: 'A',
    writing_grade: 'A',
    numeracy_grade: 'B+',
    art_grade: 'A+',
    sports_grade: 'A',
    discipline_grade: 'A',
    overall_grade: 'Excellent',
    teacher_remarks: 'Creative and active learner.'
  });

  const currentSection = activeTab !== 'overview' ? getSectionById(activeTab) : null;

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = () => {
    setLoading(true);
    const secQuery = activeTab === 'overview' ? 'all' : activeTab;

    Promise.all([
      axios.get(`/api/admin/dashboard/stats?section_id=${secQuery}`),
      axios.get(`/api/admin/students?section_id=${secQuery}`),
      axios.get(`/api/admin/admissions?section_id=${secQuery}`),
      axios.get(`/api/admin/notices`)
    ]).then(([statsRes, studentsRes, admRes, noticesRes]) => {
      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (studentsRes.data.success) setStudents(studentsRes.data.data);
      if (admRes.data.success) setAdmissions(admRes.data.data);
      if (noticesRes.data.success) setNoticesList(noticesRes.data.data);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleAdmissionStatus = (id, newStatus) => {
    axios.put(`/api/admin/admissions/${id}/status`, { status: newStatus })
      .then(res => {
        if (res.data.success) fetchDashboardData();
      });
  };

  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...noticeForm,
      title: noticeForm.title_en || noticeForm.title_mr || noticeForm.title_hi,
      content: noticeForm.content_en || noticeForm.content_mr || noticeForm.content_hi,
      section_id: activeTab === 'overview' ? 'all' : activeTab
    };

    const req = editingNoticeId
      ? axios.put(`/api/admin/notices/${editingNoticeId}`, payload)
      : axios.post('/api/admin/notices', payload);

    req.then(res => {
      if (res.data.success) {
        setNoticeModalOpen(false);
        setEditingNoticeId(null);
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
        fetchDashboardData();
      }
    });
  };

  const handleEditNotice = (notice) => {
    setEditingNoticeId(notice.id);
    setNoticeForm({
      title_en: notice.title_en || notice.title || '',
      title_mr: notice.title_mr || '',
      title_hi: notice.title_hi || '',
      content_en: notice.content_en || notice.content || '',
      content_mr: notice.content_mr || '',
      content_hi: notice.content_hi || '',
      category: notice.category || 'general',
      is_important: notice.is_important === 1
    });
    setNoticeLangTab('en');
    setNoticeModalOpen(true);
  };

  const handleDeleteNotice = (id) => {
    if (window.confirm(i18n.language === 'mr' ? 'तुम्हाला ही सूचना हटवायची आहे का?' : i18n.language === 'hi' ? 'क्या आप इस सूचना को हटाना चाहते हैं?' : 'Are you sure you want to delete this notice?')) {
      axios.delete(`/api/admin/notices/${id}`).then(res => {
        if (res.data.success) fetchDashboardData();
      });
    }
  };

  const handleSaveMarks = (e) => {
    e.preventDefault();
    if (currentSection?.assessmentType === 'grade-based') {
      axios.post('/api/academics/progress-reports', {
        student_id: selectedStudentForMarks.id,
        ...progressReportForm
      }).then(res => {
        if (res.data.success) setMarksModalOpen(false);
      });
    } else {
      axios.post('/api/academics/marks', {
        student_id: selectedStudentForMarks.id,
        ...marksForm
      }).then(res => {
        if (res.data.success) setMarksModalOpen(false);
      });
    }
  };

  const COLORS = ['#10B981', '#2563EB', '#F59E0B', '#EF4444'];

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
            setSelectedStudentForMarks(r);
            setMarksModalOpen(true);
          }}
          className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition"
        >
          {currentSection?.assessmentType === 'grade-based' ? t('dashboard.primarySectionCount') : t('dashboard.enterMarks')}
        </button>
      )
    }
  ];

  if (loading && !stats) {
    return <DashboardLoadingSkeleton />;
  }

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top-Level Section Switcher Tabs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t('dashboard.managementTitle')}</h2>
            <p className="text-xs text-slate-500">{t('dashboard.publishNoticeDesc')}</p>
          </div>
          <button
            onClick={() => {
              setEditingNoticeId(null);
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
              setNoticeLangTab('en');
              setNoticeModalOpen(true);
            }}
            className="px-4 py-2 bg-slate-900 text-amber-400 hover:bg-slate-800 font-bold rounded-xl text-xs flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>{t('dashboard.publishNotice')}</span>
          </button>
        </div>

        <SectionTabs
          activeSection={activeTab}
          onSelectSection={setActiveTab}
          showOverview={isSuperAdmin}
        />
      </div>

      {/* Dynamic Theme Banner */}
      {currentSection && (
        <div className="p-4 rounded-2xl flex items-center justify-between text-xs font-semibold" style={{ backgroundColor: currentSection.themeBg, color: currentSection.themeColor }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{t('dashboard.activeContext')}: <strong>{getSectionName(currentSection, i18n.language)}</strong> ({currentSection.assessmentType})</span>
          </div>
          <span>{t('sections.sectionHead')}: {currentSection.sectionHead}</span>
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('dashboard.totalStudents')} value={stats?.totalStudents || 0} icon={Users} color="blue" subtitle={t('dashboard.studentRecords')} />
        <StatCard title={t('dashboard.manageFaculty')} value={stats?.totalTeachers || 0} icon={GraduationCap} color="emerald" subtitle={t('dashboard.manageFacultyDesc')} />
        <StatCard title={t('dashboard.pendingAdmissions')} value={stats?.pendingAdmissions || 0} icon={FileText} color="amber" subtitle={t('dashboard.newAdmissionDesc')} />
        <StatCard title={t('dashboard.tabNotices')} value={stats?.totalNotices || 0} icon={Bell} color="rose" subtitle={t('dashboard.manageNotices')} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Class Strength Bar Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">{t('dashboard.classWiseDistribution')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.classStrength || []}>
                <XAxis dataKey="class_number" tickFormatter={(v) => `Class ${v}`} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={currentSection?.themeColor || '#2563EB'} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Ratio Pie Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">{t('dashboard.gender')}</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats?.genderRatio || []} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={80} label>
                  {(stats?.genderRatio || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Student Records Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.assignedClassStudents')}</h3>
        <DataTable
          columns={studentColumns}
          data={students}
          searchPlaceholder={t('common.search')}
        />
      </div>

      {/* Pending Admissions Review Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.onlineAdmissionsManagement')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">{t('dashboard.appNo')}</th>
                <th className="p-3">{t('dashboard.applicant')}</th>
                <th className="p-3">{t('dashboard.appliedFor')}</th>
                <th className="p-3">{t('dashboard.parentName')} & {t('dashboard.phone')}</th>
                <th className="p-3">{t('common.status')}</th>
                <th className="p-3">{t('dashboard.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {admissions.map(adm => (
                <tr key={adm.id}>
                  <td className="p-3 font-mono font-bold">{adm.application_no}</td>
                  <td className="p-3 font-semibold">{adm.applicant_name}</td>
                  <td className="p-3">Class {adm.class_number}</td>
                  <td className="p-3">{adm.parent_name} ({adm.phone})</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      adm.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : adm.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {adm.status === 'approved' ? t('common.approved') : adm.status === 'rejected' ? t('common.rejected') : t('common.pending')}
                    </span>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => handleAdmissionStatus(adm.id, 'approved')}
                      className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                      title={t('common.approved')}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAdmissionStatus(adm.id, 'rejected')}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      title={t('common.rejected')}
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice Management Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.manageNotices')}</h3>
          <button
            onClick={() => {
              setEditingNoticeId(null);
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
              setNoticeLangTab('en');
              setNoticeModalOpen(true);
            }}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('dashboard.publishNotice')}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">{t('dashboard.noticeTitle')}</th>
                <th className="p-3">{t('dashboard.category')}</th>
                <th className="p-3">{t('dashboard.targetSection')}</th>
                <th className="p-3">{t('dashboard.date')}</th>
                <th className="p-3">{t('dashboard.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {noticesList.map(n => (
                <tr key={n.id}>
                  <td className="p-3 font-semibold">{n.title_en || n.title}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold rounded text-[10px] uppercase">
                      {n.category}
                    </span>
                  </td>
                  <td className="p-3 capitalize">{n.section_id || t('common.allSections')}</td>
                  <td className="p-3 text-slate-500">{formatLocalizedDate(n.created_at, i18n.language)}</td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => handleEditNotice(n)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title={t('common.edit')}
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      title={t('common.delete')}
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multilingual Notice Modal with Language Tabs (Requirement 5) */}
      <Modal isOpen={noticeModalOpen} onClose={() => setNoticeModalOpen(false)} title={editingNoticeId ? t('common.edit') : t('dashboard.publishNotice')}>
        <form onSubmit={handleNoticeSubmit} className="space-y-4">
          
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

          {/* English Inputs Tab */}
          {noticeLangTab === 'en' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">{t('dashboard.fieldTitleEn')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('dashboard.noticeTitlePlaceholderEn', 'e.g. Annual Sports Day & Cultural Meet 2026')}
                  value={noticeForm.title_en}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title_en: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">{t('dashboard.fieldDescEn')}</label>
                <textarea
                  rows="3"
                  required
                  placeholder={t('dashboard.noticeContentPlaceholderEn', 'Detailed circular content in English...')}
                  value={noticeForm.content_en}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content_en: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                ></textarea>
              </div>
            </div>
          )}

          {/* Marathi Inputs Tab */}
          {noticeLangTab === 'mr' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">{t('dashboard.fieldTitleMr')}</label>
                <input
                  type="text"
                  placeholder={t('dashboard.noticeTitlePlaceholderMr', 'उदा. वार्षिक क्रीडा स्पर्धा व स्नेहसंमेलन २०२६')}
                  value={noticeForm.title_mr}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title_mr: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">{t('dashboard.fieldDescMr')}</label>
                <textarea
                  rows="3"
                  placeholder={t('dashboard.noticeContentPlaceholderMr', 'मराठीत परिपत्रकाची सविस्तर माहिती...')}
                  value={noticeForm.content_mr}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content_mr: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                ></textarea>
              </div>
            </div>
          )}

          {/* Hindi Inputs Tab */}
          {noticeLangTab === 'hi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">{t('dashboard.fieldTitleHi')}</label>
                <input
                  type="text"
                  placeholder={t('dashboard.noticeTitlePlaceholderHi', 'उदा. वार्षिक खेलकूद एवं सांस्कृतिक महोत्सव 2026')}
                  value={noticeForm.title_hi}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title_hi: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">{t('dashboard.fieldDescHi')}</label>
                <textarea
                  rows="3"
                  placeholder={t('dashboard.noticeContentPlaceholderHi', 'हिंदी में परिपत्र का विस्तृत विवरण...')}
                  value={noticeForm.content_hi}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content_hi: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                ></textarea>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1">{t('dashboard.category')}</label>
            <select
              value={noticeForm.category}
              onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            >
              <option value="general">{t('dashboard.categoryGeneral', 'General Announcement')}</option>
              <option value="exam">{t('dashboard.categoryExam', 'Examination / Schedule')}</option>
              <option value="meeting">{t('dashboard.categoryMeeting', 'Parent-Teacher Meeting')}</option>
              <option value="event">{t('dashboard.categoryEvent', 'Sports & Cultural Event')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_important"
              checked={noticeForm.is_important}
              onChange={(e) => setNoticeForm({ ...noticeForm, is_important: e.target.checked })}
              className="rounded text-amber-500 focus:ring-amber-400"
            />
            <label htmlFor="is_important" className="text-xs font-medium cursor-pointer">
              {t('common.badgeImportant')}
            </label>
          </div>

          <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow hover:bg-amber-400 transition">
            {editingNoticeId ? t('common.save') : t('dashboard.publishNotice')}
          </button>
        </form>
      </Modal>

      {/* Marks / Progress Report Entry Modal */}
      <Modal
        isOpen={marksModalOpen}
        onClose={() => setMarksModalOpen(false)}
        title={currentSection?.assessmentType === 'grade-based' ? `${t('dashboard.primarySectionCount')} (${selectedStudentForMarks?.first_name})` : `${t('dashboard.marksEntryModalTitle')} (${selectedStudentForMarks?.first_name})`}
      >
        <form onSubmit={handleSaveMarks} className="space-y-4 text-xs">
          {currentSection?.assessmentType === 'grade-based' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{t('results.readingGrade', 'Reading Skill Grade')}</label>
                  <input type="text" value={progressReportForm.reading_grade} onChange={e => setProgressReportForm({...progressReportForm, reading_grade: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('results.writingGrade', 'Writing Skill Grade')}</label>
                  <input type="text" value={progressReportForm.writing_grade} onChange={e => setProgressReportForm({...progressReportForm, writing_grade: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('results.numeracyGrade', 'Numeracy Skill Grade')}</label>
                  <input type="text" value={progressReportForm.numeracy_grade} onChange={e => setProgressReportForm({...progressReportForm, numeracy_grade: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('results.artGrade', 'Art & Craft Grade')}</label>
                  <input type="text" value={progressReportForm.art_grade} onChange={e => setProgressReportForm({...progressReportForm, art_grade: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">{t('results.teacherOverallRemarks', "Teacher's Overall Remarks")}</label>
                <textarea rows="3" value={progressReportForm.teacher_remarks} onChange={e => setProgressReportForm({...progressReportForm, teacher_remarks: e.target.value})} className="w-full p-2 border rounded-xl"></textarea>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">{t('dashboard.subject')}</label>
                <input type="text" value={marksForm.subject_name} onChange={e => setMarksForm({...marksForm, subject_name: e.target.value})} className="w-full p-2 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{t('dashboard.marksObtained')}</label>
                  <input type="number" value={marksForm.marks_obtained} onChange={e => setMarksForm({...marksForm, marks_obtained: parseFloat(e.target.value)})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('dashboard.maxMarks')}</label>
                  <input type="number" value={marksForm.max_marks} onChange={e => setMarksForm({...marksForm, max_marks: parseFloat(e.target.value)})} className="w-full p-2 border rounded-xl" />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow hover:bg-amber-400 transition">
            {t('dashboard.saveMarks')}
          </button>
        </form>
      </Modal>

    </div>
  );
}

