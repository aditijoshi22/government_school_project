import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/common/PageHeader';
import { Award, GraduationCap, Calendar, Download } from 'lucide-react';

export default function StudentCorner() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const content = {
    en: {
      title: "Student Corner & Career Guidance",
      subtitle: "Scholarships, competitive examination resources, study materials, and holiday calendar.",
      badge: "Student Hub",
      scholarshipTitle: "Class 5 & 8 State Scholarship & NMMS Cell",
      scholarshipSub: "Maharashtra State Pre-Upper Primary & Pre-Secondary Scholarship Portal",
      scholarshipDesc: "Special coaching modules, weekly practice tests, and model question papers are provided to help Class 5 and Class 8 students clear the prestigious MSCE Scholarship & NMMS exam.",
      scholarshipBtn: "Download 2026 Scholarship Practice Papers",
      entranceTitle: "Competitive Entrance Desk (MHT-CET, NEET, JEE, CUET)",
      entranceSub: "Junior College Science & Commerce Career Cell",
      entranceDesc: "Guidance for Class 11 & 12 students preparing for Engineering, Medical, Pharmacy, Agriculture, and Commerce professional degree courses. Free mentorship by alumni engineers and doctors.",
      calendarTitle: "Academic Holiday List 2026-27",
      thDate: "Date",
      thHoliday: "Holiday / Occasion",
      thDay: "Day"
    },
    mr: {
      title: "विद्यार्थी कोपरा व करिअर मार्गदर्शन",
      subtitle: "शिष्यवृत्ती, स्पर्धा परीक्षा मार्गदर्शन, अभ्यास साहित्य आणि शैक्षणिक सुट्ट्यांची दिनदर्शिका.",
      badge: "विद्यार्थी कक्ष",
      scholarshipTitle: "इयत्ता ५ वी व ८ वी शासकीय शिष्यवृत्ती व NMMS कक्ष",
      scholarshipSub: "महाराष्ट्र राज्य परीक्षा परिषद पूर्व उच्च प्राथमिक व पूर्व माध्यमिक शिष्यवृत्ती पोर्टल",
      scholarshipDesc: "इयत्ता ५ वी व ८ वी च्या विद्यार्थ्यांना नामांकित MSCE शिष्यवृत्ती व NMMS परीक्षा उत्तीर्ण होण्यासाठी विशेष मार्गदर्शन वर्ग, साप्ताहिक सराव चाचण्या आणि सराव प्रश्नपत्रिका उपलब्ध करून दिल्या जातात.",
      scholarshipBtn: "२०२६ शिष्यवृत्ती सराव प्रश्नपत्रिका डाउनलोड करा",
      entranceTitle: "स्पर्धा परीक्षा प्रवेश मार्गदर्शन कक्ष (MHT-CET, NEET, JEE, CUET)",
      entranceSub: "कनिष्ठ महाविद्यालय विज्ञान व वाणिज्य करिअर मार्गदर्शन कक्ष",
      entranceDesc: "इयत्ता ११ वी व १२ वी च्या विद्यार्थ्यांना अभियांत्रिकी, वैद्यकीय, औषधनिर्माणशास्त्र (Pharmacy), कृषी व वाणिज्य व्यावसायिक अभ्यासक्रमांसाठी विशेष मार्गदर्शन. माजी विद्यार्थी डॉक्टर व अभियंत्यांचे विनामूल्य मार्गदर्शन.",
      calendarTitle: "शैक्षणिक सुट्ट्यांची यादी २०२६-२७",
      thDate: "तारीख",
      thHoliday: "सुट्टी / प्रसंग",
      thDay: "वार"
    },
    hi: {
      title: "विद्यार्थी प्रकोष्ठ एवं करियर मार्गदर्शन",
      subtitle: "छात्रवृत्ति, प्रतियोगी परीक्षा संसाधन, अध्ययन सामग्री और अवकाश कैलेंडर।",
      badge: "विद्यार्थी हब",
      scholarshipTitle: "कक्षा 5वीं व 8वीं राज्य छात्रवृत्ति एवं NMMS प्रकोष्ठ",
      scholarshipSub: "महाराष्ट्र राज्य पूर्व उच्च प्राथमिक व पूर्व माध्यमिक छात्रवृत्ति पोर्टल",
      scholarshipDesc: "कक्षा 5वीं और 8वीं के विद्यार्थियों को प्रतिष्ठित MSCE छात्रवृत्ति व NMMS परीक्षा में सफलता हेतु विशेष कोचिंग मॉड्यूल, साप्ताहिक अभ्यास टेस्ट और मॉडल प्रश्न-पत्र प्रदान किए जाते हैं।",
      scholarshipBtn: "2026 छात्रवृत्ति अभ्यास प्रश्न-पत्र डाउनलोड करें",
      entranceTitle: "प्रतियोगी प्रवेश परीक्षा मार्गदर्शन (MHT-CET, NEET, JEE, CUET)",
      entranceSub: "जूनियर कॉलेज विज्ञान एवं वाणिज्य करियर प्रकोष्ठ",
      entranceDesc: "इंजीनियरिंग, मेडिकल, फार्मेसी, कृषि और वाणिज्य व्यावसायिक डिग्री पाठ्यक्रमों की तैयारी करने वाले कक्षा 11वीं और 12वीं के विद्यार्थियों के लिए मार्गदर्शन। पूर्व छात्र इंजीनियरों व डॉक्टरों द्वारा निःशुल्क मेंटरशिप।",
      calendarTitle: "शैक्षणिक अवकाश सूची 2026-27",
      thDate: "दिनांक",
      thHoliday: "अवकाश / पर्व",
      thDay: "दिन"
    }
  };

  const holidaysList = [
    {
      date: "15 Aug 2026",
      name: { en: "Independence Day", mr: "स्वातंत्र्य दिन", hi: "स्वतंत्रता दिवस" },
      day: { en: "Saturday", mr: "शनिवार", hi: "शनिवार" }
    },
    {
      date: "27 Aug 2026",
      name: { en: "Ganesh Chaturthi", mr: "गणेश चतुर्थी", hi: "गणेश चतुर्थी" },
      day: { en: "Thursday", mr: "गुरूवार", hi: "गुरुवार" }
    },
    {
      date: "02 Oct 2026",
      name: { en: "Mahatma Gandhi Jayanti", mr: "महात्मा गांधी जयंती", hi: "महात्मा गांधी जयंती" },
      day: { en: "Friday", mr: "शुक्रवार", hi: "शुक्रवार" }
    },
    {
      date: "20 Oct 2026",
      name: { en: "Diwali Vacation Starts", mr: "दिवाळी सुट्टी प्रारंभ", hi: "दीपावली अवकाश प्रारंभ" },
      day: { en: "Tuesday", mr: "मंगळवार", hi: "मंगलवार" }
    },
    {
      date: "26 Jan 2027",
      name: { en: "Republic Day", mr: "प्रजासत्ताक दिन", hi: "गणतंत्र दिवस" },
      day: { en: "Tuesday", mr: "मंगळवार", hi: "मंगलवार" }
    }
  ];

  const tData = content[lang] || content.en;

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={tData.title}
        subtitle={tData.subtitle}
        badgeText={tData.badge}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Class 5 & 8 Scholarship & NMMS Corner */}
        <div className="bg-emerald-500/10 border border-emerald-300 dark:border-emerald-900 rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tData.scholarshipTitle}</h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">{tData.scholarshipSub}</p>
            </div>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {tData.scholarshipDesc}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/downloads" className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>{tData.scholarshipBtn}</span>
            </a>
          </div>
        </div>

        {/* High School Entrance Exam Guidance (Class 11 & 12) */}
        <div className="bg-blue-500/10 border border-blue-300 dark:border-blue-900 rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-2xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tData.entranceTitle}</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">{tData.entranceSub}</p>
            </div>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {tData.entranceDesc}
          </p>
        </div>

        {/* Holiday Calendar 2026-27 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <Calendar className="w-5 h-5 text-amber-500" />
            <span>{tData.calendarTitle}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                <tr>
                  <th className="p-3">{tData.thDate}</th>
                  <th className="p-3">{tData.thHoliday}</th>
                  <th className="p-3">{tData.thDay}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {holidaysList.map((h, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">{h.date}</td>
                    <td className="p-3 font-semibold">{h.name[lang] || h.name.en}</td>
                    <td className="p-3">{h.day[lang] || h.day.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

