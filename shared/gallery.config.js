/**
 * Gallery Sections Configuration - Single Source of Truth
 * Defines all school photo gallery categories, multilingual titles, descriptions, and metadata.
 */

const GALLERY_SECTIONS = [
  {
    id: "tree-plantation",
    folder: "tree-plantation",
    name: {
      en: "Tree Plantation",
      mr: "वृक्षारोपण",
      hi: "वृक्षारोपण"
    },
    title: {
      en: "Tree Plantation & Eco-Club Drive",
      mr: "वृक्षारोपण व हरित शाळा अभियान",
      hi: "वृक्षारोपण एवं हरित विद्यालय अभियान"
    },
    description: {
      en: "Students and teachers actively planting saplings to create a lush, sustainable, and eco-friendly green school campus.",
      mr: "शाळा परिसर हरित व पर्यावरणपूरक बनवण्यासाठी शिक्षक व विद्यार्थ्यांनी केलेले वृक्षारोपण.",
      hi: "विद्यालय परिसर को हरा-भरा और पर्यावरण अनुकूल बनाने हेतु शिक्षकों एवं छात्रों द्वारा किया गया सघन पौधरोपण अभियान।"
    },
    coverImage: "/assets/school-images/tree-plantation/WhatsApp Image 2026-09-12 at 12.14.43 PM (1).jpeg",
    date: "2026-07-05",
    themeColor: "#16a34a",
    iconName: "Sprout"
  },
  {
    id: "annual-gathering",
    folder: "annual-gathering",
    name: {
      en: "Annual Gathering",
      mr: "वार्षिक स्नेहसंमेलन",
      hi: "वार्षिक स्नेह सम्मेलन"
    },
    title: {
      en: "Annual Gathering & Cultural Festival",
      mr: "वार्षिक स्नेहसंमेलन व सांस्कृतिक महोत्सव",
      hi: "वार्षिक स्नेह सम्मेलन एवं सांस्कृतिक महोत्सव"
    },
    description: {
      en: "Vibrant traditional dance, folk music, drama, and colorful stage performances celebrating student talent.",
      mr: "वार्षिक स्नेहसंमेलनात विद्यार्थ्यांनी सादर केलेली पारंपरिक नृत्ये, संगीत, नाट्य व लोककलांची रंगतदार मेजवानी.",
      hi: "वार्षिक समारोह में विद्यार्थियों द्वारा प्रस्तुत मनमोहक लोकनृत्य, संगीत, नाटक एवं विविध सांस्कृतिक प्रस्तुतियां।"
    },
    coverImage: "/assets/school-images/annual-gathering/Classical Dance Performance on a Decorated Stage.png",
    date: "2026-01-20",
    themeColor: "#d97706",
    iconName: "Sparkles"
  },
  {
    id: "sports-yoga",
    folder: "sports-yoga",
    name: {
      en: "Sports & Yoga",
      mr: "क्रीडा व योग",
      hi: "खेल एवं योग"
    },
    title: {
      en: "Annual Sports Meet & International Yoga Day",
      mr: "वार्षिक क्रीडा स्पर्धा व आंतरराष्ट्रीय योग दिन",
      hi: "वार्षिक खेलकूद प्रतियोगिता एवं अंतर्राष्ट्रीय योग दिवस"
    },
    description: {
      en: "Energetic kabaddi matches, track races, field games, and serene mass yoga meditation for physical and mental wellness.",
      mr: "चुरशीचे कबड्डी सामने, धावण्याच्या शर्यती, मैदानी खेळ आणि आंतरराष्ट्रीय योग दिनी सामूहिक योगाभ्यास व ध्यानसाधना.",
      hi: "रोमांचक कबड्डी प्रतियोगिता, दौड़, मैदानी खेल और अंतर्राष्ट्रीय योग दिवस पर विद्यार्थियों द्वारा सामूहिक योगाभ्यास।"
    },
    coverImage: "/assets/school-images/sports-yoga/Rural Kabaddi Match in Action.png",
    date: "2026-06-21",
    themeColor: "#0284c7",
    iconName: "Trophy"
  },
  {
    id: "rangoli-competition",
    folder: "rangoli-competition",
    name: {
      en: "Rangoli Competition",
      mr: "रांगोळी स्पर्धा",
      hi: "रंगोली प्रतियोगिता"
    },
    title: {
      en: "Traditional Rangoli Art Competition",
      mr: "पारंपरिक रांगोळी स्पर्धा व कला प्रदर्शन",
      hi: "पारंपरिक रंगोली प्रतियोगिता एवं कला प्रदर्शनी"
    },
    description: {
      en: "Intricate, vibrant peacock rangolis, cultural motifs, and social awareness themes crafted by skilled students.",
      mr: "विद्यार्थ्यांनी रेखाटलेल्या कलात्मक मोर, संस्कारभारती, निसर्गचित्रे व सामाजिक प्रबोधनपर नयनरम्य रांगोळ्या.",
      hi: "छात्रों द्वारा बनाई गई मनमोहक मोर रंगोली, प्रकृति और सामाजिक जागरूकता संदेश देने वाली सुंदर रंगोलियां।"
    },
    coverImage: "/assets/school-images/rangoli-competition/WhatsApp Image 2026-09-12 at 12.14.58 PM (1).jpeg",
    date: "2025-11-14",
    themeColor: "#db2777",
    iconName: "Palette"
  },
  {
    id: "old-memories",
    folder: "old-memories",
    name: {
      en: "Old Memories",
      mr: "सुवर्ण आठवणी",
      hi: "स्वर्णिम स्मृतियां"
    },
    title: {
      en: "School Heritage & Golden Memories",
      mr: "शाळेच्या सुवर्ण आठवणी व गौरव गाथा",
      hi: "विद्यालय की स्वर्णिम स्मृतियां एवं गौरव गाथा"
    },
    description: {
      en: "Historic milestones, alumni reunions, dignitary visits, and nostalgic archival memories spanning six decades.",
      mr: "शाळेच्या ६०+ वर्षांच्या समृद्ध वाटचालीतील ऐतिहासिक क्षण, माजी विद्यार्थी संमेलन, मान्यवरांच्या भेटी व पारितोषिक वितरण सोहळे.",
      hi: "विद्यालय की 60+ वर्षों की ऐतिहासिक यात्रा, पूर्व छात्र सम्मेलन, विशिष्ट अतिथियों के दौरे एवं गौरवशाली स्मृतियां।"
    },
    coverImage: "/assets/school-images/old-memories/WhatsApp Image 2026-10-10 at 12.32.11 PM.jpeg",
    date: "2025-12-25",
    themeColor: "#7c3aed",
    iconName: "History"
  },
  {
    id: "science-exhibition",
    folder: "science-exhibition",
    name: {
      en: "Science Exhibition",
      mr: "विज्ञान प्रदर्शन",
      hi: "विज्ञान प्रदर्शनी"
    },
    title: {
      en: "Science Exhibition & Innovation Fair",
      mr: "विज्ञान प्रदर्शन व नाविन्यपूर्ण प्रकल्प मेळावा",
      hi: "विज्ञान प्रदर्शनी एवं नवाचार मेला"
    },
    description: {
      en: "Working scientific prototypes, solar energy projects, hydraulic cranes, and eco-innovations demonstrated by students.",
      mr: "विद्यार्थ्यांनी साकारलेले सौरऊर्जा प्रकल्प, हायड्रॉलिक मॉडेल्स, जलव्यवस्थापन व वैज्ञानिक प्रयोगांचे थेट सादरीकरण.",
      hi: "विद्यार्थियों द्वारा निर्मित सौर ऊर्जा, हाइड्रोलिक क्रेन, जल संरक्षण एवं विज्ञान के कार्यशील मॉडलों का प्रदर्शन।"
    },
    coverImage: "/assets/school-images/science-exhibition/WhatsApp Image 2026-10-10 at 12.32.13 PM.jpeg",
    date: "2026-02-28",
    themeColor: "#059669",
    iconName: "Atom"
  },
  {
    id: "independence-day",
    folder: "independence-day",
    name: {
      en: "Independence Day",
      mr: "स्वातंत्र्य दिन",
      hi: "स्वतंत्रता दिवस"
    },
    title: {
      en: "Independence Day & National Celebrations",
      mr: "स्वातंत्र्य दिन व राष्ट्रीय उत्सव सोहळा",
      hi: "स्वतंत्रता दिवस एवं राष्ट्रीय पर्व समारोह"
    },
    description: {
      en: "Patriotic parade, flag salutation under the Indian Tricolor, marching drills, and youth rallies honoring the nation.",
      mr: "मुख्याध्यापकांच्या हस्ते ध्वजारोहण, तिरंग्यास मानवंदना, शिस्तबद्ध कवायत संचलन आणि देशभक्तीपर प्रभातफेरी सोहळा.",
      hi: "प्रधानाचार्य द्वारा ध्वजारोहण, तिरंगे को राष्ट्रीय सलामी, अनुशासित परेड एवं देशभक्ति प्रभातफेरी समारोह।"
    },
    coverImage: "/assets/school-images/independence-day/School Assembly Under the Indian Tricolor.png",
    date: "2026-08-15",
    themeColor: "#ea580c",
    iconName: "Flag"
  }
];

