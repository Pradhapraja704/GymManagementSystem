package com.gymmanagement.controller;

import com.gymmanagement.dto.MembershipPlanRequestDTO;
import com.gymmanagement.dto.MembershipPlanResponseDTO;
import com.gymmanagement.service.MembershipPlanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/membership-plans")
public class MembershipPlanController {

    @Autowired
    private MembershipPlanService membershipPlanService;

    @PostMapping
    public MembershipPlanResponseDTO addMembershipPlan(
            @Valid @RequestBody MembershipPlanRequestDTO membershipPlanRequestDTO) {

        return membershipPlanService.addMembershipPlan(membershipPlanRequestDTO);
    }

    @GetMapping
    public List<MembershipPlanResponseDTO> getAllMembershipPlans() {
        return membershipPlanService.getAllMembershipPlans();
    }

    @GetMapping("/page")
    public List<MembershipPlanResponseDTO> getMembershipPlansWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "planId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return membershipPlanService.getMembershipPlansWithPagination(
                page,
                size,
                sortBy,
                direction
        );
    }

    @GetMapping("/{id:\\d+}")
    public MembershipPlanResponseDTO getMembershipPlanById(@PathVariable Long id) {
        return membershipPlanService.getMembershipPlanById(id);
    }

    @GetMapping("/search/name")
    public List<MembershipPlanResponseDTO> searchMembershipPlansByName(
            @RequestParam String planName) {

        return membershipPlanService.searchMembershipPlansByName(planName);
    }

    @GetMapping("/search/benefits")
    public List<MembershipPlanResponseDTO> searchMembershipPlansByBenefits(
            @RequestParam String keyword) {

        return membershipPlanService.searchMembershipPlansByBenefits(keyword);
    }

    @PutMapping("/{id}")
    public MembershipPlanResponseDTO updateMembershipPlan(
            @PathVariable Long id,
            @Valid @RequestBody MembershipPlanRequestDTO membershipPlanRequestDTO) {

        return membershipPlanService.updateMembershipPlan(id, membershipPlanRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteMembershipPlan(@PathVariable Long id) {
        membershipPlanService.deleteMembershipPlan(id);
    }
}