import bcrypt from 'bcryptjs';
import db, { initDatabase } from './db.js';
import { SECTIONS_CONFIG } from '../shared/sections.config.js';

console.log('🌱 Starting database seeding process...');

initDatabase();

// Clear existing data
const tables = [
  'users', 'sections', 'classes', 'divisions', 'subjects', 'students',
  'teachers', 'teacher_assignments', 'notices', 'timetable', 'syllabus',
  'exams', 'results', 'progress_reports', 'attendance', 'homework',
  'admissions', 'gallery_albums', 'gallery_images', 'events', 'enquiries', 'downloads'
];

tables.forEach(table => {
  db.prepare(`DELETE FROM ${table}`).run();
  db.prepare(`DELETE FROM sqlite_sequence WHERE name='${table}'`).run();
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
  { username: 'admin_preprimary', email: 'preprimary@mahaschool.gov.in', pass: adminPass, role: 'section_admin', section: 'pre-primary' },
  { username: 'admin_primary', email: 'primary@mahaschool.gov.in', pass: adminPass, role: 'section_admin', section: 'primary' },
  { username: 'admin_highschool', email: 'highschool@mahaschool.gov.in', pass: adminPass, role: 'section_admin', section: 'high-school' },
  { username: 'teacher_sunita', email: 'sunita.patil@mahaschool.gov.in', pass: teacherPass, role: 'teacher', section: 'pre-primary' },
  { username: 'teacher_gajanan', email: 'gajanan.kulkarni@mahaschool.gov.in', pass: teacherPass, role: 'teacher', section: 'primary' },
  { username: 'teacher_anil', email: 'anil.shinde@mahaschool.gov.in', pass: teacherPass, role: 'teacher', section: 'high-school' },
  { username: 'student_aarav', email: 'aarav.sharma@parent.com', pass: studentPass, role: 'student_parent', section: 'pre-primary' },
  { username: 'student_ananya', email: 'ananya.deshmukh@parent.com', pass: studentPass, role: 'student_parent', section: 'primary' },
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
  let secId = c <= 4 ? 'pre-primary' : c <= 10 ? 'primary' : 'high-school';
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

// 5. Seed Teachers
const insertTeacher = db.prepare(`
  INSERT INTO teachers (user_id, employee_id, full_name, designation, qualification, phone, email, photo, department, section_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const teachersList = [
  { userId: 5, empId: 'EMP-001', name: 'Smt. Sunita R. Patil', desig: 'Primary Assistant Teacher', qual: 'B.A., D.T.Ed.', phone: '+91 98221 11223', email: 'sunita.patil@mahaschool.gov.in', dept: 'Languages & Art', sec: 'pre-primary' },
  { userId: 6, empId: 'EMP-002', name: 'Shri. Gajanan V. Kulkarni', desig: 'Senior Secondary Teacher', qual: 'M.Sc. (Maths), B.Ed.', phone: '+91 94234 55667', email: 'gajanan.kulkarni@mahaschool.gov.in', dept: 'Mathematics & Science', sec: 'primary' },
  { userId: 7, empId: 'EMP-003', name: 'Dr. Anil K. Shinde', desig: 'Junior College Lecturer', qual: 'Ph.D. (Physics), M.Ed.', phone: '+91 97654 33221', email: 'anil.shinde@mahaschool.gov.in', dept: 'Physics & Technology', sec: 'high-school' }
];

teachersList.forEach(t => {
  insertTeacher.run(t.userId, t.empId, t.name, t.desig, t.qual, t.phone, t.email, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', t.dept, t.sec);
});

// 6. Seed Students
const insertStudent = db.prepare(`
  INSERT INTO students (user_id, gr_number, roll_number, first_name, last_name, gender, dob, section_id, class_number, division_name, stream, father_name, mother_name, phone, address, photo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const studentsList = [
  { userId: 8, gr: 'GR-2024-001', roll: 1, fn: 'Aarav', ln: 'Sharma', gender: 'Male', dob: '2017-05-15', sec: 'pre-primary', classNum: 3, div: 'A', stream: 'none', father: 'Ramesh Sharma', mother: 'Priya Sharma', phone: '+91 98901 23456', addr: 'Near Maruti Temple, Anjangaon' },
  { userId: 9, gr: 'GR-2021-045', roll: 12, fn: 'Ananya', ln: 'Deshmukh', gender: 'Female', dob: '2012-08-20', sec: 'primary', classNum: 8, div: 'A', stream: 'none', father: 'Vijay Deshmukh', mother: 'Sunita Deshmukh', phone: '+91 98902 34567', addr: 'Station Road, Anjangaon' },
  { userId: 10, gr: 'GR-2019-102', roll: 25, fn: 'Rohit', ln: 'Patil', gender: 'Male', dob: '2008-01-10', sec: 'high-school', classNum: 12, div: 'A', stream: 'science', father: 'Kashinath Patil', mother: 'Kavitabai Patil', phone: '+91 98903 45678', addr: 'Main Bazar Road, Anjangaon' }
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
  INSERT INTO notices (title, content, category, attachment_url, section_id, class_number, is_important)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

insertNotice.run(
  'Parent-Teacher Meeting for Pre-Primary Section',
  'The first term PTM for Class 1 to 4 will be held on Saturday at 10:00 AM in the school hall. Parents are requested to join to discuss progress reports.',
  'meeting',
  null,
  'pre-primary',
  null,
  1
);

insertNotice.run(
  'Class 5 & 8 State Scholarship Examination Form Submission',
  'Forms for the Maharashtra State Pre-Upper Primary (Class 5) and Pre-Secondary (Class 8) Scholarship Exams are now open. Last date for registration is 15th October.',
  'exam',
  '/uploads/scholarship_form_notice.pdf',
  'primary',
  8,
  1
);

insertNotice.run(
  'HSC Board Exam Form Filling Notice (Class 12 Science/Commerce/Arts)',
  'All Class 12 students are instructed to submit their HSC Board Exam forms along with marksheets of Class 10 and 11 to the Junior College Office by 20th October.',
  'board_exam',
  '/uploads/hsc_exam_instructions.pdf',
  'high-school',
  12,
  1
);

insertNotice.run(
  'Annual Sports & Cultural Week 2026 Announcement',
  'The Annual School Sports Day and Cultural Fest will take place from 14th to 18th November. Inter-section competitions across all 3 sections will be conducted.',
  'event',
  null,
  null,
  null,
  0
);

console.log('✅ Seeded Notices');

// 8. Seed Results & Progress Reports
const insertResult = db.prepare(`
  INSERT INTO results (student_id, exam_id, subject_id, subject_name, marks_obtained, max_marks, grade, remarks)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

// Primary student (Ananya - Class 8)
insertResult.run(2, 1, 'sub-p-marathi', 'Marathi (प्रथम भाषा)', 88, 100, 'A1', 'Excellent command over grammar & essay writing');
insertResult.run(2, 1, 'sub-p-english', 'English', 82, 100, 'A2', 'Very Good vocabulary');
insertResult.run(2, 1, 'sub-p-math', 'Mathematics', 94, 100, 'A1', 'Outstanding problem-solving capability');
insertResult.run(2, 1, 'sub-p-science', 'Science & Technology', 91, 100, 'A1', 'Clear concept understanding');

// High School student (Rohit - Class 12 Science)
insertResult.run(3, 2, 'sub-h-phy', 'Physics', 85, 100, 'A1', 'Strong grasp of numericals');
insertResult.run(3, 2, 'sub-h-chem', 'Chemistry', 88, 100, 'A1', 'Excellent practical performance');
insertResult.run(3, 2, 'sub-h-math', 'Mathematics & Statistics', 96, 100, 'A1', 'Top scorer in class');
insertResult.run(3, 2, 'sub-h-bio', 'Biology', 90, 100, 'A1', 'Neat diagrams and thorough theory');

// Pre-Primary Progress Report (Aarav - Class 3)
const insertProgressReport = db.prepare(`
  INSERT INTO progress_reports (student_id, academic_year, term, reading_grade, writing_grade, numeracy_grade, art_grade, sports_grade, discipline_grade, overall_grade, teacher_remarks)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertProgressReport.run(
  1,
  '2025-2026',
  'First Semester',
  'A (Excellent)',
  'A (Clean Handwriting)',
  'B+ (Good Concept)',
  'A+ (Highly Creative)',
  'A (Enthusiastic)',
  'A (Polite & Punctual)',
  'A (Outstanding)',
  'Aarav is a quick learner, shows great enthusiasm in group activities, and expresses himself very well through drawing and storytelling.'
);

console.log('✅ Seeded Results & Progress Reports');

// 9. Seed Admissions
const insertAdmission = db.prepare(`
  INSERT INTO admissions (application_no, applicant_name, gender, dob, parent_name, phone, email, section_id, class_number, stream, previous_school, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertAdmission.run('ADM-2026-001', 'Sarthak Kulkarni', 'Male', '2020-04-10', 'Vilas Kulkarni', '+91 98230 99887', 'vilas@gmail.com', 'pre-primary', 1, 'none', 'Little Angels Nursery', 'approved');
insertAdmission.run('ADM-2026-002', 'Pranjal Patil', 'Female', '2015-09-12', 'Sudhakar Patil', '+91 94225 44332', 'sudhakar@gmail.com', 'primary', 5, 'none', 'Z.P. Primary School, Surji', 'pending');
insertAdmission.run('ADM-2026-003', 'Vaibhav Shinde', 'Male', '2009-11-25', 'Mahesh Shinde', '+91 97640 11223', 'mahesh@gmail.com', 'high-school', 11, 'science', 'Z.P. High School, Anjangaon', 'approved');

console.log('✅ Seeded Admissions');

// 10. Seed Gallery Albums & Events
const insertAlbum = db.prepare(`INSERT INTO gallery_albums (title, description, cover_image, section_id, date) VALUES (?, ?, ?, ?, ?)`);
const insertImage = db.prepare(`INSERT INTO gallery_images (album_id, image_url, caption) VALUES (?, ?, ?)`);

const alb1 = insertAlbum.run('Independence Day Celebration 2026', 'Flag hoisting, parade and patriotic cultural performances by students of all sections.', 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800', null, '2026-08-15').lastInsertRowid;
insertImage.run(alb1, 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800', 'Flag hoisting ceremony by Principal Shri. Deshmukh');
insertImage.run(alb1, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', 'Students performing patriotic dance');

const alb2 = insertAlbum.run('Science Exhibition & Project Fair', 'Working models created by Primary and High School students.', 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&q=80&w=800', 'high-school', '2026-02-28').lastInsertRowid;
insertImage.run(alb2, 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&q=80&w=800', 'Robotics and solar model presentation');

// Seed Events
const insertEvent = db.prepare(`INSERT INTO events (title, description, event_date, venue, section_id, image_url) VALUES (?, ?, ?, ?, ?, ?)`);
insertEvent.run('State Level Science Olympiad Prep Workshop', 'Special intensive coaching session for Class 8 to 10 students.', '2026-10-12', 'School Auditorium', 'primary', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800');
insertEvent.run('Career Counseling & Entrance Exam Seminar', 'Guidance on MHT-CET, NEET, JEE and CUET for Class 11 & 12 Science/Commerce students.', '2026-10-25', 'Junior College AV Room', 'high-school', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800');

console.log('✅ Seeded Gallery & Events');

// 11. Seed Downloads & Enquiries
const insertDownload = db.prepare(`INSERT INTO downloads (title, category, section_id, file_url, file_size) VALUES (?, ?, ?, ?, ?)`);
insertDownload.run('Transfer Certificate (TC) Application Form', 'Forms', null, '/downloads/tc_application_form.pdf', '450 KB');
insertDownload.run('Bonafide Certificate Request Form', 'Forms', null, '/downloads/bonafide_form.pdf', '320 KB');
insertDownload.run('Class 5 & 8 Scholarship Practice Question Paper 2026', 'Exam Papers', 'primary', '/downloads/scholarship_paper_2026.pdf', '2.4 MB');
insertDownload.run('Class 12 HSC Physics Board Practical Handbook', 'Syllabus', 'high-school', '/downloads/hsc_physics_practical.pdf', '3.8 MB');

console.log('🎉 Seeding complete! Database is fully populated.');
