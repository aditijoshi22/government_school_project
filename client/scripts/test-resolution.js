import i18n from 'i18next';
import enLocales from '../src/locales/en/index.js';
import mrLocales from '../src/locales/mr/index.js';
import hiLocales from '../src/locales/hi/index.js';

function buildResource(locales) {
  const res = {
    translation: {
      ...locales,
      ...locales.common
    }
  };

  for (const [ns, content] of Object.entries(locales)) {
    res[ns] = {
      ...content,
      [ns]: content,
      common: locales.common,
      ...locales.common
    };
  }

  return res;
}

const resources = {
  en: buildResource(enLocales),
  mr: buildResource(mrLocales),
  hi: buildResource(hiLocales)
};

await i18n.init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  fallbackNS: ['translation', 'common'],
  defaultNS: 'translation',
  interpolation: { escapeValue: false }
});

console.log('--- Testing with defaultNS (translation) ---');
console.log("t('results.badge'):", i18n.t('results.badge'));
console.log("t('results.pageTitle'):", i18n.t('results.pageTitle'));
console.log("t('notices.badge'):", i18n.t('notices.badge'));
console.log("t('notices.pageTitle'):", i18n.t('notices.pageTitle'));
console.log("t('common.allSections'):", i18n.t('common.allSections'));

console.log('\n--- Testing with ns = results ---');
const tResults = i18n.getFixedT('en', 'results');
console.log("tResults('results.badge'):", tResults('results.badge'));
console.log("tResults('badge'):", tResults('badge'));
console.log("tResults('results.pageTitle'):", tResults('results.pageTitle'));
console.log("tResults('pageTitle'):", tResults('pageTitle'));
console.log("tResults('common.allSections'):", tResults('common.allSections'));
console.log("tResults('allSections'):", tResults('allSections'));

console.log('\n--- Testing with ns = notices ---');
const tNotices = i18n.getFixedT('en', 'notices');
console.log("tNotices('notices.badge'):", tNotices('notices.badge'));
console.log("tNotices('badge'):", tNotices('badge'));
console.log("tNotices('notices.pageTitle'):", tNotices('notices.pageTitle'));
console.log("tNotices('pageTitle'):", tNotices('pageTitle'));
console.log("tNotices('common.allSections'):", tNotices('common.allSections'));
console.log("tNotices('allSections'):", tNotices('allSections'));

console.log('\n--- Testing in Marathi (mr) ---');
await i18n.changeLanguage('mr');
console.log("t('results.badge'):", i18n.t('results.badge'));
console.log("t('results.pageTitle'):", i18n.t('results.pageTitle'));
console.log("t('notices.pageTitle'):", i18n.t('notices.pageTitle'));
console.log("t('common.allSections'):", i18n.t('common.allSections'));

console.log('\n--- Testing in Hindi (hi) ---');
await i18n.changeLanguage('hi');
console.log("t('results.badge'):", i18n.t('results.badge'));
console.log("t('results.pageTitle'):", i18n.t('results.pageTitle'));
console.log("t('notices.pageTitle'):", i18n.t('notices.pageTitle'));
console.log("t('common.allSections'):", i18n.t('common.allSections'));
