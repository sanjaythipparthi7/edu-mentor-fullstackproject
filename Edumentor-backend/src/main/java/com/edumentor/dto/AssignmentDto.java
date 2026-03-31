package com.edumentor.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentDto {
    private Long id;
    private String title;
    private String description;
    private String type;
    private LocalDate dueDate;
    private String status;
    private Long courseId;
    private String courseTitle;
    private Long teacherId;
    private String teacherName;
    private LocalDateTime createdAt;
}
