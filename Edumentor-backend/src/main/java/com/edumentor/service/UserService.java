package com.edumentor.service;

import com.edumentor.dto.*;
import com.edumentor.entity.User;
import com.edumentor.repository.UserRepository;
import com.edumentor.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ── Register ──────────────────────────────────────────────────
    public String register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered: " + req.getEmail());
        }

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(User.Role.valueOf(req.getRole().toUpperCase()))
                .build();

        userRepository.save(user);
        return "User registered successfully!";
    }

    // ── Login ─────────────────────────────────────────────────────
    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.getIsActive()) {
            throw new RuntimeException("Account is deactivated. Contact admin.");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        LoginResponse.UserDto userDto = new LoginResponse.UserDto(
                user.getId(), user.getName(), user.getEmail(), user.getRole().name()
        );

        return new LoginResponse(token, userDto);
    }

    // ── Get Profile ───────────────────────────────────────────────
    public Map<String, Object> getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> profile = new LinkedHashMap<>();
        profile.put("id",        user.getId());
        profile.put("name",      user.getName());
        profile.put("email",     user.getEmail());
        profile.put("role",      user.getRole().name());
        profile.put("createdAt", user.getCreatedAt());
        return profile;
    }

    // ── Update Profile ────────────────────────────────────────────
    public String updateProfile(String email, UpdateProfileRequest req) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (req.getName()  != null) user.setName(req.getName());
        if (req.getEmail() != null && !req.getEmail().equals(email)) {
            if (userRepository.existsByEmail(req.getEmail())) {
                throw new RuntimeException("Email already in use");
            }
            user.setEmail(req.getEmail());
        }
        userRepository.save(user);
        return "Profile updated successfully";
    }

    // ── Change Password ───────────────────────────────────────────
    public String changePassword(String email, ChangePasswordRequest req) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
        return "Password changed successfully";
    }
}
