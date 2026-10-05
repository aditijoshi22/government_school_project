import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from '../../components/ui/StatCard';
import { User, BookOpen, Calendar, Bell, Download, FileText, CheckCircle, Clock, AlertCircle, Award, CheckSquare } from 'lucide-react';

export default function StudentDashboard({ user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'marks' | 'attendance' | 'timetable' | 'homework' | 'notices' | 'downloads'

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = () => {
    setLoading(true);
    axios.get('/api/student/dashboard')
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
    return (
      <div className="py-20 text-center text-slate-500 animate-pulse">
        Loading Student Portal...
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
                Student Portal
              </span>
              <span className="text-xs text-amber-300">• GR No: {student?.gr_number}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              {student?.first_name} {student?.last_name}
            </h1>
            <p className="text-xs text-slate-300">
              Class {student?.class_number} ({student?.division_name}) • {section?.nameEn}
            </p>
          </div>
        </div>

        <div className="bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700 text-right">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Attendance Rate</div>
          <div className="text-2xl font-extrabold text-emerald-400">{attendancePercentage}%</div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Class & Roll No" value={`Class ${student?.class_number} (Roll #${student?.roll_number})`} icon={User} color="blue" subtitle={`Div ${student?.division_name}`} />
        <StatCard title="Academic Performance" value={percentage !== 'N/A' ? `${percentage}%` : 'Grade A'} icon={Award} color="emerald" subtitle={percentage >= 35 ? 'Passed' : 'Active Term'} />
        <StatCard title="Pending Homework" value={homework.length} icon={CheckSquare} color="amber" subtitle="Active assignments" />
        <StatCard title="School Notices" value={notices.length} icon={Bell} color="rose" subtitle="Latest updates" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <User className="w-4 h-4" />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('marks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'marks'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>My Results & Marks</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'attendance'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Attendance</span>
        </button>

        <button
          onClick={() => setActiveTab('timetable')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'timetable'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Timetable</span>
        </button>

        <button
          onClick={() => setActiveTab('homework')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'homework'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Homework ({homework.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'notices'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notices</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'downloads'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Downloads</span>
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Personal & Academic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">General Register (GR) Number:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{student?.gr_number}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Roll Number:</span>
                <span className="font-bold text-slate-900 dark:text-white">{student?.roll_number}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Class & Division:</span>
                <span className="font-bold text-slate-900 dark:text-white">Class {student?.class_number} ({student?.division_name})</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Academic Section:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{section?.nameEn}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Stream:</span>
                <span className="capitalize font-bold text-slate-900 dark:text-white">{student?.stream || 'General'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.dob}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Father's Name:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.father_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Mother's Name:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.mother_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{student?.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Residential Address:</span>
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
                Descriptive Progress Report Card ({progressReport.academic_year})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">Reading</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.reading_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">Writing</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.writing_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">Numeracy</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.numeracy_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">Art & Craft</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.art_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">Sports & PE</div>
                  <div className="font-bold text-slate-900 dark:text-white">{progressReport.sports_grade}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border">
                  <div className="text-slate-400">Overall Assessment</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{progressReport.overall_grade}</div>
                </div>
              </div>
              {progressReport.teacher_remarks && (
                <div className="text-xs bg-white dark:bg-slate-900 p-3 rounded-2xl border text-slate-700 dark:text-slate-300 italic">
                  "Teacher Remarks: {progressReport.teacher_remarks}"
                </div>
              )}
            </div>
          )}

          {marks.length > 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Official Statement of Marks
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Marks Obtained</th>
                      <th className="p-3">Max Marks</th>
                      <th className="p-3">Grade</th>
                      <th className="p-3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    {marks.map(m => (
                      <tr key={m.id}>
                        <td className="p-3 font-semibold">{m.subject_name}</td>
                        <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{m.marks_obtained}</td>
                        <td className="p-3">{m.max_marks}</td>
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
                No examination marks published yet for current semester.
              </div>
            )
          )}
        </div>
      )}

      {/* Tab 3: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Attendance History</h3>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
              Overall Rate: {attendancePercentage}%
            </span>
          </div>

          {attendance.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {attendance.map(a => (
                <div key={a.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 dark:text-white">{a.date}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    a.status === 'present' ? 'bg-emerald-100 text-emerald-800' : a.status === 'late' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">No attendance records found.</div>
          )}
        </div>
      )}

      {/* Tab 4: Timetable */}
      {activeTab === 'timetable' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Class Schedule & Timetable</h3>
          {timetable.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
                  <tr>
                    <th className="p-3">Day</th>
                    <th className="p-3">Period</th>
                    <th className="p-3">Time Slot</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Teacher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {timetable.map(t => (
                    <tr key={t.id}>
                      <td className="p-3 font-bold">{t.day_of_week}</td>
                      <td className="p-3">Period #{t.period_number}</td>
                      <td className="p-3 text-slate-500">{t.time_slot}</td>
                      <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">{t.subject_name}</td>
                      <td className="p-3">{t.teacher_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">No specific timetable uploaded for Class {student?.class_number}.</div>
          )}
        </div>
      )}

      {/* Tab 5: Homework */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Homework & Assignments</h3>
          {homework.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homework.map(hw => (
                <div key={hw.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-600 dark:text-amber-400">{hw.subject_name}</span>
                    <span className="text-rose-600 font-semibold">Due: {hw.due_date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{hw.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{hw.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border p-12 text-center text-slate-400 rounded-3xl">No pending homework.</div>
          )}
        </div>
      )}

      {/* Tab 6: Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">School Circulars & Announcements</h3>
          <div className="space-y-3">
            {notices.map(notice => (
              <div key={notice.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
                    {notice.category}
                  </span>
                  <span className="text-slate-400">{notice.created_at?.split('T')[0] || notice.created_at}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{notice.title_en || notice.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{notice.content_en || notice.content}</p>
                {notice.attachment_url && (
                  <a href={notice.attachment_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-600 font-bold hover:underline pt-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Attachment</span>
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
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Available Downloads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloads.map(dl => (
              <div key={dl.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{dl.title}</h4>
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
