package com.gymmanagement.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "trainer_assignments")
public class TrainerAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long trainerId;

    @Column(nullable = false)
    private LocalDate assignedDate;

    @Column(nullable = false)
    private boolean active;

    private String remarks;

    public TrainerAssignment() {
    }

    public TrainerAssignment(Long assignmentId, Long memberId, Long trainerId,
                             LocalDate assignedDate, boolean active, String remarks) {
        this.assignmentId = assignmentId;
        this.memberId = memberId;
        this.trainerId = trainerId;
        this.assignedDate = assignedDate;
        this.active = active;
        this.remarks = remarks;
    }

    public Long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public Long getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(Long trainerId) {
        this.trainerId = trainerId;
    }

    public LocalDate getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDate assignedDate) {
        this.assignedDate = assignedDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}