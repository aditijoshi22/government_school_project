import React from 'react';

export default function PageHeader({ title, titleMr, subtitle, themeColor = "#1E3A8A", badgeText }) {
  return (
    <div 
      className="relative py-12 px-4 text-white overflow-hidden shadow-md"
      style={{
        background: `linear-gradient(135deg, ${themeColor} 0%, #0F172A 100%)`
      }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none bg-no-repeat bg-right bg-contain" style={{ backgroundImage: "url('/assets/pattern.svg')" }}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {badgeText && (
          <span className="inline-block bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            {badgeText}
          </span>
        )}
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
          {title}
        </h1>
        {titleMr && (
          <p className="text-lg md:text-xl text-amber-300 font-medium mb-3 font-devanagari">
            {titleMr}
          </p>
        )}
        {subtitle && (
          <p className="text-slate-200 text-sm md:text-base max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
