package com.gymmanagement.dto.auth;

import com.gymmanagement.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    private String token;
    private String username;
    private Role role;

}