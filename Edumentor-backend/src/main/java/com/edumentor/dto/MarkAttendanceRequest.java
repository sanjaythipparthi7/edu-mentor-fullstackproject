package com.edumentor.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarkAttendanceRequest {
    private Long courseId;
    private String attendanceDate;  // yyyy-MM-dd
    private Long markedBy;          // teacher's userId
    private List<StudentStatus> students;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class StudentStatus {
        private Long studentId;
        private String status;  // PRESENT | ABSENT
    }
}
