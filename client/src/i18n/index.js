import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About Us",
        sections: "Academics & Sections",
        primary: "Primary (1-4)",
        secondary: "Secondary & SSC (5-10)",
        highSchool: "High School & HSC (11-12)",
        admissions: "Admissions",
        examinations: "Examinations",
        results: "Results & Report Cards",
        staff: "Staff Directory",
        facilities: "Facilities",
        notices: "Notices & Circulars",
        gallery: "Events & Gallery",
        studentCorner: "Student Corner",
        schemes: "Government Schemes",
        downloads: "Downloads",
        contact: "Contact Us",
        login: "Portal Login",
        dashboard: "Dashboard"
      },
      hero: {
        welcomeTitle: "Quality Education for Bright Futures",
        subtitle: "Zilla Parishad High School & Junior College, Anjangaon Surji (UDISE: 27070100105)",
        exploreSections: "Explore Academic Sections",
        applyAdmission: "Apply Online Admission 2026-27"
      },
      sections: {
        title: "Our Academic Sections",
        primaryDesc: "Class 1 to 4 - Activity-based learning, descriptive grades, and child-centric care.",
        secondaryDesc: "Class 5 to 10 - State curriculum, Class 5 & 8 Scholarship exam prep & Class 10 SSC Board.",
        highSchoolDesc: "Class 11 & 12 - Science, Commerce & Arts streams, HSC Board & Competitive Entrance Cell."
      },
      resultLookup: {
        title: "Online Result & Progress Report Portal",
        rollNo: "Roll Number",
        dob: "Date of Birth",
        selectSection: "Select Section",
        selectClass: "Select Class",
        searchBtn: "View Marksheet / Progress Report"
      },
      roles: {
        adminDashboard: "Admin Dashboard",
        teacherDashboard: "Teacher Dashboard",
        studentDashboard: "Student Dashboard",
        enterMarks: "Enter Marks",
        myResults: "My Results",
        myAttendance: "My Attendance",
        latestNotices: "Latest Notices",
        noNoticesAvailable: "No notices available."
      }
    }
  },
  mr: {
    translation: {
      nav: {
        home: "मुख्य पृष्ठ",
        about: "आमच्याबद्दल",
        sections: "शैक्षणिक विभाग",
        primary: "प्राथमिक (इयत्ता १ ते ४)",
        secondary: "माध्यमिक (इयत्ता ५ ते १०)",
        highSchool: "उच्च माध्यमिक (इयत्ता ११ व १२)",
        admissions: "प्रवेश प्रक्रिया",
        examinations: "परीक्षा व वेळापत्रक",
        results: "निकाल व प्रगती पुस्तक",
        staff: "शिक्षक व कर्मचारी",
        facilities: "सुविधा",
        notices: "सूचना व परिपत्रके",
        gallery: "गॅलरी व उपक्रम",
        studentCorner: "विद्यार्थी कोपरा",
        schemes: "शासकीय योजना",
        downloads: "डाउनलोड्स",
        contact: "संपर्क",
        login: "पोर्टल लॉगिन",
        dashboard: "डॅशबोर्ड"
      },
      hero: {
        welcomeTitle: "उज्वल भविष्यासाठी गुणवत्तेची शिक्षण परंपरा",
        subtitle: "जिल्हा परिषद उच्च शाळा व कनिष्ठ महाविद्यालय, अंजनगाव सुर्जी (UDISE: 27070100105)",
        exploreSections: "विभाग पहा",
        applyAdmission: "ऑनलाइन प्रवेश अर्ज २०२६-२७"
      },
      sections: {
        title: "आमचे शैक्षणिक विभाग",
        primaryDesc: "इयत्ता १ ते ४ - आनंददायी शिक्षण, गुण-विरहीत मूल्यमापन व बालस्नेही वातावरण.",
        secondaryDesc: "इयत्ता ५ ते १० - राज्य अभ्यासक्रम, इयत्ता ५ वी व ८ वी शिष्यवृत्ती परीक्षा व १० वी SSC बोर्ड तयारी.",
        highSchoolDesc: "इयत्ता ११ वी व १२ वी - विज्ञान, वाणिज्य व कला शाखा, HSC बोर्ड व स्पर्धा परीक्षा मार्गदर्शन."
      },
      resultLookup: {
        title: "ऑनलाइन निकाल व प्रगती पुस्तक कक्ष",
        rollNo: "हजेरी क्रमांक (Roll No)",
        dob: "जन्म तारीख",
        selectSection: "विभाग निवडा",
        selectClass: "इयत्ता निवडा",
        searchBtn: "निकाल / प्रगती पुस्तक पहा"
      },
      roles: {
        adminDashboard: "प्रशासन डॅशबोर्ड",
        teacherDashboard: "शिक्षक डॅशबोर्ड",
        studentDashboard: "विद्यार्थी डॅशबोर्ड",
        enterMarks: "गुण नोंदी",
        myResults: "माझे निकाल",
        myAttendance: "माझी उपस्थिती",
        latestNotices: "नवीनतम सूचना",
        noNoticesAvailable: "कोणतीही सूचना उपलब्ध नाही."
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: "मुख्य पृष्ठ",
        about: "हमारे बारे में",
        sections: "शैक्षणिक विभाग",
        primary: "प्राथमिक (कक्षा 1 से 4)",
        secondary: "माध्यमिक (कक्षा 5 से 10)",
        highSchool: "उच्च माध्यमिक (कक्षा 11 व 12)",
        admissions: "प्रवेश प्रक्रिया",
        examinations: "परीक्षा व समय सारणी",
        results: "परीक्षा परिणाम",
        staff: "शिक्षक एवं कर्मचारी",
        facilities: "सुविधाएं",
        notices: "सूचना एवं परिपत्र",
        gallery: "गैलरी एवं गतिविधियां",
        studentCorner: "छात्र कोना",
        schemes: "सरकारी योजनाएं",
        downloads: "डाउनलोड",
        contact: "संपर्क करें",
        login: "पोर्टल लॉगिन",
        dashboard: "डैशबोर्ड"
      },
      hero: {
        welcomeTitle: "उज्ज्वल भविष्य के लिए गुणवत्तापूर्ण शिक्षा",
        subtitle: "जिला परिषद उच्च विद्यालय एवं कनिष्ठ महाविद्यालय, अंजनगांव सुर्जी (UDISE: 27070100105)",
        exploreSections: "विभाग देखें",
        applyAdmission: "ऑनलाइन प्रवेश आवेदन 2026-27"
      },
      sections: {
        title: "हमारे शैक्षणिक विभाग",
        primaryDesc: "कक्षा 1 से 4 - गतिविधि आधारित शिक्षा एवं बाल सुलभ वातावरण।",
        secondaryDesc: "कक्षा 5 से 10 - राज्य पाठ्यक्रम, कक्षा 5 एवं 8 छात्रवृत्ति परीक्षा व SSC बोर्ड तैयारी।",
        highSchoolDesc: "कक्षा 11 एवं 12 - विज्ञान, वाणिज्य व कला संकाय, HSC बोर्ड व प्रतियोगी परीक्षा मार्गदर्शन।"
      },
      resultLookup: {
        title: "ऑनलाइन परिणाम पोर्टल",
        rollNo: "अनुक्रमांक (Roll No)",
        dob: "जन्म तिथि",
        selectSection: "विभाग चुनें",
        selectClass: "कक्षा चुनें",
        searchBtn: "परिणाम देखें"
      },
      roles: {
        adminDashboard: "प्रशासन डैशबोर्ड",
        teacherDashboard: "शिक्षक डैशबोर्ड",
        studentDashboard: "छात्र डैशबोर्ड",
        enterMarks: "अंक प्रविष्टि",
        myResults: "मेरे परिणाम",
        myAttendance: "मेरी उपस्थिति",
        latestNotices: "नवीनतम सूचनाएं",
        noNoticesAvailable: "कोई सूचना उपलब्ध नहीं है।"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
