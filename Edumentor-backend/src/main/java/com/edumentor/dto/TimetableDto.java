package com.edumentor.dto;

import lombok.*;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimetableDto {
    private Long id;
    private Long courseId;
    private String courseTitle;
    private String instructorName;
    private String dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private String roomNumber;
    private String section;
}
