package com.edumentor.controller;

import com.edumentor.dto.UserDto;
import com.edumentor.entity.User;
import com.edumentor.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    // ── GET /api/admin/users ──────────────────────────────────────
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // ── GET /api/admin/users/{id} ─────────────────────────────────
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(adminService.getUserById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ── DELETE /api/admin/users/{id} ──────────────────────────────
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            adminService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ── PUT /api/admin/users/{id} ─────────────────────────────────
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        try {
            User.Role role     = body.get("role") != null
                    ? User.Role.valueOf(body.get("role").toUpperCase()) : null;
            Boolean isActive   = body.get("isActive") != null
                    ? Boolean.valueOf(body.get("isActive")) : null;

            UserDto updated = adminService.updateUser(id, role, isActive);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ── GET /api/admin/stats ──────────────────────────────────────
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalUsers",    adminService.getAllUsers().size());
        stats.put("totalStudents", adminService.countByRole(User.Role.STUDENT));
        stats.put("totalTeachers", adminService.countByRole(User.Role.TEACHER));
        stats.put("totalAdmins",   adminService.countByRole(User.Role.ADMIN));
        return ResponseEntity.ok(stats);
    }
}
