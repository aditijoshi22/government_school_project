import bcrypt from 'bcryptjs';
import db, { initDatabase } from './db.js';
import { SECTIONS_CONFIG } from '../shared/sections.config.js';

console.log('🌱 Starting database seeding process with full Marathi & Hindi multilingual support...');

initDatabase();

// Clear existing data
const tables = [
  'users', 'sections', 'classes', 'divisions', 'subjects', 'students',
  'teachers', 'teacher_assignments', 'notices', 'timetable', 'syllabus',
  'exams', 'results', 'progress_reports', 'attendance', 'homework',
  'admissions', 'gallery_albums', 'gallery_images', 'events', 'enquiries', 'downloads',
  'facilities', 'schemes'
];

tables.forEach(table => {
  try {
    db.prepare(`DELETE FROM ${table}`).run();
    db.prepare(`DELETE FROM sqlite_sequence WHERE name='${table}'`).run();
  } catch (e) {
    // Table may be freshly created
  }
});

console.log('🧹 Cleared previous table contents.');

// Password hashes
const salt = bcrypt.genSaltSync(10);
const adminPass = bcrypt.hashSync('admin123', salt);
const teacherPass = bcrypt.hashSync('teacher123', salt);
const studentPass = bcrypt.hashSync('student123', salt);

// 1. Seed Users
const insertUser = db.prepare(`
  INSERT INTO users (username, email, password_hash, role, section_id)
  VALUES (?, ?, ?, ?, ?)
`);

const usersData = [
  { username: 'admin', email: 'admin@mahaschool.gov.in', pass: adminPass, role: 'super_admin', section: null },
  { username: 'admin_primary', email: 'primary@mahaschool.gov.in', pass: adminPass, role: 'section_admin', section: 'primary' },
  { username: 'admin_secondary', email: 'secondary@mahaschool.gov.in', pass: adminPass, role: 'section_admin', section: 'secondary' },
  { username: 'admin_highschool', email: 'highschool@mahaschool.gov.in', pass: adminPass, role: 'section_admin', section: 'high-school' },
  { username: 'teacher_sunita', email: 'sunita.patil@mahaschool.gov.in', pass: teacherPass, role: 'teacher', section: 'primary' },
  { username: 'teacher_gajanan', email: 'gajanan.kulkarni@mahaschool.gov.in', pass: teacherPass, role: 'teacher', section: 'secondary' },
  { username: 'teacher_anil', email: 'anil.shinde@mahaschool.gov.in', pass: teacherPass, role: 'teacher', section: 'high-school' },
  { username: 'student_aarav', email: 'aarav.sharma@parent.com', pass: studentPass, role: 'student_parent', section: 'primary' },
  { username: 'student_ananya', email: 'ananya.deshmukh@parent.com', pass: studentPass, role: 'student_parent', section: 'secondary' },
  { username: 'student_rohit', email: 'rohit.patil@student.com', pass: studentPass, role: 'student_parent', section: 'high-school' }
];

usersData.forEach(u => {
  insertUser.run(u.username, u.email, u.pass, u.role, u.section);
});

console.log('✅ Seeded Users');

// 2. Seed Sections
const insertSection = db.prepare(`
  INSERT INTO sections (id, name_en, name_mr, name_hi, assessment_type, theme_color)
  VALUES (?, ?, ?, ?, ?, ?)
`);

SECTIONS_CONFIG.forEach(s => {
  insertSection.run(s.id, s.nameEn, s.nameMr, s.nameHi, s.assessmentType, s.themeColor);
});

// 3. Seed Classes & Divisions
const insertClass = db.prepare(`INSERT INTO classes (section_id, class_number, class_name, stream) VALUES (?, ?, ?, ?)`);
const insertDivision = db.prepare(`INSERT INTO divisions (class_id, name) VALUES (?, ?)`);

for (let c = 1; c <= 12; c++) {
  let secId = c <= 4 ? 'primary' : c <= 10 ? 'secondary' : 'high-school';
  let streams = c >= 11 ? ['science', 'commerce', 'arts'] : ['none'];
  
  streams.forEach(stream => {
    let nameStr = `Class ${c}` + (stream !== 'none' ? ` (${stream.toUpperCase()})` : '');
    const res = insertClass.run(secId, c, nameStr, stream);
    const classId = res.lastInsertRowid;
    
    ['A', 'B'].forEach(divName => {
      insertDivision.run(classId, divName);
    });
  });
}

console.log('✅ Seeded Classes & Divisions');

