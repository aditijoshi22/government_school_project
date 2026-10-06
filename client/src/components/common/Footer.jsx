import React from 'react';
import { Link } from 'react-router-dom';
import schoolConfig from '@shared/school.config';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import { MapPin, Phone, Mail, Award, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-6 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        
        {/* Column 1: School Overview & UDISE */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-base shadow">
              SS
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-snug">{schoolConfig.projectShortName}</h3>
              <p className="text-xs text-amber-400">{schoolConfig.projectTagline}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            One portal for school information and management across our three schools - Primary, Secondary and Junior College.
          </p>
        </div>

        {/* Column 2: Academic Sections */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Our Schools
          </h4>
          <ul className="space-y-2.5 text-xs">
            {SECTIONS_CONFIG.map(sec => (
              <li key={sec.id}>
                <Link
                  to={`/sections/${sec.id}`}
                  className="hover:text-amber-400 transition flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sec.themeColor }}></span>
                  <span className="font-medium">{sec.schoolName} <span className="text-slate-500 font-mono">(UDISE: {sec.udiseCode})</span></span>
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link to="/admissions" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Online Admissions 2026-27
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Portals & Schemes */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Quick Portals & Schemes
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/results" className="hover:text-amber-400 transition">Online Result & Progress Report Desk</Link></li>
            <li><Link to="/examinations" className="hover:text-amber-400 transition">SSC & HSC Board Exam Schedules</Link></li>
            <li><Link to="/student-corner" className="hover:text-amber-400 transition">Class 5 & 8 Scholarship Cell</Link></li>
            <li><Link to="/government-schemes" className="hover:text-amber-400 transition">Mid-Day Meal & Samagra Shiksha</Link></li>
            <li><Link to="/downloads" className="hover:text-amber-400 transition">TC & Bonafide Certificate Forms</Link></li>
            <li><Link to="/notices" className="hover:text-amber-400 transition">Latest Notices & School Circulars</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Details */}
        <div className="space-y-3 text-xs">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Contact School Office
          </h4>
          <div className="flex items-start gap-2.5 text-slate-400">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{schoolConfig.contact.address}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-400">
            <Phone className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{schoolConfig.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-400">
            <Mail className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{schoolConfig.contact.email}</span>
          </div>
          <div className="pt-2 text-[11px] text-slate-500">
            Office Hours: {schoolConfig.contact.officeHours}
          </div>
        </div>

      </div>

      {/* Sponsorship Banner & Footer Credits */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © {schoolConfig.sponsorship.year} {schoolConfig.projectName}. All rights reserved.
        </div>

        {/* Sponsored By Footer Highlight */}
        <div className="bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 flex items-center gap-2 text-slate-300">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>{schoolConfig.sponsorship.text}</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
          <span>•</span>
          <Link to="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
