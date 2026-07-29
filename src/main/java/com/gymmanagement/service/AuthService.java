package com.gymmanagement.service;

import com.gymmanagement.dto.auth.LoginRequestDTO;
import com.gymmanagement.dto.auth.LoginResponseDTO;

public interface AuthService {

    LoginResponseDTO login(LoginRequestDTO loginRequestDTO);

}