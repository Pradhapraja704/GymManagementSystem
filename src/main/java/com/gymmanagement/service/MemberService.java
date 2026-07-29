package com.gymmanagement.service;

import com.gymmanagement.dto.MemberRequestDTO;
import com.gymmanagement.dto.MemberResponseDTO;

import java.util.List;

public interface MemberService {

    MemberResponseDTO addMember(MemberRequestDTO memberRequestDTO);

    List<MemberResponseDTO> getAllMembers();

    MemberResponseDTO getMemberById(Long id);

    MemberResponseDTO updateMember(Long id, MemberRequestDTO memberRequestDTO);

    void deleteMember(Long id);

    List<MemberResponseDTO> searchMembers(String keyword);

    List<MemberResponseDTO> getMembersWithPagination(
            int page,
            int size,
            String sortBy,
            String direction
    );
}