package com.edumentor.repository;

import com.edumentor.entity.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    List<Timetable> findByCourseId(Long courseId);
    List<Timetable> findByDayOfWeek(Timetable.DayOfWeek day);
    List<Timetable> findByCourse_InstructorContainingIgnoreCase(String instructorName);
}
