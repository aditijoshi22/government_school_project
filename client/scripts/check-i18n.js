import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.resolve(__dirname, '..');
const srcDir = path.join(clientDir, 'src');
const localesDir = path.join(srcDir, 'locales');

console.log('🔍 Checking i18n translation key parity and scanning for hardcoded strings...\n');

const languages = ['en', 'mr', 'hi'];
const namespaces = [
  'common', 'navbar', 'footer', 'home', 'about', 'sections',
  'admissions', 'results', 'notices', 'gallery', 'staff',
  'facilities', 'contact', 'auth', 'dashboard', 'validation', 'errors'
];

let totalKeys = 0;
let missingKeysCount = 0;
const missingReport = {};

// 1. Check Key Parity across all namespaces
namespaces.forEach(ns => {
  const enFile = path.join(localesDir, 'en', `${ns}.json`);
  if (!fs.existsSync(enFile)) {
    console.error(`❌ Missing English namespace file: ${ns}.json`);
    missingKeysCount++;
    return;
  }

  const enContent = JSON.parse(fs.readFileSync(enFile, 'utf-8'));
  const enKeys = Object.keys(enContent);
  totalKeys += enKeys.length;

  for (const lang of ['mr', 'hi']) {
    const langFile = path.join(localesDir, lang, `${ns}.json`);
    if (!fs.existsSync(langFile)) {
      console.error(`❌ Missing ${lang} namespace file: ${ns}.json`);
      missingKeysCount++;
      continue;
    }

    const langContent = JSON.parse(fs.readFileSync(langFile, 'utf-8'));
    const missingInLang = enKeys.filter(k => !(k in langContent) || langContent[k] === undefined);

    if (missingInLang.length > 0) {
      if (!missingReport[`${lang}/${ns}`]) missingReport[`${lang}/${ns}`] = [];
      missingReport[`${lang}/${ns}`].push(...missingInLang);
      missingKeysCount += missingInLang.length;
    }
  }
});

console.log(`📊 Total namespaces checked: ${namespaces.length}`);
console.log(`📊 Total translation keys per language: ${totalKeys}`);

if (missingKeysCount === 0) {
  console.log(`✅ 100% Key Parity! Every key in 'en' exists in 'mr' and 'hi'.`);
} else {
  console.error(`❌ Found ${missingKeysCount} missing keys across languages:`);
  console.error(JSON.stringify(missingReport, null, 2));
}

// 2. Scan JSX files for potentially un-localized strings
console.log('\n🔎 Scanning JSX files for unlocalized text...');

function getAllFiles(dir, exts = ['.jsx']) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== 'locales') {
        files = files.concat(getAllFiles(fullPath, exts));
      }
    } else if (exts.some(ext => item.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

const jsxFiles = getAllFiles(srcDir);
let hardcodedCount = 0;
const jsxReport = [];

// Avoid flagging proper nouns, brands, symbols, and code identifiers
const ignoredTerms = new Set([
  'English', 'UDISE', 'SSC', 'HSC', 'NMMS', 'NEET', 'JEE', 'MHT-CET',
  'CUET', 'RTE', 'CCE', 'GR', 'TC', 'A', 'B', 'C', 'A+', 'A++', 'B+', 'PCMB',
  'Male', 'Female', 'Other'
]);

for (const file of jsxFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const relPath = path.relative(srcDir, file).replace(/\\/g, '/');

  lines.forEach((line, idx) => {
    // Look for JSX text between tags
    const textMatches = [...line.matchAll(/>\s*([A-Za-z][A-Za-z0-9\s,.:;!?'"()\-–—/@#&]{2,})\s*</g)];
    for (const m of textMatches) {
      const text = m[1].trim();
      if (!ignoredTerms.has(text) && !text.startsWith('{') && !text.includes('=>') && !text.startsWith('//')) {
        // Exclude lines that use t(...) on the same line or demo values
        if (!line.includes("t('") && !line.includes('t("') && !line.includes('admin / admin123')) {
          hardcodedCount++;
          jsxReport.push({ file: relPath, line: idx + 1, text });
        }
      }
    }
  });
}

console.log(`📁 Files scanned: ${jsxFiles.length}`);
if (hardcodedCount === 0) {
  console.log(`✅ No hardcoded user-visible English text found in JSX files!`);
} else {
  console.log(`ℹ️ Potential hardcoded strings noted: ${hardcodedCount}`);
  jsxReport.slice(0, 10).forEach(r => console.log(`   [${r.file}:${r.line}] "${r.text}"`));
  if (jsxReport.length > 10) console.log(`   ... and ${jsxReport.length - 10} more.`);
}

console.log('\n🏁 check:i18n finished successfully.');
process.exit(missingKeysCount === 0 ? 0 : 1);