const normalizeLang = (lang) => {
  if (!lang) return 'en';
  if (lang.startsWith('mr')) return 'mr';
  if (lang.startsWith('hi')) return 'hi';
  return 'en';
};

const getGallerySectionById = (id) => GALLERY_SECTIONS.find(s => s.id === id);

const getGallerySectionName = (section, lang = 'en') => {
  if (!section) return '';
  const l = normalizeLang(lang);
  if (typeof section.name === 'object' && section.name !== null) {
    return section.name[l] || section.name.en || section.name;
  }
  return section.name || '';
};

const getGallerySectionTitle = (section, lang = 'en') => {
  if (!section) return '';
  const l = normalizeLang(lang);
  if (typeof section.title === 'object' && section.title !== null) {
    return section.title[l] || section.title.en || section.title;
  }
  return section.title || '';
};

const getGallerySectionDescription = (section, lang = 'en') => {
  if (!section) return '';
  const l = normalizeLang(lang);
  if (typeof section.description === 'object' && section.description !== null) {
    return section.description[l] || section.description.en || section.description;
  }
  return section.description || '';
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GALLERY_SECTIONS,
    getGallerySectionById,
    getGallerySectionName,
    getGallerySectionTitle,
    getGallerySectionDescription
  };
}

export {
  GALLERY_SECTIONS,
  getGallerySectionById,
  getGallerySectionName,
  getGallerySectionTitle,
  getGallerySectionDescription
};
export default GALLERY_SECTIONS;
