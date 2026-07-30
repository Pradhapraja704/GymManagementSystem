package com.gymmanagement.mapper;

import com.gymmanagement.dto.WorkoutPlanRequestDTO;
import com.gymmanagement.dto.WorkoutPlanResponseDTO;
import com.gymmanagement.entity.WorkoutPlan;
import org.springframework.stereotype.Component;

@Component
public class WorkoutPlanMapper {

    public WorkoutPlan toEntity(WorkoutPlanRequestDTO dto) {

        WorkoutPlan workoutPlan = new WorkoutPlan();

        workoutPlan.setMemberId(dto.getMemberId());
        workoutPlan.setPlanName(dto.getPlanName());
        workoutPlan.setGoal(dto.getGoal());
        workoutPlan.setDurationWeeks(dto.getDurationWeeks());
        workoutPlan.setDescription(dto.getDescription());
        workoutPlan.setCreatedDate(dto.getCreatedDate());
        workoutPlan.setActive(dto.getActive());

        return workoutPlan;
    }

    public WorkoutPlanResponseDTO toResponseDTO(WorkoutPlan workoutPlan) {

        WorkoutPlanResponseDTO dto = new WorkoutPlanResponseDTO();

        dto.setPlanId(workoutPlan.getPlanId());
        dto.setMemberId(workoutPlan.getMemberId());
        dto.setPlanName(workoutPlan.getPlanName());
        dto.setGoal(workoutPlan.getGoal());
        dto.setDurationWeeks(workoutPlan.getDurationWeeks());
        dto.setDescription(workoutPlan.getDescription());
        dto.setCreatedDate(workoutPlan.getCreatedDate());
        dto.setActive(workoutPlan.getActive());

        return dto;
    }
}