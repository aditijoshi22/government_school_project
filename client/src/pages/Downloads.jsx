import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { Download, FileText } from 'lucide-react';
import { getLocalizedText } from '../utils/bilingual';

export default function Downloads() {
  const { t, i18n } = useTranslation(['common']);
  const [downloads, setDownloads] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/public/downloads?lang=${i18n.language}`)
      .then(res => {
        if (res.data.success) {
          setDownloads(res.data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [i18n.language]);

  const lang = i18n.language;

  const pageHeaders = {
    en: {
      title: "Public Downloads Repository",
      subtitle: "Official forms, RTI disclosures, TC applications, syllabus handbooks, and exam papers.",
      badge: "Document Center"
    },
    mr: {
      title: "प्रपत्र व अर्ज डाउनलोड्स",
      subtitle: "शासकीय अर्ज, माहितीचा अधिकार (RTI), शाळा सोडल्याचा दाखला अर्ज, अभ्यासक्रम व प्रश्नपत्रिका.",
      badge: "दस्तऐवज केंद्र"
    },
    hi: {
      title: "सार्वजनिक डाउनलोड प्रकोष्ठ",
      subtitle: "शासकीय आवेदन पत्र, आरटीआई प्रकटीकरण, टीसी आवेदन, पाठ्यक्रम और परीक्षा प्रश्न-पत्र।",
      badge: "दस्तावेज़ केंद्र"
    }
  };

  const currentHeader = pageHeaders[lang] || pageHeaders.en;

  const categoryLabels = {
    all: { en: 'All Documents', mr: 'सर्व कागदपत्रे', hi: 'सभी दस्तावेज़' },
    Forms: { en: 'Forms', mr: 'अर्ज व प्रपत्रे', hi: 'आवेदन व प्रपत्र' },
    'Exam Papers': { en: 'Exam Papers', mr: 'प्रश्नपत्रिका', hi: 'प्रश्न पत्र' },
    Syllabus: { en: 'Syllabus', mr: 'अभ्यासक्रम', hi: 'पाठ्यक्रम' }
  };

  const filtered = downloads.filter(d => selectedCategory === 'all' || d.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={currentHeader.title}
        subtitle={currentHeader.subtitle}
        badgeText={currentHeader.badge}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {['all', 'Forms', 'Exam Papers', 'Syllabus'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition capitalize ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {categoryLabels[cat]?.[lang] || categoryLabels[cat]?.en || cat}
            </button>
          ))}
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(item => {
            const itemTitle = getLocalizedText(item, 'title', i18n.language);
            const itemDesc = getLocalizedText(item, 'description', i18n.language);
            return (
              <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{itemTitle}</h3>
                    {itemDesc && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{itemDesc}</p>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold text-amber-600">
                        {categoryLabels[item.category]?.[lang] || item.category}
                      </span>
                      <span>
                        {lang === 'mr' ? 'आकार' : lang === 'hi' ? 'साइज़' : 'Size'}: {item.file_size}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={item.file_url}
                  download
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('common.download')}</span>
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

