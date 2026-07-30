package com.gymmanagement.service;

import com.gymmanagement.dto.DietPlanRequestDTO;
import com.gymmanagement.dto.DietPlanResponseDTO;

import java.util.List;

public interface DietPlanService {

    DietPlanResponseDTO addDietPlan(DietPlanRequestDTO dietPlanRequestDTO);

    List<DietPlanResponseDTO> getAllDietPlans();

    DietPlanResponseDTO getDietPlanById(Long id);

    DietPlanResponseDTO updateDietPlan(Long id, DietPlanRequestDTO dietPlanRequestDTO);

    void deleteDietPlan(Long id);

    List<DietPlanResponseDTO> getDietPlansByMemberId(Long memberId);

    List<DietPlanResponseDTO> searchDietPlansByBreakfast(String breakfast);

    List<DietPlanResponseDTO> searchDietPlansByNotes(String keyword);

    List<DietPlanResponseDTO> getDietPlansWithPagination(
            int page,
            int size,
            String sortBy,
            String direction
    );
}