// 4. Seed Subjects
const insertSubject = db.prepare(`
  INSERT INTO subjects (id, section_id, class_number, stream, code, name_en, name_mr, total_marks, passing_marks)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

SECTIONS_CONFIG.forEach(sec => {
  sec.subjects.forEach(sub => {
    insertSubject.run(
      sub.id,
      sec.id,
      sec.classes[0],
      sub.stream || 'common',
      sub.code,
      sub.nameEn,
      sub.nameEn,
      100,
      35
    );
  });
});

console.log('✅ Seeded Subjects');

// 5. Seed Teachers & Teacher Assignments
const insertTeacher = db.prepare(`
  INSERT INTO teachers (user_id, employee_id, full_name, designation, designation_en, designation_mr, designation_hi, qualification, qualification_en, qualification_mr, qualification_hi, phone, email, photo, department, department_en, department_mr, department_hi, section_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const teachersList = [
  {
    userId: 5, empId: 'EMP-001', name: 'Smt. Sunita R. Patil',
    desigEn: 'Primary Assistant Teacher', desigMr: 'प्राथमिक उपशिक्षिका', desigHi: 'प्राथमिक सहायक शिक्षिका',
    qualEn: 'B.A., D.T.Ed.', qualMr: 'बी.ए., डी.टी.एड.', qualHi: 'बी.ए., डी.टी.एड.',
    phone: '+91 98221 11223', email: 'sunita.patil@mahaschool.gov.in',
    deptEn: 'Languages & Foundational Art', deptMr: 'भाषा व कला विभाग', deptHi: 'भाषा एवं कला विभाग',
    sec: 'primary'
  },
  {
    userId: 6, empId: 'EMP-002', name: 'Shri. Gajanan V. Kulkarni',
    desigEn: 'Senior Secondary Teacher & Scholarship Guide', desigMr: 'माध्यमिक पदवीधर शिक्षक व शिष्यवृत्ती मार्गदर्शक', desigHi: 'वरिष्ठ माध्यमिक शिक्षक एवं छात्रवृत्ति मार्गदर्शक',
    qualEn: 'M.Sc. (Maths), B.Ed.', qualMr: 'एम.एस्सी. (गणित), बी.एड.', qualHi: 'एम.एससी. (गणित), बी.एड.',
    phone: '+91 94234 55667', email: 'gajanan.kulkarni@mahaschool.gov.in',
    deptEn: 'Mathematics & Science', deptMr: 'गणित व विज्ञान विभाग', deptHi: 'गणित एवं विज्ञान विभाग',
    sec: 'secondary'
  },
  {
    userId: 7, empId: 'EMP-003', name: 'Dr. Anil K. Shinde',
    desigEn: 'Vice Principal & Junior College Lecturer', desigMr: 'उपमुख्याध्यापक व कनिष्ठ महाविद्यालय प्राध्यापक', desigHi: 'उप-प्रधानाचार्य एवं कनिष्ठ महाविद्यालय प्रवक्ता',
    qualEn: 'Ph.D. (Physics), M.Ed.', qualMr: 'पीएच.डी. (भौतिकशास्त्र), एम.एड.', qualHi: 'पीएच.डी. (भौतिक विज्ञान), एम.एड.',
    phone: '+91 97654 33221', email: 'anil.shinde@mahaschool.gov.in',
    deptEn: 'Physics & Higher Secondary Science', deptMr: 'भौतिकशास्त्र विभाग', deptHi: 'भौतिक विज्ञान संकाय',
    sec: 'high-school'
  }
];

teachersList.forEach(t => {
  insertTeacher.run(
    t.userId, t.empId, t.name,
    t.desigEn, t.desigEn, t.desigMr, t.desigHi,
    t.qualEn, t.qualEn, t.qualMr, t.qualHi,
    t.phone, t.email,
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    t.deptEn, t.deptEn, t.deptMr, t.deptHi,
    t.sec
  );
});

const insertAssignment = db.prepare(`
  INSERT INTO teacher_assignments (teacher_id, section_id, class_number, division_name, subject_id)
  VALUES (?, ?, ?, ?, ?)
`);
insertAssignment.run(1, 'primary', 3, 'A', 'sub-1-marathi');
insertAssignment.run(1, 'primary', 3, 'A', 'sub-1-math');
insertAssignment.run(2, 'secondary', 8, 'A', 'sub-p-math');
insertAssignment.run(2, 'secondary', 8, 'A', 'sub-p-science');
insertAssignment.run(3, 'high-school', 12, 'A', 'sub-h-phy');

// 6. Seed Students
const insertStudent = db.prepare(`
  INSERT INTO students (user_id, gr_number, roll_number, first_name, last_name, gender, dob, section_id, class_number, division_name, stream, father_name, mother_name, phone, address, photo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const studentsList = [
  { userId: 8, gr: 'GR-2024-001', roll: 1, fn: 'Aarav', ln: 'Sharma', gender: 'Male', dob: '2017-05-15', sec: 'primary', classNum: 3, div: 'A', stream: 'none', father: 'Ramesh Sharma', mother: 'Priya Sharma', phone: '+91 98901 23456', addr: 'Near Maruti Temple, Wadgaon' },
  { userId: 9, gr: 'GR-2021-045', roll: 12, fn: 'Ananya', ln: 'Deshmukh', gender: 'Female', dob: '2012-08-20', sec: 'secondary', classNum: 8, div: 'A', stream: 'none', father: 'Vijay Deshmukh', mother: 'Sunita Deshmukh', phone: '+91 98902 34567', addr: 'Station Road, Digras' },
  { userId: 10, gr: 'GR-2019-102', roll: 25, fn: 'Rohit', ln: 'Patil', gender: 'Male', dob: '2008-01-10', sec: 'high-school', classNum: 12, div: 'A', stream: 'science', father: 'Kashinath Patil', mother: 'Kavitabai Patil', phone: '+91 98903 45678', addr: 'Main Bazar Road, Wadgaon' }
];

studentsList.forEach(s => {
  insertStudent.run(
    s.userId, s.gr, s.roll, s.fn, s.ln, s.gender, s.dob, s.sec, s.classNum, s.div, s.stream,
    s.father, s.mother, s.phone, s.addr, 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200'
  );
});

console.log('✅ Seeded Students & Teachers');

// 7. Seed Notices
const insertNotice = db.prepare(`
  INSERT INTO notices (title, content, title_en, title_mr, title_hi, content_en, content_mr, content_hi, category, attachment_url, section_id, class_number, is_important)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertNotice.run(
  'Parent-Teacher Meeting for Primary Section',
  'The first term PTM for Class 1 to 4 will be held on Saturday at 10:00 AM in the school hall. Parents are requested to join to discuss progress reports.',
  'Parent-Teacher Meeting for Primary Section',
  'प्राथमिक विभागासाठी पालक-शिक्षक सभा',
  'प्राथमिक विभाग हेतु अभिभावक-शिक्षक बैठक',
  'The first term PTM for Class 1 to 4 will be held on Saturday at 10:00 AM in the school hall. Parents are requested to join to discuss progress reports.',
  'इयत्ता १ ली ते ४ थी साठी प्रथम सत्राची पालक-शिक्षक सभा शनिवारी सकाळी १०:०० वाजता शाळा सभागृहात आयोजित केली आहे. पालकांनी उपस्थित राहावे.',
  'कक्षा 1 से 4 हेतु प्रथम सत्र की अभिभावक-शिक्षक बैठक शनिवार को प्रातः 10:00 बजे विद्यालय सभागार में आयोजित की जाएगी। सभी अभिभावक उपस्थित रहें।',
  'meeting',
  null,
  'primary',
  null,
  1
);

insertNotice.run(
  'Class 5 & 8 State Scholarship Examination Form Submission',
  'Forms for the Maharashtra State Pre-Upper Primary (Class 5) and Pre-Secondary (Class 8) Scholarship Exams are now open. Last date for registration is 15th October.',
  'Class 5 & 8 State Scholarship Examination Form Submission',
  'इयत्ता ५ वी व ८ वी पूर्व उच्च प्राथमिक व पूर्व माध्यमिक शिष्यवृत्ती परीक्षा अर्ज',
  'कक्षा 5 एवं 8 राज्य छात्रवृत्ति परीक्षा आवेदन पत्र जमा करने संबंधी सूचना',
  'Forms for the Maharashtra State Pre-Upper Primary (Class 5) and Pre-Secondary (Class 8) Scholarship Exams are now open. Last date for registration is 15th October.',
  'महाराष्ट्र राज्य परीक्षा परिषद आयोजित इयत्ता ५ वी व ८ वी शिष्यवृत्ती परीक्षेचे ऑनलाइन अर्ज भरणे सुरू झाले आहे. अंतिम मुदत १५ ऑक्टोबर आहे.',
  'महाराष्ट्र राज्य परीक्षा परिषद द्वारा आयोजित कक्षा 5 एवं 8 छात्रवृत्ति परीक्षा के ऑनलाइन आवेदन प्रारंभ हो चुके हैं। अंतिम तिथि 15 अक्टूबर है।',
  'exam',
  '/uploads/scholarship_form_notice.pdf',
  'secondary',
  8,
  1
);

insertNotice.run(
  'HSC Board Exam Form Filling Notice (Class 12 Science/Commerce/Arts)',
  'All Class 12 students are instructed to submit their HSC Board Exam forms along with marksheets of Class 10 and 11 to the Junior College Office by 20th October.',
  'HSC Board Exam Form Filling Notice (Class 12 Science/Commerce/Arts)',
  'इयत्ता १२ वी (HSC) बोर्ड परीक्षा अर्ज भरण्याबाबत सूचना',
  'कक्षा 12 (HSC) बोर्ड परीक्षा आवेदन पत्र भरने संबंधी आवश्यक सूचना',
  'All Class 12 students are instructed to submit their HSC Board Exam forms along with marksheets of Class 10 and 11 to the Junior College Office by 20th October.',
  'इयत्ता १२ वी च्या सर्व विद्यार्थ्यांनी आपले एच.एस.सी. बोर्ड परीक्षा अर्ज १० वी व ११ वी गुणपत्रकासह २० ऑक्टोबरपर्यंत कनिष्ठ महाविद्यालय कार्यालयात जमा करावेत.',
  'कक्षा 12 के सभी छात्र अपने एच.एस.सी. बोर्ड परीक्षा प्रपत्र 10वीं व 11वीं की अंकसूची सहित 20 अक्टूबर तक कनिष्ठ महाविद्यालय कार्यालय में जमा करें।',
  'board_exam',
  '/uploads/hsc_exam_instructions.pdf',
  'high-school',
  12,
  1
);

insertNotice.run(
  'Annual Sports & Cultural Week 2026 Announcement',
  'The Annual School Sports Day and Cultural Fest will take place from 14th to 18th November. Inter-section competitions across all 3 sections will be conducted.',
  'Annual Sports & Cultural Week 2026 Announcement',
  'वार्षिक क्रीडा व स्नेहसंमेलन २०२६ जाहीर',
  'वार्षिक खेलकूद एवं सांस्कृतिक सप्ताह 2026 की घोषणा',
  'The Annual School Sports Day and Cultural Fest will take place from 14th to 18th November. Inter-section competitions across all 3 sections will be conducted.',
  'शाळेचे वार्षिक क्रीडा सामने व सांस्कृतिक कार्यक्रम १४ ते १८ नोव्हेंबर दरम्यान पार पडतील. तिन्ही विभागांमधील आंतर-शालेय स्पर्धा आयोजित केल्या जातील.',
  'विद्यालय के वार्षिक खेलकूद एवं सांस्कृतिक कार्यक्रम 14 से 18 नवंबर के बीच आयोजित किए जाएंगे। तीनों विभागों में अंतर-विद्यालयीन प्रतियोगिताएं होंगी।',
  'event',
  null,
  null,
  null,
  0
);

console.log('✅ Seeded Notices');

// 8. Seed Results, Progress Reports, Attendance & Homework
const insertResult = db.prepare(`
  INSERT INTO results (student_id, exam_id, subject_id, subject_name, marks_obtained, max_marks, grade, remarks)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

insertResult.run(2, 1, 'sub-p-marathi', 'Marathi (प्रथम भाषा)', 88, 100, 'A1', 'उत्कृष्ट निबंध व व्याकरण ज्ञान');
insertResult.run(2, 1, 'sub-p-english', 'English', 82, 100, 'A2', 'Very Good vocabulary');
insertResult.run(2, 1, 'sub-p-math', 'Mathematics', 94, 100, 'A1', 'अतिउत्कृष्ट गणितीय समस्या निवारण');
insertResult.run(2, 1, 'sub-p-science', 'Science & Technology', 91, 100, 'A1', 'स्पष्ट संकल्पना समज');

insertResult.run(3, 2, 'sub-h-phy', 'Physics', 85, 100, 'A1', 'Strong grasp of numericals');
insertResult.run(3, 2, 'sub-h-chem', 'Chemistry', 88, 100, 'A1', 'Excellent practical performance');
insertResult.run(3, 2, 'sub-h-math', 'Mathematics & Statistics', 96, 100, 'A1', 'Top scorer in class');
insertResult.run(3, 2, 'sub-h-bio', 'Biology', 90, 100, 'A1', 'Neat diagrams and thorough theory');

const insertProgressReport = db.prepare(`
  INSERT INTO progress_reports (student_id, academic_year, term, reading_grade, writing_grade, numeracy_grade, art_grade, sports_grade, discipline_grade, overall_grade, teacher_remarks)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertProgressReport.run(
  1,
  '2025-2026',
  'First Semester',
  'A (Excellent / उत्कृष्ट)',
  'A (Clean Handwriting / सुवाच्य अक्षर)',
  'B+ (Good Concept / छान संकल्पना)',
  'A+ (Highly Creative / अतिउत्कृष्ट सृजनशीलता)',
  'A (Enthusiastic / उत्साही खेळाडू)',
  'A (Polite & Punctual / नियमित व नम्र)',
  'A (Outstanding / उत्कृष्ट प्रगती)',
  'आरव अभ्यासात अतिशय जिज्ञासू असून चित्रकला व गोष्ट सांगण्यात उत्तम कौशल्य दाखवतो. सहकाऱ्यांशी स्नेहाने वागतो.'
);

// Attendance Seed
const insertAttendance = db.prepare(`
  INSERT INTO attendance (student_id, date, status, section_id, class_number)
  VALUES (?, ?, ?, ?, ?)
`);
for (let d = 1; d <= 5; d++) {
  const dayStr = d < 10 ? `0${d}` : `${d}`;
  insertAttendance.run(1, `2026-10-${dayStr}`, 'present', 'primary', 3);
  insertAttendance.run(2, `2026-10-${dayStr}`, d === 3 ? 'late' : 'present', 'secondary', 8);
  insertAttendance.run(3, `2026-10-${dayStr}`, d === 4 ? 'absent' : 'present', 'high-school', 12);
}

// Homework Seed
const insertHomework = db.prepare(`
  INSERT INTO homework (section_id, class_number, division_name, subject_name, title, description, title_en, title_mr, title_hi, description_en, description_mr, description_hi, due_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
insertHomework.run(
  'primary', 3, 'A', 'Mathematics',
  'Worksheet 4 - Addition & Subtraction', 'Complete exercises on page 42-45 in workbook',
  'Worksheet 4 - Addition & Subtraction', 'कार्यपत्रिका ४ - बेरीज व वजाबाकी सराव', 'कार्यपत्रक 4 - जोड़ एवं घटाव अभ्यास',
  'Complete exercises on page 42-45 in workbook', 'स्वाध्याय पुस्तिकेतील पान क्र. ४२ ते ४५ वरील उदाहरणे सोडवा.', 'अभ्यास पुस्तिका के पृष्ठ 42 से 45 तक के प्रश्न हल करें।',
  '2026-10-15'
);
insertHomework.run(
  'secondary', 8, 'A', 'Science & Technology',
  'Light & Reflection Lab Experiment Writeup', 'Write lab procedure and conclusions in practical notebook',
  'Light & Reflection Lab Experiment Writeup', 'प्रकाश व परावर्तन प्रयोग नोंदवही लेखन', 'प्रकाश एवं परावर्तन प्रयोग आलेखन',
  'Write lab procedure and conclusions in practical notebook', 'प्रयोग वहीत प्रकाशाचे परावर्तन प्रयोगाची कृती व निष्कर्ष नोंदवा.', 'प्रायोगिक पुस्तिका में प्रकाश के परावर्तन का कार्यविधि एवं निष्कर्ष लिखें।',
  '2026-10-18'
);
insertHomework.run(
  'high-school', 12, 'A', 'Physics',
  'Numerical Problems on Wave Optics', 'Solve problems 1 to 15 from textbook Chapter 7',
  'Numerical Problems on Wave Optics', 'तरंग प्रकाशशास्त्र (Wave Optics) गणितीय उदाहरणे', 'तरंग प्रकाशिकी संख्यात्मक प्रश्न हल',
  'Solve problems 1 to 15 from textbook Chapter 7', 'पाठ्यपुस्तकातील प्रकरण ७ मधील उदाहरणे १ ते १५ सोडवा.', 'पाठ्यपुस्तक अध्याय 7 से प्रश्न 1 से 15 तक हल करें।',
  '2026-10-20'
);

console.log('✅ Seeded Homework');

// 9. Seed Admissions
const insertAdmission = db.prepare(`
  INSERT INTO admissions (application_no, applicant_name, gender, dob, parent_name, phone, email, section_id, class_number, stream, previous_school, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertAdmission.run('ADM-2026-001', 'Sarthak Kulkarni', 'Male', '2020-04-10', 'Vilas Kulkarni', '+91 98230 99887', 'vilas@gmail.com', 'primary', 1, 'none', 'Little Angels Nursery', 'approved');
insertAdmission.run('ADM-2026-002', 'Pranjal Patil', 'Female', '2015-09-12', 'Sudhakar Patil', '+91 94225 44332', 'sudhakar@gmail.com', 'secondary', 5, 'none', 'Z.P. Primary School, Surji', 'pending');
insertAdmission.run('ADM-2026-003', 'Vaibhav Shinde', 'Male', '2009-11-25', 'Mahesh Shinde', '+91 97640 11223', 'mahesh@gmail.com', 'high-school', 11, 'science', 'Z.P. High School, Digras', 'approved');

console.log('✅ Seeded Admissions');

// 10. Seed Gallery Albums & Events
const insertAlbum = db.prepare(`INSERT INTO gallery_albums (title, description, title_en, title_mr, title_hi, description_en, description_mr, description_hi, cover_image, section_id, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const insertImage = db.prepare(`INSERT INTO gallery_images (album_id, image_url, caption, caption_en, caption_mr, caption_hi) VALUES (?, ?, ?, ?, ?, ?)`);

const alb1 = insertAlbum.run(
  'Independence Day Celebration 2026',
  'Flag hoisting, parade and patriotic cultural performances by students of all sections.',
  'Independence Day Celebration 2026',
  'स्वातंत्र्य दिन सोहळा २०२६',
  'स्वतंत्रता दिवस समारोह 2026',
  'Flag hoisting, parade and patriotic cultural performances by students of all sections.',
  'ध्वजारोहण, संचलन आणि तिन्ही विभागांतील विद्यार्थ्यांचे देशभक्तीपर सांस्कृतिक कार्यक्रम.',
  'ध्वजारोहण, परेड एवं तीनों विभागों के विद्यार्थियों द्वारा देशभक्ति सांस्कृतिक प्रस्तुतियां।',
  'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800',
  null,
  '2026-08-15'
).lastInsertRowid;
insertImage.run(alb1, 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800', 'Flag hoisting ceremony by Principal', 'Flag hoisting ceremony by Principal', 'मुख्याध्यापकांच्या हस्ते ध्वजारोहण सोहळा', 'प्रधानाचार्य द्वारा ध्वजारोहण समारोह');
insertImage.run(alb1, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', 'Students performing patriotic dance', 'Students performing patriotic dance', 'विद्यार्थ्यांचे देशभक्तीपर समूह नृत्य', 'छात्रों द्वारा देशभक्ति सामूहिक नृत्य');

const alb2 = insertAlbum.run(
  'Science Exhibition & Project Fair',
  'Working models created by Secondary and High School students.',
  'Science Exhibition & Project Fair',
  'वार्षिक विज्ञान प्रदर्शन व प्रकल्प मेळावा',
  'वार्षिक विज्ञान प्रदर्शनी एवं मॉडल मेला',
  'Working models created by Secondary and High School students.',
  'माध्यमिक व उच्च माध्यमिक विभागातील विद्यार्थ्यांनी साकारलेले नाविन्यपूर्ण विज्ञान प्रकल्प व प्रतिकृती.',
  'माध्यमिक एवं उच्च माध्यमिक विद्यार्थियों द्वारा निर्मित कार्यशील विज्ञान मॉडल।',
  'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&q=80&w=800',
  'high-school',
  '2026-02-28'
).lastInsertRowid;
insertImage.run(alb2, 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&q=80&w=800', 'Robotics and solar model presentation', 'Robotics and solar model presentation', 'रोबोटिक्स व सौरऊर्जा प्रकल्प सादरीकरण', 'रोबोटिक्स एवं सौर ऊर्जा मॉडल प्रस्तुति');

// Seed Events
const insertEvent = db.prepare(`INSERT INTO events (title, description, title_en, title_mr, title_hi, description_en, description_mr, description_hi, event_date, venue, section_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
insertEvent.run(
  'State Level Science Olympiad Prep Workshop',
  'Special intensive coaching session for Class 8 to 10 students.',
  'State Level Science Olympiad Prep Workshop',
  'राज्यस्तरीय विज्ञान ऑलिम्पियाड मार्गदर्शन कार्यशाळा',
  'राज्य स्तरीय विज्ञान ओलंपियाड कार्यशाला',
  'Special intensive coaching session for Class 8 to 10 students.',
  'इयत्ता ८ वी ते १० वी च्या विद्यार्थ्यांसाठी विज्ञान ऑलिम्पियाड व स्पर्धा परीक्षांचे विशेष मार्गदर्शन व सराव कार्यशाळा.',
  'कक्षा 8 से 10 के छात्रों के लिए विज्ञान ओलंपियाड एवं प्रतियोगी परीक्षा मार्गदर्शन कार्यशाला।',
  '2026-10-12',
  'School Auditorium',
  'secondary',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800'
);
insertEvent.run(
  'Career Counseling & Entrance Exam Seminar',
  'Guidance on MHT-CET, NEET, JEE and CUET for Class 11 & 12 Science/Commerce students.',
  'Career Counseling & Entrance Exam Seminar',
  'कारकीर्द मार्गदर्शन व स्पर्धा परीक्षा परिसंवाद',
  'करियर मार्गदर्शन एवं प्रवेश परीक्षा संगोष्ठी',
  'Guidance on MHT-CET, NEET, JEE and CUET for Class 11 & 12 Science/Commerce students.',
  'इयत्ता ११ वी व १२ वी च्या विद्यार्थ्यांसाठी MHT-CET, NEET, JEE व व्यावसायिक अभ्यासक्रम प्रवेश मार्गदर्शन.',
  'कक्षा 11 एवं 12 के विद्यार्थियों हेतु MHT-CET, NEET, JEE प्रवेश परीक्षा मार्गदर्शन सत्र।',
  '2026-10-25',
  'Junior College AV Room',
  'high-school',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
);

console.log('✅ Seeded Gallery & Events');

// 11. Seed Downloads
const insertDownload = db.prepare(`INSERT INTO downloads (title, description, title_en, title_mr, title_hi, description_en, description_mr, description_hi, category, section_id, file_url, file_size) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
insertDownload.run(
  'Transfer Certificate (TC) Application Form',
  'Standard application form to request school leaving / transfer certificate.',
  'Transfer Certificate (TC) Application Form',
  'शाळा सोडल्याचा दाखला (TC) अर्ज प्रपत्र',
  'शाला त्याग प्रमाण पत्र (TC) आवेदन प्रपत्र',
  'Standard application form to request school leaving / transfer certificate.',
  'शाळा सोडल्याचा दाखला मिळण्याबाबतचा विहित नमुन्यातील अर्ज.',
  'शाला त्याग प्रमाण पत्र (टीसी) प्राप्त करने हेतु निर्धारित आवेदन पत्र।',
  'Forms',
  null,
  '/downloads/tc_application_form.pdf',
  '450 KB'
);
insertDownload.run(
  'Bonafide Certificate Request Form',
  'Request form for official student bonafide certificate for scholarship & bus pass.',
  'Bonafide Certificate Request Form',
  'बोनाफाइड प्रमाणपत्र अर्ज',
  'बोनाफाइड प्रमाण पत्र आवेदन प्रपत्र',
  'Request form for official student bonafide certificate for scholarship & bus pass.',
  'शिष्यवृत्ती, बस पास व शासकीय सवलतीसाठी बोनाफाइड दाखला मिळण्याचा अर्ज.',
  'छात्रवृत्ति, बस पास एवं शासकीय लाभों हेतु बोनाफाइड प्रमाण पत्र प्रपत्र।',
  'Forms',
  null,
  '/downloads/bonafide_form.pdf',
  '320 KB'
);
insertDownload.run(
  'Class 5 & 8 Scholarship Practice Question Paper 2026',
  'Model question paper with answer keys for Mahapariksha scholarship exam.',
  'Class 5 & 8 Scholarship Practice Question Paper 2026',
  'इयत्ता ५ वी व ८ वी शिष्यवृत्ती सराव प्रश्नपत्रिका २०२६',
  'कक्षा 5 एवं 8 छात्रवृत्ति अभ्यास प्रश्न पत्र 2026',
  'Model question paper with answer keys for Mahapariksha scholarship exam.',
  'राज्य शिष्यवृत्ती परीक्षेसाठी उत्तरसुचीसह सराव प्रश्नपत्रिका संच.',
  'राज्य छात्रवृत्ति परीक्षा हेतु उत्तर कुंजी सहित मॉडल प्रश्न पत्र सेट।',
  'Exam Papers',
  'primary',
  '/downloads/scholarship_paper_2026.pdf',
  '2.4 MB'
);
insertDownload.run(
  'Class 12 HSC Physics Board Practical Handbook',
  'Official HSC Board practical manual and experiment checklist.',
  'Class 12 HSC Physics Board Practical Handbook',
  'इयत्ता १२ वी (HSC) भौतिकशास्त्र प्रात्यक्षिक पुस्तिका',
  'कक्षा 12 (HSC) भौतिक विज्ञान प्रायोगिक पुस्तिका',
  'Official HSC Board practical manual and experiment checklist.',
  'उच्च माध्यमिक मंडळ मान्यताप्राप्त भौतिकशास्त्र प्रात्यक्षिक प्रयोग नोंदवही.',
  'उच्च माध्यमिक बोर्ड द्वारा अनुमोदित भौतिक विज्ञान प्रायोगिक कार्यपुस्तिका।',
  'Syllabus',
  'high-school',
  '/downloads/hsc_physics_practical.pdf',
  '3.8 MB'
);

// 12. Seed Facilities
const insertFacility = db.prepare(`
  INSERT INTO facilities (title, title_en, title_mr, title_hi, description, description_en, description_mr, description_hi, icon, color, section_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const facilitiesData = [
  {
    titleEn: 'Computer & ICT Lab',
    titleMr: 'संगणक व माहिती तंत्रज्ञान (ICT) लॅब',
    titleHi: 'कंप्यूटर एवं आईसीटी लैब',
    descEn: '30+ high-speed desktop computers with internet connectivity, programming tools, and digital literacy curriculum.',
    descMr: 'इंटरनेट सुविधेसह ३०+ संगणक, कोडिंग साधने आणि डिजिटल साक्षरता अभ्यासक्रम.',
    descHi: 'इंटरनेट युक्त 30+ कंप्यूटर, प्रोग्रामिंग टूल्स और डिजिटल साक्षरता पाठ्यक्रम।',
    icon: 'Monitor',
    color: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900',
    sectionId: null
  },
  {
    titleEn: 'Science Practical Laboratories',
    titleMr: 'विज्ञान प्रयोगशाळा संकुल',
    titleHi: 'विज्ञान प्रयोगशालाएं',
    descEn: 'Fully equipped Physics, Chemistry, and Biology laboratories for High School (Class 11-12) & Secondary practicals.',
    descMr: 'कनिष्ठ महाविद्यालय व माध्यमिक वर्गांसाठी भौतिकशास्त्र, रसायनशास्त्र आणि जीवशास्त्राच्या सुसज्ज प्रयोगशाळा.',
    descHi: 'कनिष्ठ महाविद्यालय एवं माध्यमिक कक्षाओं हेतु भौतिक, रसायन और जीव विज्ञान की सुसज्जित प्रयोगशालाएं।',
    icon: 'FlaskConical',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900',
    sectionId: 'secondary'
  },
  {
    titleEn: 'School Library & Reading Room',
    titleMr: 'ग्रंथालय व वाचन कक्ष',
    titleHi: 'पुस्तकालय एवं वाचनालय',
    descEn: '5,000+ books, reference encyclopedias, competitive exam guides (MHT-CET, NEET, JEE), and Marathi/English newspapers.',
    descMr: '५,०००+ पुस्तके, संदर्भ ग्रंथ, स्पर्धा परीक्षा मार्गदर्शिका (MHT-CET, NEET, JEE) आणि वृत्तपत्रे.',
    descHi: '5,000+ पुस्तकें, संदर्भ ग्रंथ, प्रतियोगी परीक्षा गाइड (MHT-CET, NEET, JEE) और समाचार पत्र।',
    icon: 'BookOpen',
    color: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900',
    sectionId: null
  },
  {
    titleEn: 'Sports Playground & Physical Fitness',
    titleMr: 'क्रीडांगण व शारीरिक शिक्षण',
    titleHi: 'खेल का मैदान एवं शारीरिक शिक्षा',
    descEn: 'Spacious sports ground with Kabaddi court, Volleyball field, Athletics track, and indoor games equipment.',
    descMr: 'कबड्डी मैदान, व्हॉलीबॉल कोर्ट, ॲथलेटिक्स ट्रॅक व इनडोअर खेळांच्या साहित्यासह प्रशस्त क्रीडांगण.',
    descHi: 'कबड्डी, वॉलीबॉल, एथलेटिक्स ट्रैक और इनडोर खेल सामग्री युक्त विशाल मैदान।',
    icon: 'Trophy',
    color: 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900',
    sectionId: null
  },
  {
    titleEn: 'PM POSHAN Mid-Day Meal Hall',
    titleMr: 'पीएम पोषण माध्यान्ह भोजन कक्ष',
    titleHi: 'पीएम पोषण मध्याह्न भोजन कक्ष',
    descEn: 'Clean kitchen and dining area providing hot, hygienic, and nutritious mid-day meals daily to Primary and Secondary students.',
    descMr: 'स्वच्छ स्वयंपाकगृह व भोजन कक्ष; प्राथमिक व माध्यमिक विद्यार्थ्यांना दररोज गरम व सकस आहार.',
    descHi: 'स्वच्छ रसोई और भोजन क्षेत्र; प्राथमिक एवं माध्यमिक छात्रों को प्रतिदिन पौष्टिक गर्म भोजन।',
    icon: 'Utensils',
    color: 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900',
    sectionId: 'primary'
  },
  {
    titleEn: 'Clean Drinking Water & Sanitation',
    titleMr: 'शुद्ध पिण्याचे पाणी व स्वच्छतागृहे',
    titleHi: 'शुद्ध पेयजल एवं स्वच्छता',
    descEn: 'RO purified drinking water stations and clean, separate washrooms for boys, girls, and staff.',
    descMr: 'RO शुद्धीकरण संयंत्र व मुले, मुली व कर्मचाऱ्यांसाठी स्वतंत्र, स्वच्छ स्वच्छतागृहे.',
    descHi: 'आरओ युक्त स्वच्छ पेयजल और छात्र-छात्राओं के लिए पृथक, स्वच्छ प्रसाधन गृह।',
    icon: 'Droplets',
    color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200 dark:border-cyan-900',
    sectionId: null
  }
];

facilitiesData.forEach(f => {
  insertFacility.run(
    f.titleEn, f.titleEn, f.titleMr, f.titleHi,
    f.descEn, f.descEn, f.descMr, f.descHi,
    f.icon, f.color, f.sectionId
  );
});

console.log('✅ Seeded Facilities');

// 13. Seed Schemes
const insertScheme = db.prepare(`
  INSERT INTO schemes (title, title_en, title_mr, title_hi, description, description_en, description_mr, description_hi, tag, tag_en, tag_mr, tag_hi, icon)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const schemesData = [
  {
    titleEn: 'PM POSHAN Mid-Day Meal Scheme',
    titleMr: 'पीएम पोषण माध्यान्ह भोजन योजना',
    titleHi: 'पीएम पोषण मध्याह्न भोजन योजना',
    descEn: 'Free hot, nutritious cooked lunch provided daily to all students from Class 1 to Class 8 to improve nutrition and attendance.',
    descMr: 'इयत्ता १ ते ८ च्या सर्व विद्यार्थ्यांना पोषण स्तर व हजेरी वाढवण्यासाठी दररोज मोफत गरमागरम व सकस आहार दिला जातो.',
    descHi: 'कक्षा 1 से 8 तक के सभी विद्यार्थियों को पोषण एवं उपस्थिति बढ़ाने हेतु प्रतिदिन निःशुल्क गर्म पौष्टिक भोजन प्रदान किया जाता है।',
    tagEn: 'Class 1 to 8', tagMr: 'इयत्ता १ ते ८', tagHi: 'कक्षा 1 से 8',
    icon: 'Utensils'
  },
  {
    titleEn: 'Free Textbook & Uniform Scheme',
    titleMr: 'मोफत पाठ्यपुस्तक व गणवेश योजना',
    titleHi: 'निःशुल्क पाठ्यपुस्तक एवं गणवेश योजना',
    descEn: 'State Government sponsored free NCERT/Balbharati textbooks and two pairs of school uniforms distributed annually to eligible categories.',
    descMr: 'महाराष्ट्र शासनातर्फे सर्व पात्र विद्यार्थ्यांना मोफत बालभारती पाठ्यपुस्तके व दरवर्षी दोन गणवेश जोड्यांचे मोफत वाटप.',
    descHi: 'राज्य सरकार द्वारा सभी पात्र विद्यार्थियों को निःशुल्क बालभारती पाठ्यपुस्तकें एवं प्रतिवर्ष दो जोड़ी विद्यालय गणवेश का वितरण।',
    tagEn: 'All Eligible Students', tagMr: 'सर्व पात्र विद्यार्थी', tagHi: 'सभी पात्र छात्र',
    icon: 'BookOpen'
  },
  {
    titleEn: 'Savitribai Phule Girl Child Scholarship',
    titleMr: 'क्रांतीज्योती सावित्रीबाई फुले कन्या शिष्यवृत्ती',
    titleHi: 'क्रांतिज्योति सावित्रीबाई फुले बालिका छात्रवृत्ति',
    descEn: 'Financial attendance incentive provided to girl students to prevent dropouts and encourage secondary education.',
    descMr: 'मुलींचे शालेय गळतीचे प्रमाण रोखण्यासाठी आणि माध्यमिक शिक्षणास प्रोत्साहन देण्यासाठी विशेष उपस्थिती प्रोत्साहन भत्ता व शिष्यवृत्ती.',
    descHi: 'बालिकाओं के ड्रॉपआउट को रोकने और माध्यमिक शिक्षा को बढ़ावा देने हेतु विशेष उपस्थिति प्रोत्साहन भत्ता व छात्रवृत्ति।',
    tagEn: 'Girl Students', tagMr: 'विद्यार्थिनींसाठी', tagHi: 'छात्राओं हेतु',
    icon: 'Award'
  },
  {
    titleEn: 'Samagra Shiksha Abhiyan',
    titleMr: 'समग्र शिक्षा अभियान',
    titleHi: 'समग्र शिक्षा अभियान',
    descEn: 'Comprehensive central grant for digital classrooms, science laboratory kits, sports equipment, and inclusive special education.',
    descMr: 'डिजिटल वर्गखोल्या, विज्ञान साहित्य किट, क्रीडा साहित्य आणि सर्वसमावेशक विशेष शिक्षणासाठी सर्वंकष शासकीय अनुदान योजना.',
    descHi: 'डिजिटल कक्षाओं, विज्ञान किट, खेलकूद सामग्री एवं समावेशी विशेष शिक्षा हेतु समग्र सरकारी अनुदान योजना।',
    tagEn: 'Infrastructure & Quality', tagMr: 'पायाभूत सुविधा व गुणवत्ता', tagHi: 'बुनियादी ढांचा एवं गुणवत्ता',
    icon: 'ShieldCheck'
  }
];

schemesData.forEach(s => {
  insertScheme.run(
    s.titleEn, s.titleEn, s.titleMr, s.titleHi,
    s.descEn, s.descEn, s.descMr, s.descHi,
    s.tagEn, s.tagEn, s.tagMr, s.tagHi,
    s.icon
  );
});

console.log('✅ Seeded Schemes');

console.log('🎉 Seeding complete! Database is fully populated with multilingual content in English, Marathi, and Hindi.');
