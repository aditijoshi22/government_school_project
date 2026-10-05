import React from 'react';
import { Navigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import { LogOut, Shield } from 'lucide-react';

const getRoleType = (role) => {
  if (!role) return 'student';
  const r = role.toLowerCase();
  if (['super_admin', 'section_admin', 'admin'].includes(r)) return 'admin';
  if (r === 'teacher') return 'teacher';
  if (['student_parent', 'student'].includes(r)) return 'student';
  return 'student';
};

export default function DashboardLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roleType = getRoleType(user?.role);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Dashboard Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 py-3 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
                ZP
              </div>
              <span className="font-bold text-sm text-white hidden sm:inline">School Portal</span>
            </Link>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <Shield className="w-3.5 h-3.5" />
              <span className="capitalize">{roleType} Dashboard ({user?.role?.replace('_', ' ')})</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <span className="font-bold hidden md:inline">{user?.username}</span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white px-3 py-1.5 rounded-lg border border-rose-500/30 transition font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Workspace based on role */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to={`/dashboard/${roleType}`} replace />} />
          <Route
            path="admin"
            element={
              roleType === 'admin' ? (
                <AdminDashboard user={user} />
              ) : (
                <Navigate to={`/dashboard/${roleType}`} replace />
              )
            }
          />
          <Route
            path="teacher"
            element={
              roleType === 'teacher' ? (
                <TeacherDashboard user={user} />
              ) : (
                <Navigate to={`/dashboard/${roleType}`} replace />
              )
            }
          />
          <Route
            path="student"
            element={
              roleType === 'student' ? (
                <StudentDashboard user={user} />
              ) : (
                <Navigate to={`/dashboard/${roleType}`} replace />
              )
            }
          />
          <Route path="*" element={<Navigate to={`/dashboard/${roleType}`} replace />} />
        </Routes>
      </main>

    </div>
  );
}

