package com.edumentor.service;

import com.edumentor.dto.AssignmentDto;
import com.edumentor.dto.CreateAssignmentRequest;
import com.edumentor.entity.Assignment;
import com.edumentor.entity.Course;
import com.edumentor.entity.User;
import com.edumentor.repository.AssignmentRepository;
import com.edumentor.repository.CourseRepository;
import com.edumentor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    // ── Convert entity → DTO ─────────────────────────────────────
    private AssignmentDto toDto(Assignment a) {
        return AssignmentDto.builder()
                .id(a.getId())
                .title(a.getTitle())
                .description(a.getDescription())
                .type(a.getType())
                .dueDate(a.getDueDate())
                .status(a.getStatus() != null ? a.getStatus().name() : "PENDING")
                .courseId(a.getCourse() != null ? a.getCourse().getId() : null)
                .courseTitle(a.getCourse() != null ? a.getCourse().getTitle() : null)
                .teacherId(a.getTeacher() != null ? a.getTeacher().getId() : null)
                .teacherName(a.getTeacher() != null ? a.getTeacher().getName() : null)
                .createdAt(a.getCreatedAt())
                .build();
    }

    public List<AssignmentDto> getAllAssignments() {
        return assignmentRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public AssignmentDto getAssignmentById(Long id) {
        return toDto(assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found: " + id)));
    }

    // ── Create via structured request ──────────────────────────────
    public AssignmentDto createAssignment(CreateAssignmentRequest req) {
        Course course = courseRepository.findById(req.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found: " + req.getCourseId()));
        User teacher = userRepository.findById(req.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found: " + req.getTeacherId()));

        Assignment a = Assignment.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .type(req.getType())
                .dueDate(LocalDate.parse(req.getDueDate()))
                .course(course)
                .teacher(teacher)
                .status(Assignment.Status.PENDING)
                .build();

        return toDto(assignmentRepository.save(a));
    }

    public AssignmentDto updateAssignment(Long id, CreateAssignmentRequest req) {
        Assignment a = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found: " + id));

        if (req.getTitle() != null)       a.setTitle(req.getTitle());
        if (req.getDescription() != null) a.setDescription(req.getDescription());
        if (req.getType() != null)        a.setType(req.getType());
        if (req.getDueDate() != null)     a.setDueDate(LocalDate.parse(req.getDueDate()));

        if (req.getCourseId() != null) {
            Course course = courseRepository.findById(req.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            a.setCourse(course);
        }

        return toDto(assignmentRepository.save(a));
    }

    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }

    public List<AssignmentDto> getByCourseId(Long courseId) {
        return assignmentRepository.findByCourseId(courseId).stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<AssignmentDto> getByTeacherId(Long teacherId) {
        return assignmentRepository.findByTeacherId(teacherId).stream().map(this::toDto).collect(Collectors.toList());
    }

    // ── Get assignments for courses a student is enrolled in ───────
    public List<AssignmentDto> getByStatus(Assignment.Status status) {
        return assignmentRepository.findByStatus(status).stream().map(this::toDto).collect(Collectors.toList());
    }
}
