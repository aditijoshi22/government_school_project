/**
 * School Academic Sections Configuration - Single Source of Truth
 * Used across Frontend navigation, Backend controllers, and Database seeders.
 * 
 * Each section is one of the 3 schools of the institution:
 *   1. Primary School            (Class 1-4)   -> Adarsh V.J.N.T. Primary Ashram School
 *   2. Secondary School          (Class 5-10)  -> Shri Shivajirao Moghe V.J.N.T. Secondary Ashram School
 *   3. High School / Jr. College (Class 11-12) -> Late Mohan Chavan VJNT Art and Science Junior College
 *
 * NOTE: `id`s are used by the backend/database - do not rename them.
 * Each school has its own `udiseCode`.
 */

const SECTIONS_CONFIG = [
  {
    id: "primary",
    udiseCode: "27140407303",
    schoolName: {
      en: "Adarsh V.J.N.T. Primary Ashram School",
      mr: "आदर्श वि.जा.भ.ज. प्राथमिक आश्रम शाळा",
      hi: "आदर्श वि.जा.भ.ज. प्राथमिक आश्रम शाला"
    },
    schoolShortName: {
      en: "Adarsh Primary Ashram School",
      mr: "आदर्श प्राथमिक आश्रम शाळा",
      hi: "आदर्श प्राथमिक आश्रम शाला"
    },
    schoolLevel: {
      en: "Primary School",
      mr: "प्राथमिक शाळा",
      hi: "प्राथमिक विद्यालय"
    },
    name: {
      en: "Primary Section",
      mr: "प्राथमिक विभाग",
      hi: "प्राथमिक विभाग"
    },
    nameEn: "Primary Section",
    nameMr: "प्राथमिक विभाग",
    nameHi: "प्राथमिक विभाग",
    shortName: {
      en: "Primary (1-4)",
      mr: "प्राथमिक (१-४)",
      hi: "प्राथमिक (1-4)"
    },
    classes: [1, 2, 3, 4],
    classList: {
      en: ["Class 1", "Class 2", "Class 3", "Class 4"],
      mr: ["इयत्ता १ ली", "इयत्ता २ री", "इयत्ता ३ री", "इयत्ता ४ थी"],
      hi: ["कक्षा 1", "कक्षा 2", "कक्षा 3", "कक्षा 4"]
    },
    sectionHead: "Smt. Sunita R. Patil",
    sectionHeadRole: {
      en: "Section Head (Class 1-4)",
      mr: "विभाग प्रमुख (इयत्ता १ ते ४)",
      hi: "विभाग प्रमुख (कक्षा 1 से 4)"
    },
    themeColor: "#F59E0B", // Soft Amber / Warm Orange
    themeBg: "#FFFBEB",
    themeBorder: "#FCD34D",
    themeBadge: "bg-amber-100 text-amber-800 border-amber-300",
    themeButton: "bg-amber-500 hover:bg-amber-600 text-white",
    iconName: "Sparkles",
    assessmentType: "grade-based", // "grade-based" | "marks" | "marks-with-streams"
    marksEntryEnabled: false,
    description: {
      en: "Nurturing curiosity, foundational literacy, numeracy, creative expression, and social skills in a cheerful environment.",
      mr: "आनंददायी वातावरणात बालकांमध्ये जिज्ञासा, मूलभूत साक्षरता, संख्याज्ञान, कला व सामाजिक गुणांचा विकास.",
      hi: "आनंदमय वातावरण में बच्चों में जिज्ञासा, बुनियादी साक्षरता, संख्या ज्ञान, कला और सामाजिक गुणों का विकास।"
    },
    features: {
      en: [
        "Activity & Play-based Learning",
        "Descriptive Grade Reports (A/B/C)",
        "Daily Rhymes, Storytelling & Art",
        "Regular Parent-Teacher Interaction",
        "Nutrition & Physical Health Care"
      ],
      mr: [
        "कृतीयुक्त व आनंददायी अध्यापन पद्धती",
        "वर्णनात्मक श्रेणी प्रगती पुस्तक (A/B/C)",
        "गाणी, गोष्टी, चित्रकला व हस्तकला उपक्रम",
        "नियमित पालक-शिक्षक संवाद सभा",
        "आरोग्य तपासणी व पोषण आहार"
      ],
      hi: [
        "गतिविधि एवं खेल आधारित शिक्षण प्रणाली",
        "वर्णनात्मक ग्रेड प्रगति पत्रक (A/B/C)",
        "कविताएं, कहानी वाचन एवं कला गतिविधियां",
        "नियमित अभिभावक-शिक्षक संवाद",
        "स्वास्थ्य परीक्षण एवं पौष्टिक आहार"
      ]
    },
    subjects: [
      { id: "sub-1-marathi", nameEn: "Marathi (प्रथम भाषा)", code: "MAR-1" },
      { id: "sub-1-english", nameEn: "English (द्वितीय भाषा)", code: "ENG-1" },
      { id: "sub-1-math", nameEn: "Mathematics (गणित)", code: "MATH-1" },
      { id: "sub-1-evs", nameEn: "Environmental Studies (परिसर अभ्यास)", code: "EVS-1" },
      { id: "sub-1-art", nameEn: "Art & Crafts (चित्रकला व हस्तकला)", code: "ART-1" },
      { id: "sub-1-sports", nameEn: "Physical Education (शारीरिक शिक्षण)", code: "PE-1" }
    ],
    skills: {
      en: [
        "Reading Comprehension (वाचन)",
        "Handwriting & Composition (लेखन)",
        "Basic Numeracy & Counting (संख्याज्ञान)",
        "Creative Art & Music (कला व संगीत)",
        "Sports & Physical Fitness (क्रीडा)",
        "Social Habits & Discipline (शिस्त व सवयी)"
      ],
      mr: [
        "वाचन व आकलन क्षमता",
        "सुलेखन व अभिव्यक्ती",
        "मूलभूत संख्याज्ञान व पाढे",
        "चित्रकला व संगीत आवड",
        "क्रीडा व मैदानी खेळ",
        "शिस्त व सामाजिक सवयी"
      ],
      hi: [
        "पठन एवं समझ",
        "सुलेख एवं अभिव्यक्ति",
        "बुनियादी संख्या ज्ञान",
        "रचनात्मक कला एवं संगीत",
        "खेलकूद एवं शारीरिक स्वास्थ्य",
        "अनुशासन एवं सामाजिक आदतें"
      ]
    }
  },
  {
    id: "secondary",
    udiseCode: "27140407302",
    schoolName: {
      en: "Shri Shivajirao Moghe V.J.N.T. Secondary Ashram School",
      mr: "श्री शिवाजीराव मोघे वि.जा.भ.ज. माध्यमिक आश्रम शाळा",
      hi: "श्री शिवाजीराव मोघे वि.जा.भ.ज. माध्यमिक आश्रम शाला"
    },
    schoolShortName: {
      en: "Shivajirao Moghe Secondary Ashram School",
      mr: "शिवाजीराव मोघे माध्यमिक आश्रम शाळा",
      hi: "शिवाजीराव मोघे माध्यमिक आश्रम शाला"
    },
    schoolLevel: {
      en: "Secondary School",
      mr: "माध्यमिक शाळा",
      hi: "माध्यमिक विद्यालय"
    },
    name: {
      en: "Secondary Section",
      mr: "माध्यमिक विभाग",
      hi: "माध्यमिक विभाग"
    },
    nameEn: "Secondary Section",
    nameMr: "माध्यमिक विभाग",
    nameHi: "माध्यमिक विभाग",
    shortName: {
      en: "Secondary (5-10)",
      mr: "माध्यमिक (५-१०)",
      hi: "माध्यमिक (5-10)"
    },
    classes: [5, 6, 7, 8, 9, 10],
    classList: {
      en: ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
      mr: ["इयत्ता ५ वी", "इयत्ता ६ वी", "इयत्ता ७ वी", "इयत्ता ८ वी", "इयत्ता ९ वी", "इयत्ता १० वी"],
      hi: ["कक्षा 5", "कक्षा 6", "कक्षा 7", "कक्षा 8", "कक्षा 9", "कक्षा 10"]
    },
    scholarshipClasses: [5, 8],
    sscClasses: [9, 10],
    sectionHead: "Shri. Gajanan V. Kulkarni",
    sectionHeadRole: {
      en: "Section Head (Class 5-10)",
      mr: "विभाग प्रमुख (इयत्ता ५ ते १०)",
      hi: "विभाग प्रमुख (कक्षा 5 से 10)"
    },
    themeColor: "#10B981", // Emerald Green / Teal
    themeBg: "#ECFDF5",
    themeBorder: "#6EE7B7",
    themeBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
    themeButton: "bg-emerald-600 hover:bg-emerald-700 text-white",
    iconName: "BookOpen",
    assessmentType: "marks",
    marksEntryEnabled: true,
    description: {
      en: "Comprehensive state board curriculum with specialized coaching for Class 5 & 8 Scholarship exams and Class 10 SSC Board excellence.",
      mr: "महाराष्ट्र राज्य अभ्यासक्रम, इयत्ता ५ वी व ८ वी शिष्यवृत्ती परीक्षा आणि १० वी SSC बोर्ड परीक्षेची परिपूर्ण तयारी.",
      hi: "राज्य बोर्ड पाठ्यक्रम, कक्षा 5 एवं 8 छात्रवृत्ति परीक्षा तथा 10वीं SSC बोर्ड परीक्षा की व्यापक तैयारी।"
    },
    features: {
      en: [
        "Unit Tests, Semester & Board Examinations",
        "Class 5 & 8 State Scholarship Exam Guidance",
        "Class 10 SSC Board Exam Preparation & Hall Ticket Desk",
        "Science & Computer Lab Practical Training",
        "Sports, NMMS & Quiz Competitions"
      ],
      mr: [
        "घटक चाचण्या, सत्र व बोर्ड परीक्षा मार्गदर्शन",
        "इयत्ता ५ वी व ८ वी शासकीय शिष्यवृत्ती परीक्षा वर्ग",
        "१० वी SSC बोर्ड परीक्षा पूर्वतयारी व हॉल तिकीट कक्ष",
        "विज्ञान व संगणक प्रयोगशाळा प्रात्यक्षिक प्रशिक्षण",
        "क्रीडा स्पर्धा, NMMS व सामान्य ज्ञान प्रश्नमंजुषा"
      ],
      hi: [
        "इकाई परीक्षण, सत्र एवं बोर्ड परीक्षाएं",
        "कक्षा 5 एवं 8 राज्य छात्रवृत्ति परीक्षा मार्गदर्शन",
        "10वीं SSC बोर्ड परीक्षा तैयारी एवं प्रवेश पत्र डेस्क",
        "विज्ञान एवं कंप्यूटर लैब प्रायोगिक प्रशिक्षण",
        "खेलकूद, NMMS एवं सामान्य ज्ञान प्रतियोगिताएं"
      ]
    },
    subjects: [
      { id: "sub-p-marathi", nameEn: "Marathi (प्रथम भाषा)", code: "MAR-P" },
      { id: "sub-p-hindi", nameEn: "Hindi (द्वितीय भाषा)", code: "HIN-P" },
      { id: "sub-p-english", nameEn: "English (तृतीय भाषा)", code: "ENG-P" },
      { id: "sub-p-math", nameEn: "Mathematics (गणित)", code: "MATH-P" },
      { id: "sub-p-science", nameEn: "Science & Technology (विज्ञान)", code: "SCI-P" },
      { id: "sub-p-socsci", nameEn: "Social Sciences (इतिहास व भूगोल)", code: "SS-P" },
      { id: "sub-p-ict", nameEn: "ICT / Computer Studies", code: "ICT-P" }
    ]
  },
  {
    id: "high-school",
    udiseCode: "27140407301",
    schoolName: {
      en: "Late Mohan Chavan VJNT Art and Science Junior College",
      mr: "स्व. मोहन चव्हाण वि.जा.भ.ज. कला व विज्ञान कनिष्ठ महाविद्यालय",
      hi: "स्व. मोहन चव्हाण वि.जा.भ.ज. कला एवं विज्ञान कनिष्ठ महाविद्यालय"
    },
    schoolShortName: {
      en: "Mohan Chavan Junior College",
      mr: "मोहन चव्हाण कनिष्ठ महाविद्यालय",
      hi: "मोहन चव्हाण कनिष्ठ महाविद्यालय"
    },
    schoolLevel: {
      en: "Junior College",
      mr: "कनिष्ठ महाविद्यालय",
      hi: "कनिष्ठ महाविद्यालय"
    },
    name: {
      en: "Higher Secondary Section (Junior College)",
      mr: "उच्च माध्यमिक विभाग (कनिष्ठ महाविद्यालय)",
      hi: "उच्च माध्यमिक विभाग (कनिष्ठ महाविद्यालय)"
    },
    nameEn: "Higher Secondary Section (Junior College)",
    nameMr: "उच्च माध्यमिक विभाग (कनिष्ठ महाविद्यालय)",
    nameHi: "उच्च माध्यमिक विभाग (कनिष्ठ महाविद्यालय)",
    shortName: {
      en: "High School (11-12)",
      mr: "कनिष्ठ महाविद्यालय (११-१२)",
      hi: "कनिष्ठ महाविद्यालय (11-12)"
    },
    classes: [11, 12],
    classList: {
      en: ["Class 11", "Class 12"],
      mr: ["इयत्ता ११ वी", "इयत्ता १२ वी"],
      hi: ["कक्षा 11", "कक्षा 12"]
    },
    streams: [
      {
        id: "science",
        nameEn: "Science Stream (विज्ञान शाखा)",
        nameMr: "विज्ञान शाखा",
        nameHi: "विज्ञान संकाय",
        subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Marathi/IT"]
      },
      {
        id: "commerce",
        nameEn: "Commerce Stream (वाणिज्य शाखा)",
        nameMr: "वाणिज्य शाखा",
        nameHi: "वाणिज्य संकाय",
        subjects: ["Accountancy", "Economics", "Organization of Commerce", "Secretarial Practice", "English", "Marathi/IT"]
      },
      {
        id: "arts",
        nameEn: "Arts Stream (कला शाखा)",
        nameMr: "कला शाखा",
        nameHi: "कला संकाय",
        subjects: ["History", "Political Science", "Geography", "Sociology", "English", "Marathi"]
      }
    ],
    hscClass: 12,
    sectionHead: "Dr. Anil K. Shinde",
    sectionHeadRole: {
      en: "Vice Principal & Junior College Head",
      mr: "उपमुख्याध्यापक व कनिष्ठ महाविद्यालय प्रमुख",
      hi: "उप-प्रधानाचार्य एवं कनिष्ठ महाविद्यालय प्रमुख"
    },
    themeColor: "#2563EB", // Royal Blue
    themeBg: "#EFF6FF",
    themeBorder: "#93C5FD",
    themeBadge: "bg-blue-100 text-blue-800 border-blue-300",
    themeButton: "bg-blue-600 hover:bg-blue-700 text-white",
    iconName: "GraduationCap",
    assessmentType: "marks-with-streams",
    marksEntryEnabled: true,
    description: {
      en: "Specialized academic streams in Science, Commerce, and Arts with HSC Board guidance, competitive entrance exam coaching (MHT-CET, NEET, JEE), and career counseling.",
      mr: "विज्ञान, वाणिज्य व कला शाखांचे शिक्षण, १२ वी HSC बोर्ड मार्गदर्शन आणि MHT-CET, NEET, JEE स्पर्धा परीक्षा मार्गदर्शन केंद्र.",
      hi: "विज्ञान, वाणिज्य एवं कला संकायों में विशिष्ट शिक्षा, 12वीं HSC बोर्ड मार्गदर्शन तथा MHT-CET, NEET, JEE प्रतियोगी परीक्षा मार्गदर्शन।"
    },
    features: {
      en: [
        "Stream Selection: Science, Commerce, and Arts",
        "HSC Board Practical & Written Examination Center",
        "Entrance Exam Cell (MHT-CET, NEET, JEE, CUET)",
        "Well-Equipped Physics, Chemistry & Biology Labs",
        "Alumni Mentorship & Career Guidance Webinars"
      ],
      mr: [
        "शाखा निवड: विज्ञान, वाणिज्य आणि कला",
        "१२ वी HSC बोर्ड प्रात्यक्षिक व लेखी परीक्षा केंद्र",
        "प्रवेश परीक्षा कक्ष (MHT-CET, NEET, JEE, CUET)",
        "भौतिकशास्त्र, रसायनशास्त्र व जीवशास्त्र प्रयोगशाळा",
        "माजी विद्यार्थी मार्गदर्शन व करिअर कार्यशाळा"
      ],
      hi: [
        "संकाय विकल्प: विज्ञान, वाणिज्य एवं कला",
        "12वीं HSC बोर्ड प्रायोगिक एवं लिखित परीक्षा केंद्र",
        "प्रतियोगी परीक्षा प्रकोष्ठ (MHT-CET, NEET, JEE, CUET)",
        "सुसज्जित भौतिक, रसायन एवं जीव विज्ञान प्रयोगशालाएं",
        "पूर्व छात्र परामर्श एवं करियर मार्गदर्शन सत्र"
      ]
    },
    subjects: [
      { id: "sub-h-phy", nameEn: "Physics", stream: "science", code: "PHY-11" },
      { id: "sub-h-chem", nameEn: "Chemistry", stream: "science", code: "CHM-11" },
      { id: "sub-h-math", nameEn: "Mathematics & Statistics", stream: "science", code: "MTH-11" },
      { id: "sub-h-bio", nameEn: "Biology", stream: "science", code: "BIO-11" },
      { id: "sub-h-acc", nameEn: "Book-keeping & Accountancy", stream: "commerce", code: "ACC-11" },
      { id: "sub-h-eco", nameEn: "Economics", stream: "commerce", code: "ECO-11" },
      { id: "sub-h-ocm", nameEn: "Organization of Commerce & Management", stream: "commerce", code: "OCM-11" },
      { id: "sub-h-hist", nameEn: "History", stream: "arts", code: "HST-11" },
      { id: "sub-h-pol", nameEn: "Political Science", stream: "arts", code: "POL-11" },
      { id: "sub-h-eng", nameEn: "English", stream: "common", code: "ENG-11" }
    ]
  }
];

