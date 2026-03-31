package com.edumentor.service;

import com.edumentor.entity.Course;
import com.edumentor.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        Course course = getCourseById(id);
        course.setTitle(updatedCourse.getTitle());
        course.setDescription(updatedCourse.getDescription());
        course.setCategory(updatedCourse.getCategory());
        course.setDuration(updatedCourse.getDuration());
        course.setPrice(updatedCourse.getPrice());
        course.setInstructor(updatedCourse.getInstructor());
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    public List<Course> getActiveCourses() {
        return courseRepository.findByIsActiveTrue();
    }

    public List<Course> searchCourses(String keyword) {
        return courseRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
