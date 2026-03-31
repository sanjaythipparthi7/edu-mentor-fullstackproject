package com.edumentor.dto;

import lombok.Data;
import jakarta.validation.constraints.Size;

@Data
public class ChangePasswordRequest {
    private String currentPassword;

    @Size(min = 6, message = "New password must be at least 6 characters")
    private String newPassword;
}
