package com.gymmanagement.controller;

import com.gymmanagement.dto.WorkoutPlanRequestDTO;
import com.gymmanagement.dto.WorkoutPlanResponseDTO;
import com.gymmanagement.service.WorkoutPlanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workout-plans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping
    public WorkoutPlanResponseDTO addWorkoutPlan(
            @Valid @RequestBody WorkoutPlanRequestDTO workoutPlanRequestDTO) {

        return workoutPlanService.addWorkoutPlan(workoutPlanRequestDTO);
    }

    @GetMapping
    public List<WorkoutPlanResponseDTO> getAllWorkoutPlans() {
        return workoutPlanService.getAllWorkoutPlans();
    }

    @GetMapping("/page")
    public List<WorkoutPlanResponseDTO> getWorkoutPlansWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "planId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return workoutPlanService.getWorkoutPlansWithPagination(
                page,
                size,
                sortBy,
                direction
        );
    }

    @GetMapping("/{id:\\d+}")
    public WorkoutPlanResponseDTO getWorkoutPlanById(@PathVariable Long id) {
        return workoutPlanService.getWorkoutPlanById(id);
    }

    @GetMapping("/member/{memberId}")
    public List<WorkoutPlanResponseDTO> getWorkoutPlansByMemberId(
            @PathVariable Long memberId) {

        return workoutPlanService.getWorkoutPlansByMemberId(memberId);
    }

    @GetMapping("/search/name")
    public List<WorkoutPlanResponseDTO> searchWorkoutPlansByName(
            @RequestParam String planName) {

        return workoutPlanService.searchWorkoutPlansByName(planName);
    }

    @GetMapping("/search/goal")
    public List<WorkoutPlanResponseDTO> searchWorkoutPlansByGoal(
            @RequestParam String goal) {

        return workoutPlanService.searchWorkoutPlansByGoal(goal);
    }

    @PutMapping("/{id}")
    public WorkoutPlanResponseDTO updateWorkoutPlan(
            @PathVariable Long id,
            @Valid @RequestBody WorkoutPlanRequestDTO workoutPlanRequestDTO) {

        return workoutPlanService.updateWorkoutPlan(id, workoutPlanRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkoutPlan(@PathVariable Long id) {
        workoutPlanService.deleteWorkoutPlan(id);
    }
}