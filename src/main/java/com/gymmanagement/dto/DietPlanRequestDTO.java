package com.gymmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class DietPlanRequestDTO {

    @NotNull(message = "Member ID is required")
    private Long memberId;

    @NotBlank(message = "Breakfast is required")
    private String breakfast;

    @NotBlank(message = "Lunch is required")
    private String lunch;

    @NotBlank(message = "Dinner is required")
    private String dinner;

    @NotBlank(message = "Snacks are required")
    private String snacks;

    @NotNull(message = "Calories are required")
    @Min(value = 1, message = "Calories must be greater than 0")
    private Integer calories;

    @NotBlank(message = "Notes are required")
    private String notes;

    @NotNull(message = "Created date is required")
    private LocalDate createdDate;

    @NotNull(message = "Active status is required")
    private Boolean active;

    public DietPlanRequestDTO() {
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getBreakfast() {
        return breakfast;
    }

    public void setBreakfast(String breakfast) {
        this.breakfast = breakfast;
    }

    public String getLunch() {
        return lunch;
    }

    public void setLunch(String lunch) {
        this.lunch = lunch;
    }

    public String getDinner() {
        return dinner;
    }

    public void setDinner(String dinner) {
        this.dinner = dinner;
    }

    public String getSnacks() {
        return snacks;
    }

    public void setSnacks(String snacks) {
        this.snacks = snacks;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
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