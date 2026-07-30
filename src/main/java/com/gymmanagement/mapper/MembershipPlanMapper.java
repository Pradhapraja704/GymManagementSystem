package com.gymmanagement.mapper;

import com.gymmanagement.dto.MembershipPlanRequestDTO;
import com.gymmanagement.dto.MembershipPlanResponseDTO;
import com.gymmanagement.entity.MembershipPlan;
import org.springframework.stereotype.Component;

@Component
public class MembershipPlanMapper {

    public MembershipPlan toEntity(MembershipPlanRequestDTO dto) {

        MembershipPlan membershipPlan = new MembershipPlan();

        membershipPlan.setPlanName(dto.getPlanName());
        membershipPlan.setDurationMonths(dto.getDurationMonths());
        membershipPlan.setPrice(dto.getPrice());
        membershipPlan.setBenefits(dto.getBenefits());
        membershipPlan.setActive(dto.getActive());

        return membershipPlan;
    }

    public MembershipPlanResponseDTO toResponseDTO(MembershipPlan membershipPlan) {

        MembershipPlanResponseDTO dto = new MembershipPlanResponseDTO();

        dto.setPlanId(membershipPlan.getPlanId());
        dto.setPlanName(membershipPlan.getPlanName());
        dto.setDurationMonths(membershipPlan.getDurationMonths());
        dto.setPrice(membershipPlan.getPrice());
        dto.setBenefits(membershipPlan.getBenefits());
        dto.setActive(membershipPlan.getActive());

        return dto;
    }
}