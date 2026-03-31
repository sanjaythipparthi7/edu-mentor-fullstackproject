-- ============================================================
--  EduMentor – MySQL Database Schema
--  Run this in MySQL Workbench before starting Spring Boot
-- ============================================================

-- Step 1: Create & select database
CREATE DATABASE IF NOT EXISTS edumentor_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE edumentor_db;

-- ============================================================
--  Table: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(150)  NOT NULL UNIQUE,
    password   VARCHAR(255)  NOT NULL,
    role       ENUM('STUDENT','TEACHER','ADMIN') NOT NULL DEFAULT 'STUDENT',
    is_active  TINYINT(1)    NOT NULL DEFAULT 1,
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  Table: courses
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200)  NOT NULL,
    description TEXT,
    category    VARCHAR(100),
    duration    VARCHAR(50),
    price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    instructor  VARCHAR(100),
    is_active   TINYINT(1)    NOT NULL DEFAULT 1,
    created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  Table: assignments
-- ============================================================
CREATE TABLE IF NOT EXISTS assignments (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200)  NOT NULL,
    description TEXT,
    type        VARCHAR(50),
    due_date    DATE,
    status      ENUM('PENDING','SUBMITTED','GRADED') NOT NULL DEFAULT 'PENDING',
    course_id   BIGINT,
    teacher_id  BIGINT,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id)  REFERENCES courses(id)  ON DELETE SET NULL,
    FOREIGN KEY (teacher_id) REFERENCES users(id)    ON DELETE SET NULL
);

-- ============================================================
--  Table: attendance
-- ============================================================
CREATE TABLE IF NOT EXISTS attendance (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id       BIGINT   NOT NULL,
    course_id        BIGINT   NOT NULL,
    attendance_date  DATE     NOT NULL,
    status           ENUM('PRESENT','ABSENT') NOT NULL DEFAULT 'PRESENT',
    marked_by        BIGINT,
    created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)   ON DELETE CASCADE,
    FOREIGN KEY (course_id)  REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY uq_attendance (student_id, course_id, attendance_date)
);

-- ============================================================
--  SAMPLE DATA
--  Passwords are BCrypt-encoded (plain = "password123")
-- ============================================================

-- ── Users ────────────────────────────────────────────────────
INSERT INTO users (name, email, password, role) VALUES
('Super Admin',     'admin@edumentor.com',   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ADMIN'),
('Dr. Ramesh Kumar','ramesh@edumentor.com',  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'TEACHER'),
('Prof. Anjali Mehta','anjali@edumentor.com','$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'TEACHER'),
('Alice Kumar',     'alice@edumentor.com',   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'STUDENT'),
('Bob Sharma',      'bob@edumentor.com',     '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'STUDENT'),
('Clara Singh',     'clara@edumentor.com',   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'STUDENT'),
('Dev Verma',       'dev@edumentor.com',     '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'STUDENT'),
('Eva Patel',       'eva@edumentor.com',     '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'STUDENT');

-- ── Courses ──────────────────────────────────────────────────
INSERT INTO courses (title, description, category, duration, price, instructor) VALUES
('Java Fullstack Development',
 'Comprehensive Java course covering OOP, Spring Boot, REST APIs and React integration.',
 'Programming', '12 weeks', 0.00, 'Dr. Ramesh Kumar'),

('React JS Development',
 'Modern React with Hooks, Redux, React Router and full project development.',
 'Web Dev', '8 weeks', 0.00, 'Prof. Anjali Mehta'),

('C Programming Fundamentals',
 'Core C programming from basics to advanced data structures and algorithms.',
 'Programming', '6 weeks', 0.00, 'Dr. Ramesh Kumar'),

('Database Management Systems',
 'SQL, normalization, transactions, indexing and database design.',
 'Database', '8 weeks', 0.00, 'Prof. Anjali Mehta'),

('Data Structures & Algorithms',
 'Arrays, Linked Lists, Trees, Graphs, Sorting, Searching and complexity.',
 'CS Core', '10 weeks', 0.00, 'Dr. Ramesh Kumar'),

('Machine Learning with Python',
 'Supervised, unsupervised learning, model evaluation and deployment.',
 'AI/ML', '14 weeks', 0.00, 'Prof. Anjali Mehta');

-- ── Assignments ───────────────────────────────────────────────
INSERT INTO assignments (title, description, type, due_date, status, course_id, teacher_id) VALUES
('Java OOP Assignment',       'Implement inheritance and polymorphism examples.', 'Programming', '2026-04-05', 'PENDING',   1, 2),
('React Hooks Project',       'Build a todo-app using useState and useEffect.',    'Project',     '2026-04-08', 'PENDING',   2, 3),
('Array Programs Set 1',      'Write programs for array operations in C.',          'Coding',      '2026-03-28', 'SUBMITTED', 3, 2),
('Linked List Questions',     'Implement singly and doubly linked list.',           'Coding',      '2026-03-25', 'GRADED',    5, 2),
('SQL Queries Practice',      'Write complex SQL queries for a library DB.',        'Database',    '2026-04-10', 'PENDING',   4, 3),
('Normalization Exercise',    'Normalize the given un-normalized relation.',        'Theory',      '2026-03-30', 'SUBMITTED', 4, 3);

-- ── Attendance ────────────────────────────────────────────────
INSERT INTO attendance (student_id, course_id, attendance_date, status, marked_by) VALUES
(4, 1, '2026-03-01', 'PRESENT', 2),
(4, 1, '2026-03-03', 'PRESENT', 2),
(4, 1, '2026-03-05', 'ABSENT',  2),
(4, 1, '2026-03-08', 'PRESENT', 2),
(5, 1, '2026-03-01', 'PRESENT', 2),
(5, 1, '2026-03-03', 'ABSENT',  2),
(5, 1, '2026-03-05', 'PRESENT', 2),
(6, 2, '2026-03-02', 'PRESENT', 3),
(6, 2, '2026-03-04', 'PRESENT', 3),
(6, 2, '2026-03-06', 'ABSENT',  3),
(7, 2, '2026-03-02', 'ABSENT',  3),
(7, 2, '2026-03-04', 'PRESENT', 3),
(8, 3, '2026-03-01', 'PRESENT', 2),
(8, 3, '2026-03-03', 'PRESENT', 2);

-- ============================================================
--  VERIFICATION QUERIES (optional – run after insert)
-- ============================================================
-- SELECT * FROM users;
-- SELECT * FROM courses;
-- SELECT * FROM assignments;
-- SELECT * FROM attendance;
