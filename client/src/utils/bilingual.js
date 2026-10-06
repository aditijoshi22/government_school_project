/**
 * Helper to get localized title or description/content based on active language.
 * Prefers _mr for Marathi ('mr'), falls back to _en, then legacy single-field title/content/description.
 */
export function getLocalizedText(item, fieldName, currentLang) {
  if (!item) return '';
  const isMr = currentLang === 'mr';

  if (fieldName === 'title') {
    if (isMr) {
      return item.title_mr || item.titleMr || item.title_en || item.titleEn || item.title || '';
    }
    return item.title_en || item.titleEn || item.title || item.title_mr || item.titleMr || '';
  }

  if (fieldName === 'description' || fieldName === 'content') {
    if (isMr) {
      return (
        item.description_mr ||
        item.content_mr ||
        item.descriptionMr ||
        item.contentMr ||
        item.description_en ||
        item.content_en ||
        item.description ||
        item.content ||
        ''
      );
    }
    return (
      item.description_en ||
      item.content_en ||
      item.descriptionEn ||
      item.contentEn ||
      item.description ||
      item.content ||
      item.description_mr ||
      item.content_mr ||
      ''
    );
  }

  // Generic fallback
  const mrVal = item[`${fieldName}_mr`] || item[`${fieldName}Mr`];
  const enVal = item[`${fieldName}_en`] || item[`${fieldName}En`];
  const baseVal = item[fieldName];

  if (isMr) return mrVal || baseVal || enVal || '';
  return enVal || baseVal || mrVal || '';
}
