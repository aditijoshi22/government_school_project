import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { ShieldCheck, Utensils, BookOpen, Award } from 'lucide-react';
import { getLocalizedText } from '../utils/bilingual';

export default function GovernmentSchemes() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('mr') ? 'mr' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const [dbSchemes, setDbSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    Utensils: Utensils,
    BookOpen: BookOpen,
    Award: Award,
    ShieldCheck: ShieldCheck
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/public/schemes?lang=${currentLang}`)
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          setDbSchemes(res.data.data);
        }
      })
      .catch(err => {
        console.warn('Could not fetch schemes from db, using fallback', err);
      })
      .finally(() => setLoading(false));
  }, [currentLang]);

  const fallbackSchemes = [
    {
      title: currentLang === 'mr' ? "पीएम पोषण माध्यान्ह भोजन योजना" : currentLang === 'hi' ? "पीएम पोषण मध्याह्न भोजन योजना" : "PM POSHAN Mid-Day Meal Scheme",
      desc: currentLang === 'mr' ? "इयत्ता १ ते ८ च्या सर्व विद्यार्थ्यांना पोषण स्तर व हजेरी वाढवण्यासाठी दररोज मोफत गरमागरम व सकस आहार." : currentLang === 'hi' ? "कक्षा 1 से 8 तक के सभी विद्यार्थियों को प्रतिदिन निःशुल्क गर्म पौष्टिक भोजन प्रदान किया जाता है।" : "Free hot, nutritious cooked lunch provided daily to all students from Class 1 to Class 8.",
      icon: "Utensils",
      tag: currentLang === 'mr' ? "इयत्ता १ ते ८" : currentLang === 'hi' ? "कक्षा 1 से 8" : "Class 1 to 8"
    },
    {
      title: currentLang === 'mr' ? "मोफत पाठ्यपुस्तक व गणवेश योजना" : currentLang === 'hi' ? "निःशुल्क पाठ्यपुस्तक एवं गणवेश योजना" : "Free Textbook & Uniform Scheme",
      desc: currentLang === 'mr' ? "महाराष्ट्र शासनातर्फे सर्व पात्र विद्यार्थ्यांना मोफत बालभारती पाठ्यपुस्तके व दरवर्षी दोन गणवेश जोड्यांचे मोफत वाटप." : currentLang === 'hi' ? "राज्य सरकार द्वारा सभी पात्र विद्यार्थियों को निःशुल्क बालभारती पाठ्यपुस्तकें एवं गणवेश वितरण।" : "State Government sponsored free textbooks and uniforms distributed annually to eligible categories.",
      icon: "BookOpen",
      tag: currentLang === 'mr' ? "सर्व पात्र विद्यार्थी" : currentLang === 'hi' ? "सभी पात्र छात्र" : "All Eligible Students"
    },
    {
      title: currentLang === 'mr' ? "सावित्रीबाई फुले कन्या शिष्यवृत्ती" : currentLang === 'hi' ? "सावित्रीबाई फुले बालिका छात्रवृत्ति" : "Savitribai Phule Girl Child Scholarship",
      desc: currentLang === 'mr' ? "मुलींचे शालेय गळतीचे प्रमाण रोखण्यासाठी आणि माध्यमिक शिक्षणास प्रोत्साहन देण्यासाठी विशेष उपस्थिती प्रोत्साहन भत्ता." : currentLang === 'hi' ? "बालिकाओं के ड्रॉपआउट को रोकने और माध्यमिक शिक्षा को बढ़ावा देने हेतु विशेष उपस्थिति भत्ता।" : "Financial attendance incentive provided to girl students to prevent dropouts and encourage secondary education.",
      icon: "Award",
      tag: currentLang === 'mr' ? "विद्यार्थिनींसाठी" : currentLang === 'hi' ? "छात्राओं हेतु" : "Girl Students"
    },
    {
      title: currentLang === 'mr' ? "समग्र शिक्षा अभियान" : currentLang === 'hi' ? "समग्र शिक्षा अभियान" : "Samagra Shiksha Abhiyan",
      desc: currentLang === 'mr' ? "डिजिटल वर्गखोल्या, विज्ञान प्रयोगशाळा साहित्य, क्रीडा साहित्य आणि सर्वसमावेशक विशेष शिक्षणासाठी सर्वंकष शासकीय अनुदान." : currentLang === 'hi' ? "डिजिटल कक्षाओं, विज्ञान किट, खेलकूद सामग्री एवं समावेशी विशेष शिक्षा हेतु समग्र अनुदान।" : "Comprehensive central grant for digital classrooms, science laboratory kits, sports equipment, and inclusive education.",
      icon: "ShieldCheck",
      tag: currentLang === 'mr' ? "पायाभूत सुविधा" : currentLang === 'hi' ? "बुनियादी ढांचा" : "Infrastructure"
    }
  ];

  const displaySchemes = dbSchemes.length > 0 ? dbSchemes.map(s => ({
    title: getLocalizedText(s, 'title', currentLang),
    desc: getLocalizedText(s, 'description', currentLang),
    tag: getLocalizedText(s, 'tag', currentLang) || s.tag || '',
    icon: s.icon || 'ShieldCheck'
  })) : fallbackSchemes;

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={t('navbar.schemes', 'Government Welfare Schemes')}
        subtitle={currentLang === 'mr' ? "महाराष्ट्र राज्य शालेय शिक्षण विभागामार्फत राबविल्या जाणाऱ्या प्रमुख कल्याणकारी योजना." : currentLang === 'hi' ? "महाराष्ट्र राज्य शिक्षा विभाग द्वारा संचालित प्रमुख कल्याणकारी योजनाएं।" : "Key welfare schemes implemented by the Maharashtra State Education Department."}
        badgeText={t('navbar.schemes', 'Welfare Schemes')}
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {displaySchemes.map((scheme, idx) => {
          const Icon = iconMap[scheme.icon] || ShieldCheck;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                  {scheme.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{scheme.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{scheme.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
