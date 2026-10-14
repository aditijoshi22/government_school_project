import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import schoolConfig from '@shared/school.config';
import { SECTIONS_CONFIG, getSectionSchoolName, getSectionName } from '@shared/sections.config';
import { Menu, X, ChevronDown, Award, BookOpen, GraduationCap, Sparkles, LayoutDashboard, LogIn } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionsDropdownOpen, setSectionsDropdownOpen] = useState(false);

  const currentLang = i18n.language?.startsWith('mr') ? 'mr' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const getDisplayName = () => {
    if (currentLang === 'mr') return schoolConfig.nameMarathi || schoolConfig.projectName;
    if (currentLang === 'hi') return schoolConfig.nameHindi || schoolConfig.projectName;
    return schoolConfig.projectName;
  };

  const getSectionIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4 text-blue-500" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const navLinks = [
    { name: t('navbar.home', 'Home'), path: '/' },
    { name: t('navbar.about', 'About Us'), path: '/about' },
    { name: t('navbar.admissions', 'Admissions'), path: '/admissions' },
    { name: t('navbar.examinations', 'Examinations'), path: '/examinations' },
    { name: t('navbar.results', 'Results'), path: '/results' },
    { name: t('navbar.notices', 'Notices'), path: '/notices' },
    { name: t('navbar.gallery', 'Gallery'), path: '/gallery' },
    { name: t('navbar.staff', 'Staff'), path: '/staff' },
    { name: t('navbar.contact', 'Contact Us'), path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Brand Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 border-2 border-amber-400 flex items-center justify-center font-bold text-lg shadow shrink-0">
            SS
          </div>
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
              {getDisplayName()}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap">
              <span>{t('navbar.threeSchools', '3 Schools')}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-emerald-700 dark:text-emerald-400">{t('navbar.levelsSubtitle', 'Primary • Secondary • Junior College')}</span>
            </p>
          </div>
        </Link>

        {/* Desktop Quick Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>{t('navbar.dashboard', 'Dashboard')} ({user?.username})</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow-sm"
            >
              <LogIn className="w-4 h-4 text-white" />
              <span>{t('navbar.login', 'Portal Login')}</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label={t('navbar.menuToggle', 'Toggle navigation menu')}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-900 text-white hidden lg:block border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center space-x-1 text-sm font-medium">
            {/* Sections Dropdown */}
            <li className="relative group" onMouseEnter={() => setSectionsDropdownOpen(true)} onMouseLeave={() => setSectionsDropdownOpen(false)}>
              <button className="flex items-center gap-1.5 px-3 py-2.5 text-amber-400 hover:bg-slate-800 rounded-t transition font-semibold">
                <span>{t('navbar.sections', 'Our Schools')}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {sectionsDropdownOpen && (
                <div className="absolute left-0 top-full w-96 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-b-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  {SECTIONS_CONFIG.map((sec) => (
                    <Link
                      key={sec.id}
                      to={`/sections/${sec.id}`}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                      onClick={() => setSectionsDropdownOpen(false)}
                    >
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                        {getSectionIcon(sec.iconName)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm" style={{ color: sec.themeColor }}>
                          {getSectionSchoolName(sec, currentLang)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {typeof sec.schoolLevel === 'object' ? (sec.schoolLevel[currentLang] || sec.schoolLevel.en) : sec.schoolLevel} • {sec.shortName?.[currentLang] || sec.shortName}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-3 py-2.5 transition ${
                      active ? 'bg-amber-400 text-slate-900 font-bold' : 'hover:bg-slate-800 hover:text-amber-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 py-2">
            <Link
              to="/student-corner"
              className="text-xs bg-amber-400 text-slate-900 font-bold px-3 py-1.5 rounded hover:bg-amber-300 transition flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" />
              {t('navbar.studentCorner', 'Student Corner')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white px-4 py-4 space-y-3 border-t border-slate-800">
          <div className="font-bold text-amber-400 text-xs uppercase tracking-wider px-2">
            {t('navbar.sections', 'Our Schools')}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {SECTIONS_CONFIG.map((sec) => (
              <Link
                key={sec.id}
                to={`/sections/${sec.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded bg-slate-800 text-sm font-medium hover:bg-slate-700"
              >
                {getSectionIcon(sec.iconName)}
                <span>{getSectionSchoolName(sec, currentLang)}</span>
              </Link>
            ))}
          </div>

          <hr className="border-slate-800 my-2" />

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm rounded hover:bg-slate-800 text-slate-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center bg-amber-400 text-slate-900 font-bold py-2 rounded-lg text-sm"
              >
                {t('navbar.dashboard', 'Dashboard')}
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center bg-blue-600 text-white font-bold py-2 rounded-lg text-sm"
              >
                {t('navbar.login', 'Portal Login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
