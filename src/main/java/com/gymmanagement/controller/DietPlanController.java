package com.gymmanagement.controller;

import com.gymmanagement.dto.DietPlanRequestDTO;
import com.gymmanagement.dto.DietPlanResponseDTO;
import com.gymmanagement.service.DietPlanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diet-plans")
public class DietPlanController {

    @Autowired
    private DietPlanService dietPlanService;

    @PostMapping
    public DietPlanResponseDTO addDietPlan(
            @Valid @RequestBody DietPlanRequestDTO dietPlanRequestDTO) {

        return dietPlanService.addDietPlan(dietPlanRequestDTO);
    }

    @GetMapping
    public List<DietPlanResponseDTO> getAllDietPlans() {
        return dietPlanService.getAllDietPlans();
    }

    @GetMapping("/page")
    public List<DietPlanResponseDTO> getDietPlansWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "planId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return dietPlanService.getDietPlansWithPagination(
                page,
                size,
                sortBy,
                direction
        );
    }

    @GetMapping("/{id:\\d+}")
    public DietPlanResponseDTO getDietPlanById(@PathVariable Long id) {
        return dietPlanService.getDietPlanById(id);
    }

    @GetMapping("/member/{memberId}")
    public List<DietPlanResponseDTO> getDietPlansByMemberId(
            @PathVariable Long memberId) {

        return dietPlanService.getDietPlansByMemberId(memberId);
    }

    @GetMapping("/search/breakfast")
    public List<DietPlanResponseDTO> searchDietPlansByBreakfast(
            @RequestParam String breakfast) {

        return dietPlanService.searchDietPlansByBreakfast(breakfast);
    }

    @GetMapping("/search/notes")
    public List<DietPlanResponseDTO> searchDietPlansByNotes(
            @RequestParam String keyword) {

        return dietPlanService.searchDietPlansByNotes(keyword);
    }

    @PutMapping("/{id}")
    public DietPlanResponseDTO updateDietPlan(
            @PathVariable Long id,
            @Valid @RequestBody DietPlanRequestDTO dietPlanRequestDTO) {

        return dietPlanService.updateDietPlan(id, dietPlanRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteDietPlan(@PathVariable Long id) {
        dietPlanService.deleteDietPlan(id);
    }
}