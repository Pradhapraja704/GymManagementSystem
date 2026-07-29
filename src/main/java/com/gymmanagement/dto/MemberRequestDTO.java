package com.gymmanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberRequestDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    private String gender;
    private LocalDate dateOfBirth;
    private String address;
    private LocalDate joinDate;
    private LocalDate membershipExpiryDate;
    private String membershipType;
    private Double height;
    private Double weight;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private Boolean active;
}