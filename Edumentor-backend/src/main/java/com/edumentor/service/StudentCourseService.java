package com.edumentor.service;

import com.edumentor.dto.StudentCourseDto;
import com.edumentor.entity.Course;
import com.edumentor.entity.StudentCourse;
import com.edumentor.entity.User;
import com.edumentor.repository.CourseRepository;
import com.edumentor.repository.StudentCourseRepository;
import com.edumentor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentCourseService {

    private final StudentCourseRepository studentCourseRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    private StudentCourseDto toDto(StudentCourse sc) {
        return StudentCourseDto.builder()
                .id(sc.getId())
                .studentId(sc.getStudent().getId())
                .studentName(sc.getStudent().getName())
                .courseId(sc.getCourse().getId())
                .courseTitle(sc.getCourse().getTitle())
                .description(sc.getCourse().getDescription())
                .category(sc.getCourse().getCategory())
                .instructor(sc.getCourse().getInstructor())
                .progress(sc.getProgress())
                .enrolledAt(sc.getEnrolledAt())
                .build();
    }

    public StudentCourseDto enrollStudent(Long studentId, Long courseId) {
        if (studentCourseRepository.existsByStudentIdAndCourseId(studentId, courseId)) {
            throw new RuntimeException("Student already enrolled in this course");
        }

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        StudentCourse sc = StudentCourse.builder()
                .student(student)
                .course(course)
                .build();

        return toDto(studentCourseRepository.save(sc));
    }

    public List<StudentCourseDto> getCoursesForStudent(Long studentId) {
        return studentCourseRepository.findByStudentId(studentId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<StudentCourseDto> getStudentsForCourse(Long courseId) {
        return studentCourseRepository.findByCourseId(courseId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }
}
