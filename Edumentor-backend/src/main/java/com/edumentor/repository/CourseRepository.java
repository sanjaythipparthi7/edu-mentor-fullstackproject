package com.edumentor.repository;

import com.edumentor.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByIsActiveTrue();
    List<Course> findByCategory(String category);
    List<Course> findByTitleContainingIgnoreCase(String title);
}
