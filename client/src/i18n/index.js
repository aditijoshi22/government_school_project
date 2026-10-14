import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enLocales from '../locales/en/index.js';
import mrLocales from '../locales/mr/index.js';
import hiLocales from '../locales/hi/index.js';

// Backward compatibility helper mapping old keys
const buildLegacyMappings = (locales) => ({
  nav: locales.navbar,
  hero: {
    welcomeTitle: locales.home.heroTitle,
    subtitle: locales.common.siteTitle,
    exploreSections: locales.home.ourSchoolsTitle,
    applyAdmission: locales.home.applyAdmission
  },
  sections: {
    title: locales.sections.pageTitle,
    primaryDesc: locales.about.primarySummary,
    secondaryDesc: locales.about.secondarySummary,
    highSchoolDesc: locales.about.highSchoolSummary
  },
  resultLookup: {
    title: locales.results.pageTitle,
    rollNo: locales.results.rollNumber,
    dob: locales.results.dob,
    selectSection: locales.results.selectSection,
    selectClass: locales.results.selectClass,
    searchBtn: locales.results.searchBtn
  },
  roles: {
    adminDashboard: locales.auth.superAdmin,
    teacherDashboard: locales.dashboard.teacherDashboard,
    studentDashboard: locales.dashboard.studentDashboard,
    enterMarks: locales.dashboard.enterMarks,
    myResults: locales.dashboard.myResults,
    myAttendance: locales.dashboard.myAttendance,
    latestNotices: locales.home.latestNotices,
    noNoticesAvailable: locales.dashboard.noNotices
  }
});

const legacyEn = buildLegacyMappings(enLocales);
const legacyMr = buildLegacyMappings(mrLocales);
const legacyHi = buildLegacyMappings(hiLocales);

const resources = {
  en: {
    translation: {
      ...enLocales,
      ...legacyEn
    },
    ...enLocales,
    ...legacyEn
  },
  mr: {
    translation: {
      ...mrLocales,
      ...legacyMr
    },
    ...mrLocales,
    ...legacyMr
  },
  hi: {
    translation: {
      ...hiLocales,
      ...legacyHi
    },
    ...hiLocales,
    ...legacyHi
  }
};

const savedLng = typeof window !== 'undefined' ? (localStorage.getItem('i18nextLng') || 'en') : 'en';
// Normalize language codes like mr-IN to mr
const initialLng = savedLng.startsWith('mr') ? 'mr' : savedLng.startsWith('hi') ? 'hi' : 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLng,
    fallbackLng: 'en',
    supportedLngs: ['en', 'mr', 'hi'],
    ns: [
      'common', 'navbar', 'footer', 'home', 'about', 'sections',
      'admissions', 'results', 'notices', 'gallery', 'staff',
      'facilities', 'contact', 'auth', 'dashboard', 'validation', 'errors'
    ],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    }
  });

// Synchronize document.documentElement.lang and store choice on change
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language || 'en';
}

i18n.on('languageChanged', (lng) => {
  const normLng = lng.startsWith('mr') ? 'mr' : lng.startsWith('hi') ? 'hi' : 'en';
  if (typeof document !== 'undefined') {
    document.documentElement.lang = normLng;
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', normLng);
  }
});

export default i18n;
