package com.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "members")
@Data
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
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