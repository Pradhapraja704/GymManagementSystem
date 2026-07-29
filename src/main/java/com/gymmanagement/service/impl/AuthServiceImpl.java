package com.gymmanagement.service.impl;

import com.gymmanagement.dto.auth.LoginRequestDTO;
import com.gymmanagement.dto.auth.LoginResponseDTO;
import com.gymmanagement.entity.Role;
import com.gymmanagement.security.JwtService;
import com.gymmanagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtService jwtService;

    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getUsername(),
                        loginRequestDTO.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(
                loginRequestDTO.getUsername()
        );

        String token = jwtService.generateToken(userDetails);

        String authority = userDetails.getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        Role role = Role.valueOf(authority.replace("ROLE_", ""));

        return new LoginResponseDTO(
                token,
                userDetails.getUsername(),
                role
        );
    }
}