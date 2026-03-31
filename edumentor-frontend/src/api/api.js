import axios from "axios";

// ─── Base Axios Instance ──────────────────────────────────────────────────────
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// ─── Request Interceptor – Attach JWT ────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor – Auto‑logout on 401 ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const loginUser    = (data) => api.post("/api/users/login", data);
export const registerUser = (data) => api.post("/api/users/register", data);

// ─── Users (Admin) ────────────────────────────────────────────────────────────
export const getAllUsers  = ()     => api.get("/api/admin/users");
export const deleteUser  = (id)   => api.delete(`/api/admin/users/${id}`);
export const updateUser  = (id, data) => api.put(`/api/admin/users/${id}`, data);

// ─── Courses ──────────────────────────────────────────────────────────────────
export const getCourses    = ()       => api.get("/api/courses");
export const createCourse  = (data)   => api.post("/api/courses", data);
export const updateCourse  = (id, data) => api.put(`/api/courses/${id}`, data);
export const deleteCourse  = (id)     => api.delete(`/api/courses/${id}`);

// ─── Assignments ──────────────────────────────────────────────────────────────
export const getAssignments  = ()       => api.get("/api/assignments");
export const createAssignment= (data)   => api.post("/api/assignments", data);
export const deleteAssignment= (id)     => api.delete(`/api/assignments/${id}`);
export const getCourseAssignments = (courseId) => api.get(`/api/assignments/course/${courseId}`);
export const getTeacherAssignments= (teacherId) => api.get(`/api/assignments/teacher/${teacherId}`);

// ─── Attendance ───────────────────────────────────────────────────────────────
export const getAttendance   = ()       => api.get("/api/attendance");
export const markAttendance  = (data)   => api.post("/api/attendance", data);
export const getStudentAttendanceSummary = (studentId) => api.get(`/api/attendance/student/${studentId}/summary`);
export const markBulkAttendance          = (data) => api.post("/api/attendance/bulk", data);
export const getCourseAttendanceDate     = (courseId, date) => api.get(`/api/attendance/course/${courseId}/date?date=${date}`);

// ─── Profile ──────────────────────────────────────────────────────────────────
export const getProfile      = ()       => api.get("/api/users/profile");
export const updateProfile   = (data)   => api.put("/api/users/profile", data);
export const changePassword  = (data)   => api.put("/api/users/change-password", data);

// ─── Enrollments ──────────────────────────────────────────────────────────────
export const enrollCourse        = (data) => api.post("/api/enrollments", data);
export const getStudentCourses   = (studentId) => api.get(`/api/enrollments/student/${studentId}`);
export const getCourseStudents   = (courseId) => api.get(`/api/enrollments/course/${courseId}`);

// ─── Timetable ────────────────────────────────────────────────────────────────
export const getTimetables       = () => api.get("/api/timetable");
export const getCourseTimetable  = (courseId) => api.get(`/api/timetable/course/${courseId}`);
export const createTimetable     = (data) => api.post("/api/timetable", data);
export const updateTimetable     = (id, data) => api.put(`/api/timetable/${id}`, data);
export const deleteTimetable     = (id) => api.delete(`/api/timetable/${id}`);

export default api;
