package com.edumentor.controller;

import com.edumentor.dto.StudentCourseDto;
import com.edumentor.service.StudentCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class StudentCourseController {

    private final StudentCourseService studentCourseService;

    // ── POST enroll student ───────────────────────────────────────
    @PostMapping
    public ResponseEntity<?> enroll(@RequestBody Map<String, Long> req) {
        try {
            Long studentId = req.get("studentId");
            Long courseId = req.get("courseId");
            return ResponseEntity.status(HttpStatus.CREATED).body(studentCourseService.enrollStudent(studentId, courseId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ── GET courses for a student ─────────────────────────────────
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<StudentCourseDto>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentCourseService.getCoursesForStudent(studentId));
    }

    // ── GET students in a course ──────────────────────────────────
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<StudentCourseDto>> getByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(studentCourseService.getStudentsForCourse(courseId));
    }
}
