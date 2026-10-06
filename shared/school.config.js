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
    name: "Shri. Rajeshwar M. Deshmukh",
    qualification: "M.Sc. (Physics), M.Ed.",
    experience: "24 Years in Educational Administration",
    message: "Welcome to Zilla Parishad High School & Junior College, Anjangaon. Our institution is dedicated to nurturing young minds with quality education, moral values, and modern skills to empower students from all walks of life.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
  },
  contact: {
    address: "Wadgaon, Tq. Digras, Dist. Yavatmal",
    phone: "+91 721 2345678",
    altPhone: "+91 94228 12345",
    email: "vjnt@gmail.com",
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
  logoUrl: "/assets/school-logo.svg",
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
