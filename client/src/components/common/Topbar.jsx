import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import schoolConfig from '@shared/school.config';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import { Phone, Mail, Globe, Eye, Sun, Moon, Type } from 'lucide-react';

export default function Topbar() {
  const { i18n } = useTranslation();
  const { darkMode, toggleDarkMode, highContrast, toggleHighContrast, fontSize, setFontSize } = useTheme();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Contact & UDISE Metadata */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            UDISE: {SECTIONS_CONFIG.map(s => s.udiseCode).join(' • ')}
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <a href={`tel:${schoolConfig.contact.phone}`} className="flex items-center gap-1 hover:text-amber-300 transition">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            {schoolConfig.contact.phone}
          </a>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <a href={`mailto:${schoolConfig.contact.email}`} className="flex items-center gap-1 hover:text-amber-300 transition">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            {schoolConfig.contact.email}
          </a>
        </div>

        {/* Accessibility Controls & i18n Switcher */}
        <div className="flex items-center gap-3">
          {/* Font Size Adjuster */}
          <div className="flex items-center bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
            <Type className="w-3 h-3 text-slate-400 mr-1" />
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1 text-[10px] font-bold ${fontSize === 'normal' ? 'text-amber-400' : 'text-slate-400'}`}
              title="Normal Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1 text-xs font-bold ${fontSize === 'large' ? 'text-amber-400' : 'text-slate-400'}`}
              title="Large Font Size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-1 text-sm font-bold ${fontSize === 'xlarge' ? 'text-amber-400' : 'text-slate-400'}`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* High Contrast Mode */}
          <button
            onClick={toggleHighContrast}
            className={`p-1 rounded flex items-center gap-1 text-[11px] font-medium border ${
              highContrast ? 'bg-amber-400 text-slate-900 border-amber-500 font-bold' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden md:inline">High Contrast</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded bg-slate-800 border border-slate-700 hover:text-amber-400 text-slate-300"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 rounded px-2 py-0.5 border border-slate-700">
            <Globe className="w-3 h-3 text-amber-400" />
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900">English</option>
              <option value="mr" className="bg-slate-900">मराठी</option>
              <option value="hi" className="bg-slate-900">हिंदी</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