// Normalize language code ('mr-IN' -> 'mr', 'hi-IN' -> 'hi', etc.)
const normalizeLang = (lang) => {
  if (!lang) return 'en';
  if (lang.startsWith('mr')) return 'mr';
  if (lang.startsWith('hi')) return 'hi';
  return 'en';
};

// Helper functions for easy reference
const getSectionById = (sectionId) => SECTIONS_CONFIG.find(s => s.id === sectionId);

const getSectionByClass = (classNum) => {
  const num = parseInt(classNum, 10);
  if (num >= 1 && num <= 4) return SECTIONS_CONFIG[0];
  if (num >= 5 && num <= 10) return SECTIONS_CONFIG[1];
  if (num >= 11 && num <= 12) return SECTIONS_CONFIG[2];
  return null;
};

const getSectionName = (section, lang = 'en') => {
  if (!section) return '';
  const l = normalizeLang(lang);
  if (typeof section.name === 'object' && section.name !== null) {
    return section.name[l] || section.name.en || section.nameEn || '';
  }
  if (l === 'mr') return section.nameMr || section.nameEn || '';
  if (l === 'hi') return section.nameHi || section.nameEn || '';
  return section.nameEn || section.name || '';
};

const getSectionDescription = (section, lang = 'en') => {
  if (!section) return '';
  const l = normalizeLang(lang);
  if (typeof section.description === 'object' && section.description !== null) {
    return section.description[l] || section.description.en || '';
  }
  return section.description || '';
};

