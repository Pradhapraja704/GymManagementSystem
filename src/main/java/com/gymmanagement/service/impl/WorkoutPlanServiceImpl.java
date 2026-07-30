package com.gymmanagement.service.impl;

import com.gymmanagement.dto.WorkoutPlanRequestDTO;
import com.gymmanagement.dto.WorkoutPlanResponseDTO;
import com.gymmanagement.entity.WorkoutPlan;
import com.gymmanagement.mapper.WorkoutPlanMapper;
import com.gymmanagement.repository.WorkoutPlanRepository;
import com.gymmanagement.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private WorkoutPlanMapper workoutPlanMapper;

    @Override
    public WorkoutPlanResponseDTO addWorkoutPlan(WorkoutPlanRequestDTO workoutPlanRequestDTO) {

        WorkoutPlan workoutPlan = workoutPlanMapper.toEntity(workoutPlanRequestDTO);

        WorkoutPlan savedWorkoutPlan = workoutPlanRepository.save(workoutPlan);

        return workoutPlanMapper.toResponseDTO(savedWorkoutPlan);
    }

    @Override
    public List<WorkoutPlanResponseDTO> getAllWorkoutPlans() {

        return workoutPlanRepository.findAll()
                .stream()
                .map(workoutPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WorkoutPlanResponseDTO getWorkoutPlanById(Long id) {

        WorkoutPlan workoutPlan = workoutPlanRepository.findById(id).orElse(null);

        if (workoutPlan == null) {
            return null;
        }

        return workoutPlanMapper.toResponseDTO(workoutPlan);
    }

    @Override
    public WorkoutPlanResponseDTO updateWorkoutPlan(Long id, WorkoutPlanRequestDTO workoutPlanRequestDTO) {

        WorkoutPlan workoutPlan = workoutPlanRepository.findById(id).orElse(null);

        if (workoutPlan == null) {
            return null;
        }

        workoutPlan.setMemberId(workoutPlanRequestDTO.getMemberId());
        workoutPlan.setPlanName(workoutPlanRequestDTO.getPlanName());
        workoutPlan.setGoal(workoutPlanRequestDTO.getGoal());
        workoutPlan.setDurationWeeks(workoutPlanRequestDTO.getDurationWeeks());
        workoutPlan.setDescription(workoutPlanRequestDTO.getDescription());
        workoutPlan.setCreatedDate(workoutPlanRequestDTO.getCreatedDate());
        workoutPlan.setActive(workoutPlanRequestDTO.getActive());

        WorkoutPlan updatedWorkoutPlan = workoutPlanRepository.save(workoutPlan);

        return workoutPlanMapper.toResponseDTO(updatedWorkoutPlan);
    }

    @Override
    public void deleteWorkoutPlan(Long id) {
        workoutPlanRepository.deleteById(id);
    }

    @Override
    public List<WorkoutPlanResponseDTO> getWorkoutPlansByMemberId(Long memberId) {

        return workoutPlanRepository.findByMemberId(memberId)
                .stream()
                .map(workoutPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<WorkoutPlanResponseDTO> searchWorkoutPlansByName(String planName) {

        return workoutPlanRepository.findByPlanNameContainingIgnoreCase(planName)
                .stream()
                .map(workoutPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<WorkoutPlanResponseDTO> searchWorkoutPlansByGoal(String goal) {

        return workoutPlanRepository.findByGoalContainingIgnoreCase(goal)
                .stream()
                .map(workoutPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<WorkoutPlanResponseDTO> getWorkoutPlansWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return workoutPlanRepository.findAll(pageable)
                .stream()
                .map(workoutPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}