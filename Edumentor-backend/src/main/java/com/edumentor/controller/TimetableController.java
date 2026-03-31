package com.edumentor.controller;

import com.edumentor.dto.TimetableDto;
import com.edumentor.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
public class TimetableController {

    private final TimetableService timetableService;

    // ── GET all timetable entries ─────────────────────────────────
    @GetMapping
    public ResponseEntity<List<TimetableDto>> getAll() {
        return ResponseEntity.ok(timetableService.getAll());
    }

    // ── GET timetable by course ───────────────────────────────────
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<TimetableDto>> getByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(timetableService.getByCourse(courseId));
    }

    // ── POST create timetable entry (admin) ───────────────────────
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@RequestBody Map<String, String> req) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(timetableService.create(
                    Long.valueOf(req.get("courseId")),
                    req.get("dayOfWeek"),
                    req.get("startTime"),
                    req.get("endTime"),
                    req.get("roomNumber"),
                    req.get("section")
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ── PUT update timetable entry (admin) ────────────────────────
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, String> req) {
        try {
            return ResponseEntity.ok(timetableService.update(
                    id,
                    req.get("dayOfWeek"),
                    req.get("startTime"),
                    req.get("endTime"),
                    req.get("roomNumber"),
                    req.get("section")
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ── DELETE timetable entry (admin) ────────────────────────────
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        timetableService.delete(id);
        return ResponseEntity.ok("Timetable entry deleted successfully");
    }
}
