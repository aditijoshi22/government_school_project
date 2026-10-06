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
 * Edit `schoolName` / `schoolShortName` / `schoolLevel` to change what the website shows.
 */

const SECTIONS_CONFIG = [
  {
    id: "pre-primary",
    udiseCode: "27140407303",
    schoolName: "Adarsh V.J.N.T. Primary Ashram School",
    schoolShortName: "Adarsh Primary Ashram School",
    schoolLevel: "Primary School",
    nameEn: "Pre-Primary Section",
    nameMr: "पूर्व-प्राथमिक विभाग",
    nameHi: "पूर्व-प्राथमिक विभाग",
    shortName: "Pre-Primary",
    classes: [1, 2, 3, 4],
    classList: ["Class 1", "Class 2", "Class 3", "Class 4"],
    sectionHead: "Smt. Sunita R. Patil",
    sectionHeadRole: "Section Head (Class 1-4)",
    themeColor: "#F59E0B", // Soft Amber / Warm Orange
    themeBg: "#FFFBEB",
    themeBorder: "#FCD34D",
    themeBadge: "bg-amber-100 text-amber-800 border-amber-300",
    themeButton: "bg-amber-500 hover:bg-amber-600 text-white",
    iconName: "Sparkles",
    assessmentType: "grade-based", // "grade-based" | "marks" | "marks-with-streams"
    marksEntryEnabled: false,
    description: "Nurturing curiosity, foundational literacy, numeracy, creative expression, and social skills in a cheerful environment.",
    features: [
      "Activity & Play-based Learning",
      "Descriptive Grade Reports (A/B/C)",
      "Daily Rhymes, Storytelling & Art",
      "Regular Parent-Teacher Interaction",
      "Nutrition & Physical Health Care"
    ],
    subjects: [
      { id: "sub-1-marathi", nameEn: "Marathi (प्रथम भाषा)", code: "MAR-1" },
      { id: "sub-1-english", nameEn: "English (द्वितीय भाषा)", code: "ENG-1" },
      { id: "sub-1-math", nameEn: "Mathematics (गणित)", code: "MATH-1" },
      { id: "sub-1-evs", nameEn: "Environmental Studies (परिसर अभ्यास)", code: "EVS-1" },
      { id: "sub-1-art", nameEn: "Art & Crafts (चित्रकला व हस्तकला)", code: "ART-1" },
      { id: "sub-1-sports", nameEn: "Physical Education (शारीरिक शिक्षण)", code: "PE-1" }
    ],
    skills: [
      "Reading Comprehension (वाचन)",
      "Handwriting & Composition (लेखन)",
      "Basic Numeracy & Counting (संख्याज्ञान)",
      "Creative Art & Music (कला व संगीत)",
      "Sports & Physical Fitness (क्रीडा)",
      "Social Habits & Discipline (शिस्त व सवयी)"
    ]
  },
  {
    id: "primary",
    udiseCode: "27140407302",
    schoolName: "Shri Shivajirao Moghe V.J.N.T. Secondary Ashram School",
    schoolShortName: "Shivajirao Moghe Secondary Ashram School",
    schoolLevel: "Secondary School",
    nameEn: "Primary & Secondary Section",
    nameMr: "प्राथमिक व माध्यमिक विभाग",
    nameHi: "प्राथमिक एवं माध्यमिक विभाग",
    shortName: "Primary (5-10)",
    classes: [5, 6, 7, 8, 9, 10],
    classList: ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
    scholarshipClasses: [5, 8],
    sscClasses: [9, 10],
    sectionHead: "Shri. Gajanan V. Kulkarni",
    sectionHeadRole: "Section Head (Class 5-10)",
    themeColor: "#10B981", // Emerald Green / Teal
    themeBg: "#ECFDF5",
    themeBorder: "#6EE7B7",
    themeBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
    themeButton: "bg-emerald-600 hover:bg-emerald-700 text-white",
    iconName: "BookOpen",
    assessmentType: "marks",
    marksEntryEnabled: true,
    description: "Comprehensive state board curriculum with specialized coaching for Class 5 & 8 Scholarship exams and Class 10 SSC Board excellence.",
    features: [
      "Unit Tests, Semester & Board Examinations",
      "Class 5 & 8 State Scholarship Exam Guidance",
      "Class 10 SSC Board Exam Preparation & Hall Ticket Desk",
      "Science & Computer Lab Practical Training",
      "Sports, NMMS & Quiz Competitions"
    ],
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
    schoolName: "Late Mohan Chavan VJNT Art and Science Junior College",
    schoolShortName: "Mohan Chavan Junior College",
    schoolLevel: "Junior College",
    nameEn: "Higher Secondary Section (Junior College)",
    nameMr: "उच्च माध्यमिक विभाग (कनिष्ठ महाविद्यालय)",
    nameHi: "उच्च माध्यमिक विभाग (कनिष्ठ महाविद्यालय)",
    shortName: "High School (11-12)",
    classes: [11, 12],
    classList: ["Class 11", "Class 12"],
    streams: [
      {
        id: "science",
        nameEn: "Science Stream (विज्ञान शाखा)",
        subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Marathi/IT"]
      },
      {
        id: "commerce",
        nameEn: "Commerce Stream (वाणिज्य शाखा)",
        subjects: ["Accountancy", "Economics", "Organization of Commerce", "Secretarial Practice", "English", "Marathi/IT"]
      },
      {
        id: "arts",
        nameEn: "Arts Stream (कला शाखा)",
        subjects: ["History", "Political Science", "Geography", "Sociology", "English", "Marathi"]
      }
    ],
    hscClass: 12,
    sectionHead: "Dr. Anil K. Shinde",
    sectionHeadRole: "Vice Principal & Junior College Head",
    themeColor: "#2563EB", // Royal Blue
    themeBg: "#EFF6FF",
    themeBorder: "#93C5FD",
    themeBadge: "bg-blue-100 text-blue-800 border-blue-300",
    themeButton: "bg-blue-600 hover:bg-blue-700 text-white",
    iconName: "GraduationCap",
    assessmentType: "marks-with-streams",
    marksEntryEnabled: true,
    description: "Specialized academic streams in Science, Commerce, and Arts with HSC Board guidance, competitive entrance exam coaching (MHT-CET, NEET, JEE), and career counseling.",
    features: [
      "Stream Selection: Science, Commerce, and Arts",
      "HSC Board Practical & Written Examination Center",
      "Entrance Exam Cell (MHT-CET, NEET, JEE, CUET)",
      "Well-Equipped Physics, Chemistry & Biology Labs",
      "Alumni Mentorship & Career Guidance Webinars"
    ],
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

// Helper functions for easy reference
const getSectionById = (sectionId) => SECTIONS_CONFIG.find(s => s.id === sectionId);
const getSectionByClass = (classNum) => {
  const num = parseInt(classNum, 10);
  if (num >= 1 && num <= 4) return SECTIONS_CONFIG[0];
  if (num >= 5 && num <= 10) return SECTIONS_CONFIG[1];
  if (num >= 11 && num <= 12) return SECTIONS_CONFIG[2];
  return null;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SECTIONS_CONFIG,
    getSectionById,
    getSectionByClass
  };
}

export { SECTIONS_CONFIG, getSectionById, getSectionByClass };
export default SECTIONS_CONFIG;
