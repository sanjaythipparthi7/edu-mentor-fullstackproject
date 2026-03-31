package com.edumentor.controller;

import com.edumentor.dto.AssignmentDto;
import com.edumentor.dto.CreateAssignmentRequest;
import com.edumentor.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    // ── GET all assignments ───────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<AssignmentDto>> getAll() {
        return ResponseEntity.ok(assignmentService.getAllAssignments());
    }

    // ── GET assignment by ID ──────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(assignmentService.getAssignmentById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ── GET assignments for a course ──────────────────────────────
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<AssignmentDto>> getByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(assignmentService.getByCourseId(courseId));
    }

    // ── GET assignments by teacher ────────────────────────────────
    @GetMapping("/teacher/{teacherId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<AssignmentDto>> getByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(assignmentService.getByTeacherId(teacherId));
    }

    // ── POST create assignment (teacher/admin) ─────────────────────
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> create(@RequestBody CreateAssignmentRequest req) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(assignmentService.createAssignment(req));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ── PUT update assignment (teacher/admin) ──────────────────────
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CreateAssignmentRequest req) {
        try {
            return ResponseEntity.ok(assignmentService.updateAssignment(id, req));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ── DELETE assignment ─────────────────────────────────────────
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            assignmentService.deleteAssignment(id);
            return ResponseEntity.ok("Assignment deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