const getSectionSchoolName = (section, lang = 'en') => {
  if (!section) return '';
  const l = normalizeLang(lang);
  if (typeof section.schoolName === 'object' && section.schoolName !== null) {
    return section.schoolName[l] || section.schoolName.en || '';
  }
  return section.schoolName || '';
};

const getSectionClasses = (section, lang = 'en') => {
  if (!section) return [];
  const l = normalizeLang(lang);
  if (section.classList && section.classList[l]) {
    return section.classList[l];
  }
  return section.classList?.en || section.classList || [];
};

const getClassLabel = (classNum, lang = 'en') => {
  const l = normalizeLang(lang);
  const num = parseInt(classNum, 10);
  if (l === 'mr') return `इयत्ता ${num} वी`;
  if (l === 'hi') return `कक्षा ${num}`;
  return `Class ${num}`;
};

const getSectionShortName = (section, lang = 'en') => {
  if (!section) return '';
  const l = normalizeLang(lang);
  if (typeof section.shortName === 'object' && section.shortName !== null) {
    return section.shortName[l] || section.shortName.en || '';
  }
  return section.shortName || '';
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SECTIONS_CONFIG,
    getSectionById,
    getSectionByClass,
    getSectionName,
    getSectionShortName,
    getSectionDescription,
    getSectionSchoolName,
    getSectionClasses,
    getClassLabel
  };
}

export {
  SECTIONS_CONFIG,
  getSectionById,
  getSectionByClass,
  getSectionName,
  getSectionShortName,
  getSectionDescription,
  getSectionSchoolName,
  getSectionClasses,
  getClassLabel
};
export default SECTIONS_CONFIG;
