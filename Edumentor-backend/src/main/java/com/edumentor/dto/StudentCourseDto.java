package com.edumentor.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentCourseDto {
    private Long id;
    private Long studentId;
    private String studentName;
    private Long courseId;
    private String courseTitle;
    private String description;
    private String category;
    private String instructor;
    private Integer progress;
    private LocalDateTime enrolledAt;
}
