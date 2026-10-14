import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/common/PageHeader';
import { Award, FileText } from 'lucide-react';

export default function Examinations() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const content = {
    en: {
      title: "Examinations & Assessment Portal",
      subtitle: "Schedule of Unit Tests, Term Examinations, SSC & HSC Board examination desks.",
      badge: "Academic Assessment",
      sscTitle: "Class 10 SSC Board Examination Cell",
      sscSub: "Board Examination Center",
      sscDesc: "Hall ticket distribution, internal oral & practical timetable, prelim exams, and SSC Board exam centers guidance for Class 10 students.",
      hscTitle: "Class 12 HSC Board Examination Cell",
      hscSub: "Science, Commerce & Arts Higher Secondary Board",
      hscDesc: "Physics, Chemistry, Biology practical examination dates, internal assessment marks submission desk, and HSC Board hall tickets.",
      guidelinesTitle: "Section-Wise Assessment Guidelines",
      primaryTitle: "Primary (Class 1-4)",
      primaryDesc: "No traditional marks or pass/fail stress. Evaluated continuously via descriptive grades (A/B/C) across reading, numeracy, sports, and social habits.",
      secondaryTitle: "Secondary (Class 5-10)",
      secondaryDesc: "Unit Tests (20 marks), Semester Exams (80 marks), oral & practical tests. Includes Class 5 & 8 Scholarship exam mock tests.",
      highTitle: "Junior College (Class 11-12)",
      highDesc: "Stream-based terminal examinations (70 written + 30 practical/project marks). Prelim exams prior to final HSC Board exams."
    },
    mr: {
      title: "परीक्षा व मूल्यमापन कक्ष",
      subtitle: "घटक चाचण्या, सत्र परीक्षा, दहावी (SSC) व बारावी (HSC) बोर्ड परीक्षांचे वेळापत्रक व मार्गदर्शन.",
      badge: "शैक्षणिक मूल्यमापन",
      sscTitle: "इयत्ता १० वी SSC बोर्ड परीक्षा कक्ष",
      sscSub: "अधिकृत बोर्ड परीक्षा केंद्र",
      sscDesc: "इयत्ता १० वी च्या विद्यार्थ्यांसाठी हॉल तिकीट वाटप, अंतर्गत तोंडी व प्रात्यक्षिक परीक्षा वेळापत्रक, सराव परीक्षा आणि बोर्ड परीक्षा मार्गदर्शन.",
      hscTitle: "इयत्ता १२ वी HSC बोर्ड परीक्षा कक्ष",
      hscSub: "विज्ञान, वाणिज्य व कला उच्च माध्यमिक बोर्ड",
      hscDesc: "भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र प्रात्यक्षिक परीक्षा तारखा, अंतर्गत मूल्यमापन गुण नोंदणी व HSC बोर्ड प्रवेश पत्र.",
      guidelinesTitle: "विभागनिहाय मूल्यमापन मार्गदर्शक तत्त्वे",
      primaryTitle: "प्राथमिक विभाग (इयत्ता १ ते ४)",
      primaryDesc: "पारंपरिक गुणांचा किंवा नापास होण्याचा कोणताही ताण नाही. वाचन, संख्याज्ञान, खेळ आणि सामाजिक सवयींवर आधारित वर्णनात्मक श्रेणी (A/B/C) द्वारे सातत्यपूर्ण मूल्यमापन केले जाते.",
      secondaryTitle: "माध्यमिक विभाग (इयत्ता ५ ते १०)",
      secondaryDesc: "घटक चाचण्या (२० गुण), सत्रांत परीक्षा (८० गुण), तोंडी व प्रात्यक्षिक चाचण्या. इयत्ता ५ वी व ८ वी शिष्यवृत्ती परीक्षेच्या सराव चाचण्या समाविष्ट.",
      highTitle: "उच्च माध्यमिक / कनिष्ठ महाविद्यालय (इयत्ता ११ व १२)",
      highDesc: "शाखानिहाय सत्रांत परीक्षा (७० लेखी + ३० प्रात्यक्षिक/प्रकल्प गुण). अंतिम HSC बोर्ड परीक्षेपूर्वी पूर्वतयारी सराव परीक्षा."
    },
    hi: {
      title: "परीक्षा एवं मूल्यांकन पोर्टल",
      subtitle: "इकाई परीक्षा, सत्रीय परीक्षा, 10वीं (SSC) और 12वीं (HSC) बोर्ड परीक्षा कार्यक्रम व मार्गदर्शन।",
      badge: "शैक्षणिक मूल्यांकन",
      sscTitle: "कक्षा 10वीं SSC बोर्ड परीक्षा प्रकोष्ठ",
      sscSub: "अधिकृत बोर्ड परीक्षा केंद्र",
      sscDesc: "कक्षा 10वीं के विद्यार्थियों के लिए प्रवेश पत्र वितरण, आंतरिक मौखिक व प्रायोगिक परीक्षा समय-सारणी, पूर्व-परीक्षा और बोर्ड परीक्षा मार्गदर्शन।",
      hscTitle: "कक्षा 12वीं HSC बोर्ड परीक्षा प्रकोष्ठ",
      hscSub: "विज्ञान, वाणिज्य व कला उच्च माध्यमिक बोर्ड",
      hscDesc: "भौतिकी, रसायन, जीवविज्ञान प्रायोगिक परीक्षा तिथियां, आंतरिक मूल्यांकन अंक प्रविष्टि व HSC बोर्ड प्रवेश पत्र।",
      guidelinesTitle: "विभागवार मूल्यांकन दिशा-निर्देश",
      primaryTitle: "प्राथमिक विभाग (कक्षा 1 से 4)",
      primaryDesc: "पारंपरिक अंकों या अनुत्तीर्ण होने का कोई तनाव नहीं। पठन, संख्या-ज्ञान, खेल और सामाजिक आदतों के आधार पर विवरणात्मक ग्रेड (A/B/C) द्वारा सतत मूल्यांकन किया जाता है।",
      secondaryTitle: "माध्यमिक विभाग (कक्षा 5 से 10)",
      secondaryDesc: "इकाई परीक्षाएं (20 अंक), सत्रीय परीक्षाएं (80 अंक), मौखिक व प्रायोगिक परीक्षाएं। कक्षा 5वीं और 8वीं छात्रवृत्ति परीक्षा के अभ्यास परीक्षण शामिल।",
      highTitle: "उच्च माध्यमिक / जूनियर कॉलेज (कक्षा 11 व 12)",
      highDesc: "संकायवार सत्रीय परीक्षाएं (70 लिखित + 30 प्रायोगिक/प्रोजेक्ट अंक)। अंतिम HSC बोर्ड परीक्षा से पूर्व पूर्वाभ्यास परीक्षाएं।"
    }
  };

  const tData = content[lang] || content.en;

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={tData.title}
        subtitle={tData.subtitle}
        badgeText={tData.badge}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* SSC & HSC Board Exam Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-emerald-500/10 border border-emerald-300 dark:border-emerald-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tData.sscTitle}</h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">{tData.sscSub}</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {tData.sscDesc}
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-300 dark:border-blue-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-2xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tData.hscTitle}</h3>
                <p className="text-xs text-blue-800 dark:text-blue-300 font-semibold">{tData.hscSub}</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {tData.hscDesc}
            </p>
          </div>

        </div>

        {/* Assessment System per Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>{tData.guidelinesTitle}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900 space-y-2">
              <strong className="text-amber-900 dark:text-amber-200 font-bold block">{tData.primaryTitle}</strong>
              <p className="text-slate-600 dark:text-slate-300">{tData.primaryDesc}</p>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-2">
              <strong className="text-emerald-900 dark:text-emerald-200 font-bold block">{tData.secondaryTitle}</strong>
              <p className="text-slate-600 dark:text-slate-300">{tData.secondaryDesc}</p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900 space-y-2">
              <strong className="text-blue-900 dark:text-blue-200 font-bold block">{tData.highTitle}</strong>
              <p className="text-slate-600 dark:text-slate-300">{tData.highDesc}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

