package com.gymmanagement.mapper;

import com.gymmanagement.dto.DietPlanRequestDTO;
import com.gymmanagement.dto.DietPlanResponseDTO;
import com.gymmanagement.entity.DietPlan;
import org.springframework.stereotype.Component;

@Component
public class DietPlanMapper {

    public DietPlan toEntity(DietPlanRequestDTO dto) {

        DietPlan dietPlan = new DietPlan();

        dietPlan.setMemberId(dto.getMemberId());
        dietPlan.setBreakfast(dto.getBreakfast());
        dietPlan.setLunch(dto.getLunch());
        dietPlan.setDinner(dto.getDinner());
        dietPlan.setSnacks(dto.getSnacks());
        dietPlan.setCalories(dto.getCalories());
        dietPlan.setNotes(dto.getNotes());
        dietPlan.setCreatedDate(dto.getCreatedDate());
        dietPlan.setActive(dto.getActive());

        return dietPlan;
    }

    public DietPlanResponseDTO toResponseDTO(DietPlan dietPlan) {

        DietPlanResponseDTO dto = new DietPlanResponseDTO();

        dto.setPlanId(dietPlan.getPlanId());
        dto.setMemberId(dietPlan.getMemberId());
        dto.setBreakfast(dietPlan.getBreakfast());
        dto.setLunch(dietPlan.getLunch());
        dto.setDinner(dietPlan.getDinner());
        dto.setSnacks(dietPlan.getSnacks());
        dto.setCalories(dietPlan.getCalories());
        dto.setNotes(dietPlan.getNotes());
        dto.setCreatedDate(dietPlan.getCreatedDate());
        dto.setActive(dietPlan.getActive());

        return dto;
    }
}