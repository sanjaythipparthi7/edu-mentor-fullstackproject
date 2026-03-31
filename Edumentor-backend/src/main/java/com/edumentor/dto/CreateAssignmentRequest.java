package com.edumentor.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateAssignmentRequest {
    private String title;
    private String description;
    private String type;
    private String dueDate;  // ISO date string yyyy-MM-dd
    private Long courseId;
    private Long teacherId;
}
