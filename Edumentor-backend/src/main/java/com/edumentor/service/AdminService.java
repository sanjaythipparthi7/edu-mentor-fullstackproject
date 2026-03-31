package com.edumentor.service;

import com.edumentor.dto.UserDto;
import com.edumentor.entity.User;
import com.edumentor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    // ── Convert entity → DTO (strips password) ───────────────────
    private UserDto toDto(User u) {
        return UserDto.builder()
                .id(u.getId())
                .name(u.getName())
                .email(u.getEmail())
                .role(u.getRole().name())
                .isActive(u.getIsActive())
                .createdAt(u.getCreatedAt())
                .build();
    }

    // ── Get All Users ─────────────────────────────────────────────
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    // ── Get by role ───────────────────────────────────────────────
    public List<UserDto> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role).stream().map(this::toDto).collect(Collectors.toList());
    }

    // ── Get User by ID ────────────────────────────────────────────
    public UserDto getUserById(Long id) {
        return toDto(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id)));
    }

    // ── Delete User ───────────────────────────────────────────────
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // ── Update User Role / Active Status ──────────────────────────
    public UserDto updateUser(Long id, User.Role role, Boolean isActive) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        if (role     != null) user.setRole(role);
        if (isActive != null) user.setIsActive(isActive);
        return toDto(userRepository.save(user));
    }

    // ── Stats ─────────────────────────────────────────────────────
    public long countByRole(User.Role role) {
        return userRepository.findByRole(role).size();
    }
}
