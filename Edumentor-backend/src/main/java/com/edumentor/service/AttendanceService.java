package com.edumentor.service;

import com.edumentor.dto.AttendanceDto;
import com.edumentor.dto.MarkAttendanceRequest;
import com.edumentor.entity.Attendance;
import com.edumentor.entity.Course;
import com.edumentor.entity.User;
import com.edumentor.repository.AttendanceRepository;
import com.edumentor.repository.CourseRepository;
import com.edumentor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    // ── Convert entity → DTO ─────────────────────────────────────
    private AttendanceDto toDto(Attendance a) {
        return AttendanceDto.builder()
                .id(a.getId())
                .studentId(a.getStudent().getId())
                .studentName(a.getStudent().getName())
                .studentEmail(a.getStudent().getEmail())
                .courseId(a.getCourse().getId())
                .courseTitle(a.getCourse().getTitle())
                .attendanceDate(a.getAttendanceDate())
                .status(a.getStatus().name())
                .markedBy(a.getMarkedBy())
                .createdAt(a.getCreatedAt())
                .build();
    }

    public List<AttendanceDto> getAllAttendance() {
        return attendanceRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<AttendanceDto> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<AttendanceDto> getAttendanceByCourse(Long courseId) {
        return attendanceRepository.findByCourseId(courseId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    // ── Grouped summary per course for a student ─────────────────
    public List<Map<String, Object>> getAttendanceSummaryByStudent(Long studentId) {
        // Get all unique courses for this student
        List<Attendance> records = attendanceRepository.findByStudentId(studentId);
        Map<Long, String> courseNames = new LinkedHashMap<>();
        for (Attendance a : records) {
            courseNames.put(a.getCourse().getId(), a.getCourse().getTitle());
        }

        return courseNames.entrySet().stream().map(entry -> {
            Long courseId = entry.getKey();
            String courseTitle = entry.getValue();
            long present = attendanceRepository.countByStudentIdAndCourseIdAndStatus(
                    studentId, courseId, Attendance.Status.PRESENT);
            long total = attendanceRepository.findByStudentIdAndCourseId(studentId, courseId).size();
            double pct = total > 0 ? Math.round((present * 100.0 / total) * 10.0) / 10.0 : 0;

            Map<String, Object> m = new LinkedHashMap<>();
            m.put("courseId", courseId);
            m.put("subject", courseTitle);
            m.put("present", present);
            m.put("total", total);
            m.put("percentage", pct);
            return m;
        }).collect(Collectors.toList());
    }

    // ── Bulk mark attendance (teacher action) ─────────────────────
    public List<AttendanceDto> markBulk(MarkAttendanceRequest req) {
        Course course = courseRepository.findById(req.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        LocalDate date = LocalDate.parse(req.getAttendanceDate());

        List<Attendance> records = req.getStudents().stream().map(s -> {
            User student = userRepository.findById(s.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found: " + s.getStudentId()));
            return Attendance.builder()
                    .student(student)
                    .course(course)
                    .attendanceDate(date)
                    .status(Attendance.Status.valueOf(s.getStatus()))
                    .markedBy(req.getMarkedBy())
                    .build();
        }).collect(Collectors.toList());

        return attendanceRepository.saveAll(records).stream().map(this::toDto).collect(Collectors.toList());
    }

    // ── Single mark ───────────────────────────────────────────────
    public AttendanceDto markAttendance(Attendance attendance) {
        return toDto(attendanceRepository.save(attendance));
    }

    public long countPresent(Long studentId, Long courseId) {
        return attendanceRepository.countByStudentIdAndCourseIdAndStatus(
                studentId, courseId, Attendance.Status.PRESENT);
    }

    public long countTotal(Long studentId, Long courseId) {
        return attendanceRepository.findByStudentIdAndCourseId(studentId, courseId).size();
    }

    // ── Students list for a course on a date (for teacher) ────────
    public List<AttendanceDto> getAttendanceByCourseAndDate(Long courseId, LocalDate date) {
        return attendanceRepository.findByCourseIdAndAttendanceDate(courseId, date)
                .stream().map(this::toDto).collect(Collectors.toList());
    }
}
