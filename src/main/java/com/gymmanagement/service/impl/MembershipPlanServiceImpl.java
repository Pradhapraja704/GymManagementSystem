package com.gymmanagement.service.impl;

import com.gymmanagement.dto.MembershipPlanRequestDTO;
import com.gymmanagement.dto.MembershipPlanResponseDTO;
import com.gymmanagement.entity.MembershipPlan;
import com.gymmanagement.mapper.MembershipPlanMapper;
import com.gymmanagement.repository.MembershipPlanRepository;
import com.gymmanagement.service.MembershipPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MembershipPlanServiceImpl implements MembershipPlanService {

    @Autowired
    private MembershipPlanRepository membershipPlanRepository;

    @Autowired
    private MembershipPlanMapper membershipPlanMapper;

    @Override
    public MembershipPlanResponseDTO addMembershipPlan(MembershipPlanRequestDTO membershipPlanRequestDTO) {

        MembershipPlan membershipPlan = membershipPlanMapper.toEntity(membershipPlanRequestDTO);

        MembershipPlan savedMembershipPlan = membershipPlanRepository.save(membershipPlan);

        return membershipPlanMapper.toResponseDTO(savedMembershipPlan);
    }

    @Override
    public List<MembershipPlanResponseDTO> getAllMembershipPlans() {

        return membershipPlanRepository.findAll()
                .stream()
                .map(membershipPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MembershipPlanResponseDTO getMembershipPlanById(Long id) {

        MembershipPlan membershipPlan = membershipPlanRepository.findById(id).orElse(null);

        if (membershipPlan == null) {
            return null;
        }

        return membershipPlanMapper.toResponseDTO(membershipPlan);
    }

    @Override
    public MembershipPlanResponseDTO updateMembershipPlan(Long id, MembershipPlanRequestDTO membershipPlanRequestDTO) {

        MembershipPlan membershipPlan = membershipPlanRepository.findById(id).orElse(null);

        if (membershipPlan == null) {
            return null;
        }

        membershipPlan.setPlanName(membershipPlanRequestDTO.getPlanName());
        membershipPlan.setDurationMonths(membershipPlanRequestDTO.getDurationMonths());
        membershipPlan.setPrice(membershipPlanRequestDTO.getPrice());
        membershipPlan.setBenefits(membershipPlanRequestDTO.getBenefits());
        membershipPlan.setActive(membershipPlanRequestDTO.getActive());

        MembershipPlan updatedMembershipPlan = membershipPlanRepository.save(membershipPlan);

        return membershipPlanMapper.toResponseDTO(updatedMembershipPlan);
    }

    @Override
    public void deleteMembershipPlan(Long id) {
        membershipPlanRepository.deleteById(id);
    }

    @Override
    public List<MembershipPlanResponseDTO> searchMembershipPlansByName(String planName) {

        return membershipPlanRepository.findByPlanNameContainingIgnoreCase(planName)
                .stream()
                .map(membershipPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MembershipPlanResponseDTO> searchMembershipPlansByBenefits(String keyword) {

        return membershipPlanRepository.findByBenefitsContainingIgnoreCase(keyword)
                .stream()
                .map(membershipPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MembershipPlanResponseDTO> getMembershipPlansWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return membershipPlanRepository.findAll(pageable)
                .stream()
                .map(membershipPlanMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}