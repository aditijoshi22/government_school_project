import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionTabs from '../../components/ui/SectionTabs';
import StatCard from '../../components/ui/StatCard';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/common/Modal';
import { SECTIONS_CONFIG, getSectionById } from '@shared/sections.config';
import { Users, GraduationCap, FileText, Bell, CheckCircle, XCircle, Plus, Send, BarChart2, Award, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard({ user }) {
  const isSuperAdmin = user?.role === 'super_admin';
  const defaultTab = isSuperAdmin ? 'overview' : (user?.section_id || 'pre-primary');

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Notice Publisher state
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', category: 'general', is_important: false });

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
      axios.get(`/api/admin/admissions?section_id=${secQuery}`)
    ]).then(([statsRes, studentsRes, admRes]) => {
      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (studentsRes.data.success) setStudents(studentsRes.data.data);
      if (admRes.data.success) setAdmissions(admRes.data.data);
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
    axios.post('/api/admin/notices', {
      ...noticeForm,
      section_id: activeTab === 'overview' ? 'all' : activeTab
    }).then(res => {
      if (res.data.success) {
        setNoticeModalOpen(false);
        setNoticeForm({ title: '', content: '', category: 'general', is_important: false });
        fetchDashboardData();
      }
    });
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
    { header: 'GR No', accessor: 'gr_number', render: (r) => <span className="font-mono font-bold">{r.gr_number}</span> },
    { header: 'Roll', accessor: 'roll_number' },
    { header: 'Student Name', render: (r) => <span className="font-semibold text-slate-900 dark:text-white">{r.first_name} {r.last_name}</span> },
    { header: 'Class', render: (r) => `Class ${r.class_number} (${r.division_name})` },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Parent Phone', accessor: 'phone' },
    {
      header: 'Action',
      render: (r) => (
        <button
          onClick={() => {
            setSelectedStudentForMarks(r);
            setMarksModalOpen(true);
          }}
          className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition"
        >
          {currentSection?.assessmentType === 'grade-based' ? 'Enter Report Card' : 'Enter Marks'}
        </button>
      )
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top-Level Section Switcher Tabs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Management Dashboard</h2>
            <p className="text-xs text-slate-500">Switch tabs to view and manage section-specific academic data.</p>
          </div>
          <button
            onClick={() => setNoticeModalOpen(true)}
            className="px-4 py-2 bg-slate-900 text-amber-400 hover:bg-slate-800 font-bold rounded-xl text-xs flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Notice</span>
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
            <span>Active Context: <strong>{currentSection.nameEn}</strong> (Assessment Mode: {currentSection.assessmentType})</span>
          </div>
          <span>Section Head: {currentSection.sectionHead}</span>
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={stats?.totalStudents || 0} icon={Users} color="blue" subtitle="Enrolled in active section" />
        <StatCard title="Section Faculty" value={stats?.totalTeachers || 0} icon={GraduationCap} color="emerald" subtitle="Assigned teachers" />
        <StatCard title="Pending Admissions" value={stats?.pendingAdmissions || 0} icon={FileText} color="amber" subtitle="Awaiting review" />
        <StatCard title="Active Notices" value={stats?.totalNotices || 0} icon={Bell} color="rose" subtitle="Published circulars" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Class Strength Bar Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Class-Wise Student Distribution</h3>
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
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Gender Ratio</h3>
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
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enrolled Students & Marksheet Entry</h3>
        <DataTable
          columns={studentColumns}
          data={students}
          searchPlaceholder="Search student by name or GR number..."
        />
      </div>

      {/* Pending Admissions Review Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pending Admission Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">App No</th>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">Parent & Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
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
                      {adm.status}
                    </span>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => handleAdmissionStatus(adm.id, 'approved')}
                      className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                      title="Approve"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAdmissionStatus(adm.id, 'rejected')}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      title="Reject"
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

      {/* Publish Notice Modal */}
      <Modal isOpen={noticeModalOpen} onClose={() => setNoticeModalOpen(false)} title="Publish Official Circular">
        <form onSubmit={handleNoticeSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Notice Title *</label>
            <input
              type="text"
              required
              value={noticeForm.title}
              onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Notice Category</label>
            <select
              value={noticeForm.category}
              onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
            >
              <option value="general">General Announcement</option>
              <option value="exam">Examination / Schedule</option>
              <option value="meeting">Parent-Teacher Meeting</option>
              <option value="event">Sports & Cultural Event</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Notice Content *</label>
            <textarea
              rows="4"
              required
              value={noticeForm.content}
              onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
            ></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow">
            Publish Notice to Section
          </button>
        </form>
      </Modal>

      {/* Marks / Progress Report Entry Modal */}
      <Modal
        isOpen={marksModalOpen}
        onClose={() => setMarksModalOpen(false)}
        title={currentSection?.assessmentType === 'grade-based' ? `Pre-Primary Progress Report (${selectedStudentForMarks?.first_name})` : `Academic Marks Entry (${selectedStudentForMarks?.first_name})`}
      >
        <form onSubmit={handleSaveMarks} className="space-y-4 text-xs">
          {currentSection?.assessmentType === 'grade-based' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Reading Grade</label>
                  <input type="text" value={progressReportForm.reading_grade} onChange={e => setProgressReportForm({...progressReportForm, reading_grade: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Writing Grade</label>
                  <input type="text" value={progressReportForm.writing_grade} onChange={e => setProgressReportForm({...progressReportForm, writing_grade: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Numeracy Grade</label>
                  <input type="text" value={progressReportForm.numeracy_grade} onChange={e => setProgressReportForm({...progressReportForm, numeracy_grade: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Art & Craft Grade</label>
                  <input type="text" value={progressReportForm.art_grade} onChange={e => setProgressReportForm({...progressReportForm, art_grade: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Teacher Remarks</label>
                <textarea rows="3" value={progressReportForm.teacher_remarks} onChange={e => setProgressReportForm({...progressReportForm, teacher_remarks: e.target.value})} className="w-full p-2 border rounded-xl"></textarea>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Subject Name</label>
                <input type="text" value={marksForm.subject_name} onChange={e => setMarksForm({...marksForm, subject_name: e.target.value})} className="w-full p-2 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Marks Obtained</label>
                  <input type="number" value={marksForm.marks_obtained} onChange={e => setMarksForm({...marksForm, marks_obtained: parseFloat(e.target.value)})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Max Marks</label>
                  <input type="number" value={marksForm.max_marks} onChange={e => setMarksForm({...marksForm, max_marks: parseFloat(e.target.value)})} className="w-full p-2 border rounded-xl" />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow">
            Save Academic Record
          </button>
        </form>
      </Modal>

    </div>
  );
}
