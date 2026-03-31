package com.edumentor.controller;

import com.edumentor.dto.AttendanceDto;
import com.edumentor.dto.MarkAttendanceRequest;
import com.edumentor.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    // ── GET all attendance (admin) ────────────────────────────────
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<AttendanceDto>> getAll() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }

    // ── GET student's own attendance records ──────────────────────
    @GetMapping("/student/{id}")
    public ResponseEntity<List<AttendanceDto>> getByStudent(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceByStudent(id));
    }

    // ── GET student's attendance summary (grouped by course) ───────
    @GetMapping("/student/{id}/summary")
    public ResponseEntity<List<Map<String, Object>>> getSummaryByStudent(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceSummaryByStudent(id));
    }

    // ── GET attendance for a course ───────────────────────────────
    @GetMapping("/course/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<AttendanceDto>> getByCourse(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceByCourse(id));
    }

    // ── GET attendance for a course on a specific date ────────────
    @GetMapping("/course/{id}/date")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<AttendanceDto>> getByCourseAndDate(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getAttendanceByCourseAndDate(id, date));
    }

    // ── GET summary for specific student + course ─────────────────
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary(
            @RequestParam Long studentId,
            @RequestParam Long courseId) {
        long present = attendanceService.countPresent(studentId, courseId);
        long total   = attendanceService.countTotal(studentId, courseId);
        double pct   = total > 0 ? Math.round((present * 100.0 / total) * 10.0) / 10.0 : 0;

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("present",    present);
        summary.put("total",      total);
        summary.put("percentage", pct);
        return ResponseEntity.ok(summary);
    }

    // ── POST bulk mark attendance (teacher) ───────────────────────
    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<AttendanceDto>> markBulk(@RequestBody MarkAttendanceRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(attendanceService.markBulk(req));
    }
}
