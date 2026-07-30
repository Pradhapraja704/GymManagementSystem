package com.gymmanagement.service;

import com.gymmanagement.dto.MembershipPlanRequestDTO;
import com.gymmanagement.dto.MembershipPlanResponseDTO;

import java.util.List;

public interface MembershipPlanService {

    MembershipPlanResponseDTO addMembershipPlan(MembershipPlanRequestDTO membershipPlanRequestDTO);

    List<MembershipPlanResponseDTO> getAllMembershipPlans();

    MembershipPlanResponseDTO getMembershipPlanById(Long id);

    MembershipPlanResponseDTO updateMembershipPlan(Long id, MembershipPlanRequestDTO membershipPlanRequestDTO);

    void deleteMembershipPlan(Long id);

    List<MembershipPlanResponseDTO> searchMembershipPlansByName(String planName);

    List<MembershipPlanResponseDTO> searchMembershipPlansByBenefits(String keyword);

    List<MembershipPlanResponseDTO> getMembershipPlansWithPagination(
            int page,
            int size,
            String sortBy,
            String direction
    );
}