package com.gymmanagement.service;

import com.gymmanagement.dto.WorkoutPlanRequestDTO;
import com.gymmanagement.dto.WorkoutPlanResponseDTO;

import java.util.List;

public interface WorkoutPlanService {

    WorkoutPlanResponseDTO addWorkoutPlan(WorkoutPlanRequestDTO workoutPlanRequestDTO);

    List<WorkoutPlanResponseDTO> getAllWorkoutPlans();

    WorkoutPlanResponseDTO getWorkoutPlanById(Long id);

    WorkoutPlanResponseDTO updateWorkoutPlan(Long id, WorkoutPlanRequestDTO workoutPlanRequestDTO);

    void deleteWorkoutPlan(Long id);

    List<WorkoutPlanResponseDTO> getWorkoutPlansByMemberId(Long memberId);

    List<WorkoutPlanResponseDTO> searchWorkoutPlansByName(String planName);

    List<WorkoutPlanResponseDTO> searchWorkoutPlansByGoal(String goal);

    List<WorkoutPlanResponseDTO> getWorkoutPlansWithPagination(
            int page,
            int size,
            String sortBy,
            String direction
    );
}