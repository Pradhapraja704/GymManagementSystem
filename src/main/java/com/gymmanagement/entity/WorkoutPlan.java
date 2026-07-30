package com.gymmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "workout_plans")
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    private Long memberId;

    private String planName;

    private String goal;

    private Integer durationWeeks;

    @Column(length = 1000)
    private String description;

    private LocalDate createdDate;

    private Boolean active;

    public WorkoutPlan() {
    }

    public WorkoutPlan(Long planId, Long memberId, String planName, String goal,
                       Integer durationWeeks, String description,
                       LocalDate createdDate, Boolean active) {
        this.planId = planId;
        this.memberId = memberId;
        this.planName = planName;
        this.goal = goal;
        this.durationWeeks = durationWeeks;
        this.description = description;
        this.createdDate = createdDate;
        this.active = active;
    }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public Integer getDurationWeeks() {
        return durationWeeks;
    }

    public void setDurationWeeks(Integer durationWeeks) {
        this.durationWeeks = durationWeeks;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}