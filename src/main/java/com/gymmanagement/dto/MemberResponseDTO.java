package com.gymmanagement.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberResponseDTO {

    private Long memberId;
    private String firstName;
    private String lastName;
    private String email;
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