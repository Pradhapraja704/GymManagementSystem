package com.gymmanagement.service.impl;

import com.gymmanagement.dto.DietPlanRequestDTO;
import com.gymmanagement.dto.DietPlanResponseDTO;
import com.gymmanagement.entity.DietPlan;
import com.gymmanagement.mapper.DietPlanMapper;
import com.gymmanagement.repository.DietPlanRepository;
import com.gymmanagement.service.DietPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DietPlanServiceImpl implements DietPlanService {

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @Autowired
    private DietPlanMapper dietPlanMapper;

    @Override
    public DietPlanResponseDTO addDietPlan(DietPlanRequestDTO dietPlanRequestDTO) {

        DietPlan dietPlan = dietPlanMapper.toEntity(dietPlanRequestDTO);

        DietPlan savedDietPlan = dietPlanRepository.save(dietPlan);

        return dietPlanMapper.toResponseDTO(savedDietPlan);
    }

    @Override
    public List<DietPlanResponseDTO> getAllDietPlans() {

        return dietPlanRepository.findAll()
                .stream()
                .map(dietPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DietPlanResponseDTO getDietPlanById(Long id) {

        DietPlan dietPlan = dietPlanRepository.findById(id).orElse(null);

        if (dietPlan == null) {
            return null;
        }

        return dietPlanMapper.toResponseDTO(dietPlan);
    }

    @Override
    public DietPlanResponseDTO updateDietPlan(Long id, DietPlanRequestDTO dietPlanRequestDTO) {

        DietPlan dietPlan = dietPlanRepository.findById(id).orElse(null);

        if (dietPlan == null) {
            return null;
        }

        dietPlan.setMemberId(dietPlanRequestDTO.getMemberId());
        dietPlan.setBreakfast(dietPlanRequestDTO.getBreakfast());
        dietPlan.setLunch(dietPlanRequestDTO.getLunch());
        dietPlan.setDinner(dietPlanRequestDTO.getDinner());
        dietPlan.setSnacks(dietPlanRequestDTO.getSnacks());
        dietPlan.setCalories(dietPlanRequestDTO.getCalories());
        dietPlan.setNotes(dietPlanRequestDTO.getNotes());
        dietPlan.setCreatedDate(dietPlanRequestDTO.getCreatedDate());
        dietPlan.setActive(dietPlanRequestDTO.getActive());

        DietPlan updatedDietPlan = dietPlanRepository.save(dietPlan);

        return dietPlanMapper.toResponseDTO(updatedDietPlan);
    }

    @Override
    public void deleteDietPlan(Long id) {
        dietPlanRepository.deleteById(id);
    }

    @Override
    public List<DietPlanResponseDTO> getDietPlansByMemberId(Long memberId) {

        return dietPlanRepository.findByMemberId(memberId)
                .stream()
                .map(dietPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DietPlanResponseDTO> searchDietPlansByBreakfast(String breakfast) {

        return dietPlanRepository.findByBreakfastContainingIgnoreCase(breakfast)
                .stream()
                .map(dietPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DietPlanResponseDTO> searchDietPlansByNotes(String keyword) {

        return dietPlanRepository.findByNotesContainingIgnoreCase(keyword)
                .stream()
                .map(dietPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DietPlanResponseDTO> getDietPlansWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return dietPlanRepository.findAll(pageable)
                .stream()
                .map(dietPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}