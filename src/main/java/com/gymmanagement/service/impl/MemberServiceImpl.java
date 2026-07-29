package com.gymmanagement.service.impl;

import com.gymmanagement.dto.MemberRequestDTO;
import com.gymmanagement.dto.MemberResponseDTO;
import com.gymmanagement.entity.Member;
import com.gymmanagement.mapper.MemberMapper;
import com.gymmanagement.repository.MemberRepository;
import com.gymmanagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberMapper memberMapper;

    @Override
    public MemberResponseDTO addMember(MemberRequestDTO memberRequestDTO) {

        Member member = memberMapper.toEntity(memberRequestDTO);

        Member savedMember = memberRepository.save(member);

        return memberMapper.toResponseDTO(savedMember);
    }

    @Override
    public List<MemberResponseDTO> getAllMembers() {

        return memberRepository.findAll()
                .stream()
                .map(memberMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MemberResponseDTO getMemberById(Long id) {

        Member member = memberRepository.findById(id).orElse(null);

        if (member == null) {
            return null;
        }

        return memberMapper.toResponseDTO(member);
    }

    @Override
    public MemberResponseDTO updateMember(Long id, MemberRequestDTO memberRequestDTO) {

        Member existingMember = memberRepository.findById(id).orElse(null);

        if (existingMember == null) {
            return null;
        }

        existingMember.setFirstName(memberRequestDTO.getFirstName());
        existingMember.setLastName(memberRequestDTO.getLastName());
        existingMember.setEmail(memberRequestDTO.getEmail());
        existingMember.setPhoneNumber(memberRequestDTO.getPhoneNumber());
        existingMember.setGender(memberRequestDTO.getGender());
        existingMember.setDateOfBirth(memberRequestDTO.getDateOfBirth());
        existingMember.setAddress(memberRequestDTO.getAddress());
        existingMember.setJoinDate(memberRequestDTO.getJoinDate());
        existingMember.setMembershipExpiryDate(memberRequestDTO.getMembershipExpiryDate());
        existingMember.setMembershipType(memberRequestDTO.getMembershipType());
        existingMember.setHeight(memberRequestDTO.getHeight());
        existingMember.setWeight(memberRequestDTO.getWeight());
        existingMember.setEmergencyContactName(memberRequestDTO.getEmergencyContactName());
        existingMember.setEmergencyContactPhone(memberRequestDTO.getEmergencyContactPhone());
        existingMember.setActive(memberRequestDTO.getActive());

        Member updatedMember = memberRepository.save(existingMember);

        return memberMapper.toResponseDTO(updatedMember);
    }

    @Override
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    @Override
    public List<MemberResponseDTO> searchMembers(String keyword) {

        return memberRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword,
                        keyword
                )
                .stream()
                .map(memberMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MemberResponseDTO> getMembersWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return memberRepository.findAll(pageable)
                .stream()
                .map(memberMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}