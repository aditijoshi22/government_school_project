import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import schoolConfig from "@shared/school.config";
import { LogIn, Key, User, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(username, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res.message);
    }
  };

  const setQuickUser = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl max-w-md w-full space-y-6">

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 border-2 border-amber-400 mx-auto flex items-center justify-center font-extrabold text-xl shadow">
            ZP
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Portal Staff & Student Login</h2>
          <p className="text-xs text-slate-500">Access role-based management dashboards</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 text-rose-800 border border-rose-300 rounded-2xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Username or Email</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

        {/* Quick Demo Test Logins */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
          <p className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-wider">Quick Demo Credentials (One-Click)</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setQuickUser('admin', 'admin123')}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-left hover:bg-amber-100 dark:hover:bg-slate-700 transition"
            >
              <div className="font-bold text-slate-900 dark:text-white text-[11px]">Super Admin</div>
              <div className="text-[10px] text-slate-500">admin / admin123</div>
            </button>
            <button
              onClick={() => setQuickUser('admin_primary', 'admin123')}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-left hover:bg-emerald-100 dark:hover:bg-slate-700 transition"
            >
              <div className="font-bold text-emerald-700 dark:text-emerald-400 text-[11px]">Primary Admin</div>
              <div className="text-[10px] text-slate-500">admin_primary / admin123</div>
            </button>
            <button
              onClick={() => setQuickUser('teacher_sunita', 'teacher123')}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-left hover:bg-blue-100 dark:hover:bg-slate-700 transition"
            >
              <div className="font-bold text-blue-700 dark:text-blue-400 text-[11px]">Teacher</div>
              <div className="text-[10px] text-slate-500">teacher_sunita / teacher123</div>
            </button>
            <button
              onClick={() => setQuickUser('student_ananya', 'student123')}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-left hover:bg-purple-100 dark:hover:bg-slate-700 transition"
            >
              <div className="font-bold text-purple-700 dark:text-purple-400 text-[11px]">Student</div>
              <div className="text-[10px] text-slate-500">student_ananya / student123</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
