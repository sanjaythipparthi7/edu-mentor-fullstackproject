package com.edumentor.repository;

import com.edumentor.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    List<Attendance> findByCourseId(Long courseId);
    List<Attendance> findByStudentIdAndCourseId(Long studentId, Long courseId);
    List<Attendance> findByCourseIdAndAttendanceDate(Long courseId, LocalDate date);
    long countByStudentIdAndCourseIdAndStatus(Long studentId, Long courseId, Attendance.Status status);
}
