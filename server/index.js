import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import db, { initDatabase } from './db.js';
import schoolConfig from '../shared/school.config.js';
import { SECTIONS_CONFIG, getSectionById, getSectionByClass } from '../shared/sections.config.js';
import { authenticateToken, authorizeRoles, generateToken } from './middleware/auth.js';
import { upload } from './middleware/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
initDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------------------------------------------------
// 1. CONFIG ROUTES
// -------------------------------------------------------------
app.get('/api/config/school', (req, res) => {
  res.json({ success: true, data: schoolConfig });
});

app.get('/api/config/sections', (req, res) => {
  res.json({ success: true, data: SECTIONS_CONFIG });
});

// -------------------------------------------------------------
// 2. PUBLIC ROUTES
// -------------------------------------------------------------

// Home page aggregate data
app.get('/api/public/home', (req, res) => {
  try {
    const notices = db.prepare(`SELECT * FROM notices ORDER BY created_at DESC LIMIT 6`).all();
    const events = db.prepare(`SELECT * FROM events ORDER BY event_date ASC LIMIT 4`).all();
    const albums = db.prepare(`SELECT * FROM gallery_albums ORDER BY date DESC LIMIT 4`).all();
    
    // Top achievers mock data from database results
    const topAchievers = [
      { name: 'Rohit Patil', class: 'Class 12 (Science)', score: '96.4%', title: 'HSC College Topper', photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200' },
      { name: 'Ananya Deshmukh', class: 'Class 8', score: 'State Scholar', title: 'Class 8 Scholarship Awardee', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
      { name: 'Pranav Kulkarni', class: 'Class 10', score: '95.8%', title: 'SSC District Merit Ranker', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' }
    ];

    res.json({
      success: true,
      data: {
        school: schoolConfig,
        sections: SECTIONS_CONFIG,
        notices,
        events,
        albums,
        topAchievers
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public Notices
app.get('/api/public/notices', (req, res) => {
  try {
    const { section, category } = req.query;
    let query = `SELECT * FROM notices WHERE 1=1`;
    let params = [];

    if (section && section !== 'all') {
      query += ` AND (section_id = ? OR section_id IS NULL)`;
      params.push(section);
    }
    if (category && category !== 'all') {
      query += ` AND category = ?`;
      params.push(category);
    }

    query += ` ORDER BY is_important DESC, created_at DESC`;
    const notices = db.prepare(query).all(...params);
    res.json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public Events
app.get('/api/public/events', (req, res) => {
  try {
    const { section } = req.query;
    let query = `SELECT * FROM events WHERE 1=1`;
    let params = [];
    if (section && section !== 'all') {
      query += ` AND (section_id = ? OR section_id IS NULL)`;
      params.push(section);
    }
    query += ` ORDER BY event_date ASC`;
    const events = db.prepare(query).all(...params);
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public Gallery
app.get('/api/public/gallery', (req, res) => {
  try {
    const { section } = req.query;
    let query = `SELECT * FROM gallery_albums WHERE 1=1`;
    let params = [];
    if (section && section !== 'all') {
      query += ` AND (section_id = ? OR section_id IS NULL)`;
      params.push(section);
    }
    query += ` ORDER BY date DESC`;
    const albums = db.prepare(query).all(...params);
    
    // Fetch images for each album
    const result = albums.map(album => {
      const images = db.prepare(`SELECT * FROM gallery_images WHERE album_id = ?`).all(album.id);
      return { ...album, images };
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public Staff Directory
app.get('/api/public/staff', (req, res) => {
  try {
    const { section, department } = req.query;
    let query = `SELECT * FROM teachers WHERE 1=1`;
    let params = [];
    if (section && section !== 'all') {
      query += ` AND (section_id = ? OR section_id IS NULL)`;
      params.push(section);
    }
    if (department && department !== 'all') {
      query += ` AND department = ?`;
      params.push(department);
    }
    query += ` ORDER BY id ASC`;
    const staff = db.prepare(query).all(...params);
    res.json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public Downloads
app.get('/api/public/downloads', (req, res) => {
  try {
    const { section, category } = req.query;
    let query = `SELECT * FROM downloads WHERE 1=1`;
    let params = [];
    if (section && section !== 'all') {
      query += ` AND (section_id = ? OR section_id IS NULL)`;
      params.push(section);
    }
    if (category && category !== 'all') {
      query += ` AND category = ?`;
      params.push(category);
    }
    query += ` ORDER BY updated_at DESC`;
    const items = db.prepare(query).all(...params);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Result Lookup (Secured by Roll No + Date of Birth)
app.post('/api/public/results/lookup', (req, res) => {
  try {
    const { section_id, class_number, roll_number, dob } = req.body;

    if (!section_id || !class_number || !roll_number || !dob) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Section, Class, Roll Number, and Date of Birth'
      });
    }

    // Verify student identity first
    const student = db.prepare(`
      SELECT * FROM students 
      WHERE section_id = ? AND class_number = ? AND roll_number = ? AND dob = ?
    `).get(section_id, parseInt(class_number, 10), parseInt(roll_number, 10), dob);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No student record found matching the provided Roll Number and Date of Birth verification.'
      });
    }

    const section = getSectionById(section_id);

    if (section.assessmentType === 'grade-based') {
      // Primary Progress Report
      const report = db.prepare(`SELECT * FROM progress_reports WHERE student_id = ?`).get(student.id);
      return res.json({
        success: true,
        type: 'grade-based',
        student,
        section,
        report: report || {
          reading_grade: 'A',
          writing_grade: 'A',
          numeracy_grade: 'B+',
          art_grade: 'A+',
          sports_grade: 'A',
          discipline_grade: 'A',
          overall_grade: 'Excellent',
          teacher_remarks: 'Enthusiastic and creative learner.'
        }
      });
    } else {
      // Primary & High School Marksheet
      const marks = db.prepare(`SELECT * FROM results WHERE student_id = ?`).all(student.id);
      
      const totalMarksObtained = marks.reduce((acc, curr) => acc + curr.marks_obtained, 0);
      const totalMaxMarks = marks.reduce((acc, curr) => acc + curr.max_marks, 0);
      const percentage = totalMaxMarks > 0 ? ((totalMarksObtained / totalMaxMarks) * 100).toFixed(2) : 0;

      return res.json({
        success: true,
        type: 'marks',
        student,
        section,
        marks,
        summary: {
          totalObtained: totalMarksObtained,
          totalMax: totalMaxMarks,
          percentage: `${percentage}%`,
          resultStatus: percentage >= 35 ? 'PASSED' : 'NEEDS IMPROVEMENT'
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Online Admission Form Submission
app.post('/api/public/admissions', upload.single('documents'), (req, res) => {
  try {
    const {
      applicant_name, gender, dob, parent_name, phone, email,
      section_id, class_number, stream, previous_school
    } = req.body;

    if (!applicant_name || !dob || !parent_name || !phone || !section_id || !class_number) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const appNo = 'ADM-2026-' + Math.floor(1000 + Math.random() * 9000);
    const docUrl = req.file ? `/uploads/${req.file.filename}` : null;

    db.prepare(`
      INSERT INTO admissions (application_no, applicant_name, gender, dob, parent_name, phone, email, section_id, class_number, stream, previous_school, documents_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      appNo, applicant_name, gender, dob, parent_name, phone, email || '',
      section_id, parseInt(class_number, 10), stream || 'none', previous_school || '', docUrl
    );

    res.json({
      success: true,
      message: 'Admission application submitted successfully!',
      application_no: appNo
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public Contact Form Enquiry Submission
app.post('/api/public/enquiry', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
    }

    db.prepare(`
      INSERT INTO enquiries (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, phone, subject || 'General Enquiry', message);

    res.json({ success: true, message: 'Thank you! Your inquiry has been sent to the school office.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// 3. AUTH ROUTES
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    const user = db.prepare(`SELECT * FROM users WHERE username = ? OR email = ?`).get(username, username);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    
    // Fetch associated entity detail (student or teacher if applicable)
    let profileData = null;
    if (user.role === 'student_parent') {
      profileData = db.prepare(`SELECT * FROM students WHERE user_id = ?`).get(user.id);
    } else if (user.role === 'teacher') {
      profileData = db.prepare(`SELECT * FROM teachers WHERE user_id = ?`).get(user.id);
    }

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        section_id: user.section_id,
        profileData
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const user = db.prepare(`SELECT id, username, email, role, section_id FROM users WHERE id = ?`).get(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// 4. ADMIN DASHBOARD & MANAGEMENT ROUTES
// -------------------------------------------------------------

// Dashboard Stats per Section (Admin & Teacher)
app.get('/api/admin/dashboard/stats', authenticateToken, authorizeRoles('admin', 'teacher'), (req, res) => {
  try {
    const { section_id } = req.query;
    
    let studentCountQuery = `SELECT COUNT(*) as count FROM students`;
    let teacherCountQuery = `SELECT COUNT(*) as count FROM teachers`;
    let noticeCountQuery = `SELECT COUNT(*) as count FROM notices`;
    let pendingAdmissionQuery = `SELECT COUNT(*) as count FROM admissions WHERE status = 'pending'`;

    let params = [];
    if (section_id && section_id !== 'all') {
      studentCountQuery += ` WHERE section_id = ?`;
      teacherCountQuery += ` WHERE section_id = ? OR section_id IS NULL`;
      noticeCountQuery += ` WHERE section_id = ? OR section_id IS NULL`;
      pendingAdmissionQuery += ` AND section_id = ?`;
      params.push(section_id);
    }

    const totalStudents = db.prepare(studentCountQuery).get(...params).count;
    const totalTeachers = db.prepare(teacherCountQuery).get(...params).count;
    const totalNotices = db.prepare(noticeCountQuery).get(...params).count;
    const pendingAdmissions = db.prepare(pendingAdmissionQuery).get(...params).count;

    // Class wise student strength
    let classStrengthQuery = `
      SELECT class_number, COUNT(*) as count 
      FROM students ${section_id && section_id !== 'all' ? 'WHERE section_id = ?' : ''} 
      GROUP BY class_number 
      ORDER BY class_number ASC
    `;
    const classStrength = db.prepare(classStrengthQuery).all(...params);

    // Gender ratio
    let genderQuery = `
      SELECT gender, COUNT(*) as count 
      FROM students ${section_id && section_id !== 'all' ? 'WHERE section_id = ?' : ''} 
      GROUP BY gender
    `;
    const genderRatio = db.prepare(genderQuery).all(...params);

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalTeachers,
        totalNotices,
        pendingAdmissions,
        classStrength,
        genderRatio
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Student Management (Admin & Teacher View; Admin Edit/Add/Delete)
app.get('/api/admin/students', authenticateToken, authorizeRoles('admin', 'teacher'), (req, res) => {
  try {
    const { section_id, class_number } = req.query;
    let query = `SELECT * FROM students WHERE 1=1`;
    let params = [];

    if (section_id && section_id !== 'all') {
      query += ` AND section_id = ?`;
      params.push(section_id);
    }
    if (class_number && class_number !== 'all') {
      query += ` AND class_number = ?`;
      params.push(parseInt(class_number, 10));
    }

    query += ` ORDER BY class_number ASC, roll_number ASC`;
    const students = db.prepare(query).all(...params);
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/admin/students', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const {
      gr_number, roll_number, first_name, last_name, gender, dob,
      section_id, class_number, division_name, stream, father_name, mother_name, phone, address
    } = req.body;

    const result = db.prepare(`
      INSERT INTO students (gr_number, roll_number, first_name, last_name, gender, dob, section_id, class_number, division_name, stream, father_name, mother_name, phone, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      gr_number, roll_number, first_name, last_name, gender, dob,
      section_id, class_number, division_name || 'A', stream || 'none',
      father_name, mother_name, phone, address
    );

    res.json({ success: true, message: 'Student registered successfully', id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/students/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone, address, class_number, division_name } = req.body;
    db.prepare(`
      UPDATE students SET first_name = ?, last_name = ?, phone = ?, address = ?, class_number = ?, division_name = ?
      WHERE id = ?
    `).run(first_name, last_name, phone, address, class_number, division_name, id);
    res.json({ success: true, message: 'Student details updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/students/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const { id } = req.params;
    db.prepare(`DELETE FROM students WHERE id = ?`).run(id);
    res.json({ success: true, message: 'Student record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admission Applications Management (Admin ONLY)
app.get('/api/admin/admissions', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const { section_id, status } = req.query;
    let query = `SELECT * FROM admissions WHERE 1=1`;
    let params = [];

    if (section_id && section_id !== 'all') {
      query += ` AND section_id = ?`;
      params.push(section_id);
    }
    if (status && status !== 'all') {
      query += ` AND status = ?`;
      params.push(status);
    }

    query += ` ORDER BY created_at DESC`;
    const items = db.prepare(query).all(...params);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/admissions/:id/status', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    db.prepare(`UPDATE admissions SET status = ? WHERE id = ?`).run(status, id);
    res.json({ success: true, message: `Admission application status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Full Notice Management CRUD
app.get('/api/admin/notices', authenticateToken, authorizeRoles('admin', 'teacher'), (req, res) => {
  try {
    const notices = db.prepare(`SELECT * FROM notices ORDER BY created_at DESC`).all();
    res.json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/admin/notices', authenticateToken, authorizeRoles('admin', 'teacher'), upload.single('attachment'), (req, res) => {
  try {
    const { title, content, title_en, title_mr, content_en, content_mr, category, section_id, class_number, is_important } = req.body;
    const attachment_url = req.file ? `/uploads/${req.file.filename}` : null;

    const finalTitleEn = title_en || title || '';
    const finalTitleMr = title_mr || title || finalTitleEn;
    const finalContentEn = content_en || content || '';
    const finalContentMr = content_mr || content || finalContentEn;

    const result = db.prepare(`
      INSERT INTO notices (title, content, title_en, title_mr, content_en, content_mr, category, attachment_url, section_id, class_number, is_important)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      finalTitleEn, finalContentEn, finalTitleEn, finalTitleMr, finalContentEn, finalContentMr,
      category || 'general', attachment_url,
      !section_id || section_id === 'all' ? null : section_id,
      class_number ? parseInt(class_number, 10) : null,
      is_important === 'true' || is_important === true || is_important === 1 ? 1 : 0
    );

    res.json({ success: true, message: 'Notice published successfully', id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/notices/:id', authenticateToken, authorizeRoles('admin'), upload.single('attachment'), (req, res) => {
  try {
    const { id } = req.params;
    const { title_en, title_mr, content_en, content_mr, category, section_id, is_important } = req.body;
    const existing = db.prepare(`SELECT * FROM notices WHERE id = ?`).get(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    const attachment_url = req.file ? `/uploads/${req.file.filename}` : existing.attachment_url;
    const finalTitleEn = title_en || existing.title_en;
    const finalTitleMr = title_mr || existing.title_mr;
    const finalContentEn = content_en || existing.content_en;
    const finalContentMr = content_mr || existing.content_mr;

    db.prepare(`
      UPDATE notices 
      SET title = ?, content = ?, title_en = ?, title_mr = ?, content_en = ?, content_mr = ?, category = ?, attachment_url = ?, section_id = ?, is_important = ?
      WHERE id = ?
    `).run(
      finalTitleEn, finalContentEn, finalTitleEn, finalTitleMr, finalContentEn, finalContentMr,
      category || existing.category, attachment_url,
      !section_id || section_id === 'all' ? null : section_id,
      is_important === 'true' || is_important === true || is_important === 1 ? 1 : 0,
      id
    );

    res.json({ success: true, message: 'Notice updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/notices/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const { id } = req.params;
    db.prepare(`DELETE FROM notices WHERE id = ?`).run(id);
    res.json({ success: true, message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// 5. ACADEMICS & MARKS / PROGRESS REPORT ENTRY
// -------------------------------------------------------------

// Post or update Marks (Primary & High School)
app.post('/api/academics/marks', authenticateToken, authorizeRoles('admin', 'teacher'), (req, res) => {
  try {
    const { student_id, exam_id, subject_id, subject_name, marks_obtained, max_marks, remarks } = req.body;

    // Verify student exists
    const student = db.prepare(`SELECT * FROM students WHERE id = ?`).get(student_id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    // If request is from a teacher, enforce assigned section check
    if (req.user.role === 'teacher') {
      const teacher = db.prepare(`SELECT * FROM teachers WHERE user_id = ?`).get(req.user.id);
      if (teacher && teacher.section_id && teacher.section_id !== student.section_id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You are not authorized to enter marks for students outside your assigned section.'
        });
      }
    }

    const maxM = max_marks || 100;
    const pct = (marks_obtained / maxM) * 100;
    let grade = 'F';
    if (pct >= 90) grade = 'A1';
    else if (pct >= 80) grade = 'A2';
    else if (pct >= 70) grade = 'B1';
    else if (pct >= 60) grade = 'B2';
    else if (pct >= 50) grade = 'C1';
    else if (pct >= 35) grade = 'D';

    db.prepare(`
      INSERT INTO results (student_id, exam_id, subject_id, subject_name, marks_obtained, max_marks, grade, remarks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(student_id, exam_id || 1, subject_id, subject_name, marks_obtained, maxM, grade, remarks || '');

    res.json({ success: true, message: 'Marks entry saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Post or update Progress Report (Primary)
app.post('/api/academics/progress-reports', authenticateToken, authorizeRoles('admin', 'teacher'), (req, res) => {
  try {
    const {
      student_id, academic_year, term, reading_grade, writing_grade,
      numeracy_grade, art_grade, sports_grade, discipline_grade, overall_grade, teacher_remarks
    } = req.body;

    const student = db.prepare(`SELECT * FROM students WHERE id = ?`).get(student_id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    if (req.user.role === 'teacher') {
      const teacher = db.prepare(`SELECT * FROM teachers WHERE user_id = ?`).get(req.user.id);
      if (teacher && teacher.section_id && teacher.section_id !== student.section_id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You are not authorized to enter report cards outside your assigned section.'
        });
      }
    }

    db.prepare(`
      INSERT INTO progress_reports (student_id, academic_year, term, reading_grade, writing_grade, numeracy_grade, art_grade, sports_grade, discipline_grade, overall_grade, teacher_remarks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      student_id, academic_year || '2025-2026', term || 'First Semester',
      reading_grade, writing_grade, numeracy_grade, art_grade, sports_grade, discipline_grade, overall_grade, teacher_remarks
    );

    res.json({ success: true, message: 'Progress Report saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// 6. TEACHER DASHBOARD API
// -------------------------------------------------------------
app.get('/api/teacher/dashboard', authenticateToken, authorizeRoles('teacher'), (req, res) => {
  try {
    const teacher = db.prepare(`SELECT * FROM teachers WHERE user_id = ?`).get(req.user.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    const assignments = db.prepare(`SELECT * FROM teacher_assignments WHERE teacher_id = ?`).all(teacher.id);
    
    // Assigned students in teacher's section
    const students = db.prepare(`
      SELECT * FROM students WHERE section_id = ? ORDER BY class_number ASC, roll_number ASC
    `).all(teacher.section_id);

    // Relevant notices
    const notices = db.prepare(`
      SELECT * FROM notices WHERE section_id = ? OR section_id IS NULL ORDER BY created_at DESC
    `).all(teacher.section_id);

    // Timetable
    const timetable = db.prepare(`
      SELECT * FROM timetable WHERE teacher_name LIKE ? OR section_id = ?
    `).all(`%${teacher.full_name}%`, teacher.section_id);

    res.json({
      success: true,
      data: {
        teacher,
        assignments,
        students,
        notices,
        timetable
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// 7. STUDENT DASHBOARD API
// -------------------------------------------------------------
app.get('/api/student/dashboard', authenticateToken, authorizeRoles('student'), (req, res) => {
  try {
    const student = db.prepare(`SELECT * FROM students WHERE user_id = ?`).get(req.user.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const section = getSectionById(student.section_id);
    const marks = db.prepare(`SELECT * FROM results WHERE student_id = ?`).all(student.id);
    const progressReport = db.prepare(`SELECT * FROM progress_reports WHERE student_id = ?`).get(student.id);
    const attendance = db.prepare(`SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC`).all(student.id);
    const timetable = db.prepare(`
      SELECT * FROM timetable WHERE section_id = ? AND class_number = ?
    `).all(student.section_id, student.class_number);
    const homework = db.prepare(`
      SELECT * FROM homework WHERE section_id = ? AND class_number = ? ORDER BY due_date ASC
    `).all(student.section_id, student.class_number);
    const notices = db.prepare(`
      SELECT * FROM notices WHERE section_id = ? OR section_id IS NULL ORDER BY is_important DESC, created_at DESC
    `).all(student.section_id);
    const downloads = db.prepare(`
      SELECT * FROM downloads WHERE section_id = ? OR section_id IS NULL ORDER BY updated_at DESC
    `).all(student.section_id);

    // Calculate attendance percentage
    const totalDays = attendance.length;
    const presentDays = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 100;

    res.json({
      success: true,
      data: {
        student,
        section,
        marks,
        progressReport,
        attendance,
        attendancePercentage,
        timetable,
        homework,
        notices,
        downloads
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// START SERVER
// -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Government School REST API server running on http://localhost:${PORT}`);
});
