import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  const { t, i18n } = useTranslation(['common']);
  const lang = i18n.language;

  const desc = {
    en: "The page or document you requested could not be found on the Government School website portal.",
    mr: "आपण शोधत असलेले पृष्ठ किंवा दस्तऐवज शासकीय शाळा पोर्टलवर उपलब्ध नाही.",
    hi: "आपके द्वारा खोजा गया पृष्ठ या दस्तावेज़ शासकीय स्कूल पोर्टल पर उपलब्ध नहीं है।"
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <div className="text-6xl font-extrabold text-amber-500 mb-2">404</div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('common.pageNotFound')}</h1>
      <p className="text-slate-500 text-sm max-w-md mb-6">
        {desc[lang] || desc.en}
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-2 shadow transition"
      >
        <Home className="w-4 h-4" />
        <span>{t('common.returnHome')}</span>
      </Link>
    </div>
  );
}

