/**
 * School General Configuration - Single Source of Truth
 * Non-technical staff can update basic details here.
 */
const schoolConfig = {
  name: "Zilla Parishad High School & Junior College",
  nameMarathi: "जिल्हा परिषद उच्च शाळा व कनिष्ठ महाविद्यालय",
  nameHindi: "जिला परिषद उच्च विद्यालय एवं कनिष्ठ महाविद्यालय",
  shortName: "ZPHS Anjangaon",
  udiseCode: "27070100105",
  board: "Maharashtra State Board of Secondary and Higher Secondary Education",
  boardShort: "MSBSHSE (Pune)",
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
    address: "Station Road, Near Tehsil Office, Anjangaon Surji, District Amravati, Maharashtra - 444705",
    addressMarathi: "स्टेशन रोड, तहसील कार्यालयाजवळ, अंजनगाव सुर्जी, जिल्हा अमरावती, महाराष्ट्र - ४४४७०५",
    phone: "+91 721 2345678",
    altPhone: "+91 94228 12345",
    email: "zphs.anjangaon@mahaschool.gov.in",
    altEmail: "principal.zphs.anjangaon@gmail.com",
    officeHours: "Monday to Saturday: 9:30 AM - 5:00 PM",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.585521487654!2d77.309875!3d21.161111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA5JzQwLjAiTiA3N8KwMTgnMzUuNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
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
