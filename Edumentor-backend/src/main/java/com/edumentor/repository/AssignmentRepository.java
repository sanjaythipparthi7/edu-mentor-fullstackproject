package com.edumentor.repository;

import com.edumentor.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourseId(Long courseId);
    List<Assignment> findByTeacherId(Long teacherId);
    List<Assignment> findByStatus(Assignment.Status status);
}
