package com.edumentor.service;

import com.edumentor.dto.TimetableDto;
import com.edumentor.entity.Course;
import com.edumentor.entity.Timetable;
import com.edumentor.repository.CourseRepository;
import com.edumentor.repository.TimetableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimetableService {

    private final TimetableRepository timetableRepository;
    private final CourseRepository courseRepository;

    private TimetableDto toDto(Timetable t) {
        return TimetableDto.builder()
                .id(t.getId())
                .courseId(t.getCourse().getId())
                .courseTitle(t.getCourse().getTitle())
                .instructorName(t.getCourse().getInstructor())
                .dayOfWeek(t.getDayOfWeek().name())
                .startTime(t.getStartTime())
                .endTime(t.getEndTime())
                .roomNumber(t.getRoomNumber())
                .section(t.getSection())
                .build();
    }

    public List<TimetableDto> getAll() {
        return timetableRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<TimetableDto> getByCourse(Long courseId) {
        return timetableRepository.findByCourseId(courseId).stream().map(this::toDto).collect(Collectors.toList());
    }

    public TimetableDto create(Long courseId, String day, String startTime, String endTime,
                               String room, String section) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found: " + courseId));

        Timetable t = Timetable.builder()
                .course(course)
                .dayOfWeek(Timetable.DayOfWeek.valueOf(day.toUpperCase()))
                .startTime(LocalTime.parse(startTime))
                .endTime(LocalTime.parse(endTime))
                .roomNumber(room)
                .section(section)
                .build();

        return toDto(timetableRepository.save(t));
    }

    public TimetableDto update(Long id, String day, String startTime, String endTime,
                               String room, String section) {
        Timetable t = timetableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable entry not found: " + id));

        if (day != null)       t.setDayOfWeek(Timetable.DayOfWeek.valueOf(day.toUpperCase()));
        if (startTime != null) t.setStartTime(LocalTime.parse(startTime));
        if (endTime != null)   t.setEndTime(LocalTime.parse(endTime));
        if (room != null)      t.setRoomNumber(room);
        if (section != null)   t.setSection(section);

        return toDto(timetableRepository.save(t));
    }

    public void delete(Long id) {
        timetableRepository.deleteById(id);
    }
}
