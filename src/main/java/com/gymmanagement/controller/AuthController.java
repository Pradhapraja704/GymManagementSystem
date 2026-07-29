package com.gymmanagement.controller;

import com.gymmanagement.dto.auth.LoginRequestDTO;
import com.gymmanagement.dto.auth.LoginResponseDTO;
import com.gymmanagement.response.ApiResponse;
import com.gymmanagement.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
            @Valid @RequestBody LoginRequestDTO loginRequestDTO) {

        LoginResponseDTO response = authService.login(loginRequestDTO);

        ApiResponse<LoginResponseDTO> apiResponse =
                new ApiResponse<>(
                        true,
                        "Login Successful",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }
}