/**
 * School General Configuration - Single Source of Truth
 * Non-technical staff can update basic details here.
 */
const schoolConfig = {
  // Project / portal name shown in the header, hero, footer and browser tab
  projectName: "Shiksha Sahayak - School Information and Management",
  projectShortName: "Shiksha Sahayak",
  projectTagline: "School Information and Management",
  name: "Zilla Parishad High School & Junior College",
  nameMarathi: "जिल्हा परिषद उच्च शाळा व कनिष्ठ महाविद्यालय",
  nameHindi: "जिला परिषद उच्च विद्यालय एवं कनिष्ठ महाविद्यालय",
  shortName: "ZPHS Anjangaon",
  // Each school has its own UDISE code - see shared/sections.config.js
  medium: "Marathi / Semi-English",
  establishedYear: "1965",
  principal: {
    name: "Mrs. Sunanda Kanake",
    nameMarathi: "श्रीमती सुनंदा कणके",
    nameHindi: "श्रीमती सुनंदा कणके",
    qualification: "D.Ed., B.Ed. (English)",
    qualificationMarathi: "डी.एड., बी.एड. (इंग्रजी)",
    qualificationHindi: "डी.एड., बी.एड. (अंग्रेजी)",
    designation: "Principal",
    designationMarathi: "मुख्याध्यापिका",
    designationHindi: "प्रधानाचार्या",
    experience: "20+ Years in Educational Administration & Teaching",
    experienceMarathi: "शैक्षणिक प्रशासन व अध्यापनाचा २०+ वर्षांचा अनुभव",
    experienceHindi: "शैक्षणिक प्रशासन एवं अध्यापन का २०+ वर्षों का अनुभव",
    message: "Welcome to our school. We are dedicated to nurturing young minds with quality education, moral values, and modern skills to empower every student for a bright future.",
    messageMarathi: "आमच्या शाळेमध्ये आपले सहर्ष स्वागत. प्रत्येक विद्यार्थ्याला दर्जेदार शिक्षण, उच्च नैतिक संस्कार व आधुनिक कौशल्यांसह घडवून त्यांचे उज्ज्वल भविष्य निर्माण करण्यासाठी आम्ही कटिबद्ध आहोत.",
    messageHindi: "हमारे विद्यालय में आपका हार्दिक स्वागत है। प्रत्येक विद्यार्थी को गुणवत्तापूर्ण शिक्षा, नैतिक संस्कार और आधुनिक कौशल प्रदान कर उनके स्वर्णिम भविष्य के निर्माण हेतु हम समर्पित हैं।",
    photo: "/assets/principal.jpg"
  },
  contact: {
    address: "Wadgaon, Tq. Digras, Dist. Yavatmal",
    phone: "+91 721 2345678",
    altPhone: "+91 94228 12345",
    email: "adarshvjnt@gmail.com",
    officeHours: "Monday to Saturday: 9:30 AM - 5:00 PM",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Wadgaon,+Digras,+Yavatmal,+Maharashtra&output=embed"
  },
  sponsorship: {
    text: "Website sponsored & maintained by Web Technology Department, Government Polytechnic & Engineering Team",
    shortText: "Sponsored by CP Web Tech Team",
    year: "2026"
  },
  social: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com"
  },
  logoUrl: "/assets/school-logo.jpeg",
  stats: {
    totalStudents: 1280,
    totalTeachers: 48,
    passPercentage: "98.4%",
    classrooms: 32,
    computerLabs: 2,
    scienceLabs: 3
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = schoolConfig;
}

export default schoolConfig;
