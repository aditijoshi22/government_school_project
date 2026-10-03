import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'school.db');
const db = new Database(dbPath);

// Enable Foreign Key support and WAL mode for high performance
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('super_admin', 'section_admin', 'teacher', 'student_parent')),
      section_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sections (
      id TEXT PRIMARY KEY,
      name_en TEXT NOT NULL,
      name_mr TEXT NOT NULL,
      name_hi TEXT NOT NULL,
      assessment_type TEXT NOT NULL,
      theme_color TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      class_name TEXT NOT NULL,
      stream TEXT DEFAULT 'none'
    );

    CREATE TABLE IF NOT EXISTS divisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INTEGER NOT NULL,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      section_id TEXT NOT NULL,
      class_number INTEGER,
      stream TEXT DEFAULT 'common',
      code TEXT NOT NULL,
      name_en TEXT NOT NULL,
      name_mr TEXT,
      total_marks INTEGER DEFAULT 100,
      passing_marks INTEGER DEFAULT 35
    );

    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      gr_number TEXT UNIQUE NOT NULL,
      roll_number INTEGER NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      gender TEXT NOT NULL,
      dob TEXT NOT NULL,
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      division_name TEXT DEFAULT 'A',
      stream TEXT DEFAULT 'none',
      father_name TEXT,
      mother_name TEXT,
      phone TEXT,
      address TEXT,
      photo TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      employee_id TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      designation TEXT NOT NULL,
      qualification TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      photo TEXT,
      department TEXT,
      section_id TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS teacher_assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER NOT NULL,
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      division_name TEXT DEFAULT 'A',
      subject_id TEXT,
      FOREIGN KEY(teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      attachment_url TEXT,
      section_id TEXT,
      class_number INTEGER,
      is_important INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS timetable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      division_name TEXT DEFAULT 'A',
      day_of_week TEXT NOT NULL,
      period_number INTEGER NOT NULL,
      time_slot TEXT NOT NULL,
      subject_name TEXT NOT NULL,
      teacher_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS syllabus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      subject_name TEXT NOT NULL,
      pdf_url TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      exam_type TEXT NOT NULL,
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      exam_id INTEGER,
      subject_id TEXT NOT NULL,
      subject_name TEXT NOT NULL,
      marks_obtained REAL NOT NULL,
      max_marks REAL DEFAULT 100,
      grade TEXT,
      remarks TEXT,
      FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS progress_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      academic_year TEXT DEFAULT '2025-2026',
      term TEXT DEFAULT 'Term 1',
      reading_grade TEXT DEFAULT 'A',
      writing_grade TEXT DEFAULT 'A',
      numeracy_grade TEXT DEFAULT 'B',
      art_grade TEXT DEFAULT 'A+',
      sports_grade TEXT DEFAULT 'A',
      discipline_grade TEXT DEFAULT 'A',
      overall_grade TEXT DEFAULT 'Excellent',
      teacher_remarks TEXT,
      FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      status TEXT CHECK(status IN ('present', 'absent', 'late')),
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS homework (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      division_name TEXT DEFAULT 'A',
      subject_name TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      due_date TEXT NOT NULL,
      attachment_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_no TEXT UNIQUE NOT NULL,
      applicant_name TEXT NOT NULL,
      gender TEXT NOT NULL,
      dob TEXT NOT NULL,
      parent_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      section_id TEXT NOT NULL,
      class_number INTEGER NOT NULL,
      stream TEXT DEFAULT 'none',
      previous_school TEXT,
      documents_url TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS gallery_albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      cover_image TEXT NOT NULL,
      section_id TEXT,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      album_id INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      caption TEXT,
      FOREIGN KEY(album_id) REFERENCES gallery_albums(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      event_date TEXT NOT NULL,
      venue TEXT NOT NULL,
      section_id TEXT,
      image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS downloads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      section_id TEXT,
      file_url TEXT NOT NULL,
      file_size TEXT DEFAULT '1.2 MB',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export default db;
