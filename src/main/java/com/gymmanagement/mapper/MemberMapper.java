package com.gymmanagement.mapper;

import com.gymmanagement.dto.MemberRequestDTO;
import com.gymmanagement.dto.MemberResponseDTO;
import com.gymmanagement.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    public Member toEntity(MemberRequestDTO dto) {

        Member member = new Member();

        member.setFirstName(dto.getFirstName());
        member.setLastName(dto.getLastName());
        member.setEmail(dto.getEmail());
        member.setPhoneNumber(dto.getPhoneNumber());
        member.setGender(dto.getGender());
        member.setDateOfBirth(dto.getDateOfBirth());
        member.setAddress(dto.getAddress());
        member.setJoinDate(dto.getJoinDate());
        member.setMembershipExpiryDate(dto.getMembershipExpiryDate());
        member.setMembershipType(dto.getMembershipType());
        member.setHeight(dto.getHeight());
        member.setWeight(dto.getWeight());
        member.setEmergencyContactName(dto.getEmergencyContactName());
        member.setEmergencyContactPhone(dto.getEmergencyContactPhone());
        member.setActive(dto.getActive());

        return member;
    }

    public MemberResponseDTO toResponseDTO(Member member) {

        MemberResponseDTO dto = new MemberResponseDTO();

        dto.setMemberId(member.getMemberId());
        dto.setFirstName(member.getFirstName());
        dto.setLastName(member.getLastName());
        dto.setEmail(member.getEmail());
        dto.setPhoneNumber(member.getPhoneNumber());
        dto.setGender(member.getGender());
        dto.setDateOfBirth(member.getDateOfBirth());
        dto.setAddress(member.getAddress());
        dto.setJoinDate(member.getJoinDate());
        dto.setMembershipExpiryDate(member.getMembershipExpiryDate());
        dto.setMembershipType(member.getMembershipType());
        dto.setHeight(member.getHeight());
        dto.setWeight(member.getWeight());
        dto.setEmergencyContactName(member.getEmergencyContactName());
        dto.setEmergencyContactPhone(member.getEmergencyContactPhone());
        dto.setActive(member.getActive());

        return dto;
    }
}