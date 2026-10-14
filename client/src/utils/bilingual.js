/**
 * Helper to get localized title or description/content based on active language.
 * Supports Marathi ('mr'), Hindi ('hi'), and English ('en').
 * Falls back to English if a translation is empty.
 */
export function normalizeLanguage(lang) {
  if (!lang) return 'en';
  if (lang.startsWith('mr')) return 'mr';
  if (lang.startsWith('hi')) return 'hi';
  return 'en';
}

export function getLocalizedText(item, fieldName, currentLang = 'en') {
  if (!item) return '';
  const lang = normalizeLanguage(currentLang);

  // Field names mapping for title/content/description
  const keysByLang = {
    mr: [`${fieldName}_mr`, `${fieldName}Mr`, `${fieldName}_mr_IN`],
    hi: [`${fieldName}_hi`, `${fieldName}Hi`, `${fieldName}_hi_IN`],
    en: [`${fieldName}_en`, `${fieldName}En`, fieldName]
  };

  // If title/content is an object like { en: "...", mr: "...", hi: "..." }
  if (typeof item[fieldName] === 'object' && item[fieldName] !== null) {
    return item[fieldName][lang] || item[fieldName].en || '';
  }

  // 1. Try preferred language
  const preferredKeys = keysByLang[lang] || [];
  for (const k of preferredKeys) {
    if (item[k] && typeof item[k] === 'string' && item[k].trim() !== '') {
      return item[k];
    }
  }

  // 2. Fallback to English
  const englishKeys = keysByLang.en;
  for (const k of englishKeys) {
    if (item[k] && typeof item[k] === 'string' && item[k].trim() !== '') {
      return item[k];
    }
  }

  // 3. Fallback to base fieldName or any available translation
  if (item[fieldName] && typeof item[fieldName] === 'string' && item[fieldName].trim() !== '') {
    return item[fieldName];
  }
  for (const l of ['mr', 'hi', 'en']) {
    for (const k of keysByLang[l]) {
      if (item[k] && typeof item[k] === 'string' && item[k].trim() !== '') {
        return item[k];
      }
    }
  }

  return '';
}

/**
 * Formats a date string using Intl.DateTimeFormat with proper locale (mr-IN, hi-IN, en-IN)
 */
export function formatLocalizedDate(dateString, currentLang = 'en', options = {}) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const lang = normalizeLanguage(currentLang);
    const localeMap = {
      mr: 'mr-IN',
      hi: 'hi-IN',
      en: 'en-IN'
    };
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };
    return new Intl.DateTimeFormat(localeMap[lang] || 'en-IN', defaultOptions).format(date);
  } catch (err) {
    return dateString;
  }
}

/**
 * Formats a number using Intl.NumberFormat with proper locale (mr-IN, hi-IN, en-IN)
 */
export function formatLocalizedNumber(number, currentLang = 'en') {
  if (number === null || number === undefined || isNaN(number)) return '';
  try {
    const lang = normalizeLanguage(currentLang);
    const localeMap = {
      mr: 'mr-IN',
      hi: 'hi-IN',
      en: 'en-IN'
    };
    return new Intl.NumberFormat(localeMap[lang] || 'en-IN').format(number);
  } catch (err) {
    return String(number);
  }
}
