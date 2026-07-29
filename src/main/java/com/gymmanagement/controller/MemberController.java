package com.gymmanagement.controller;

import com.gymmanagement.dto.MemberRequestDTO;
import com.gymmanagement.dto.MemberResponseDTO;
import com.gymmanagement.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
@CrossOrigin(origins = "*")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping
    public MemberResponseDTO addMember(@Valid @RequestBody MemberRequestDTO memberRequestDTO) {
        return memberService.addMember(memberRequestDTO);
    }

    @GetMapping
    public List<MemberResponseDTO> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping("/search")
    public List<MemberResponseDTO> searchMembers(@RequestParam String keyword) {
        return memberService.searchMembers(keyword);
    }

    @GetMapping("/{id:\\d+}")
    public MemberResponseDTO getMemberById(@PathVariable Long id) {
        return memberService.getMemberById(id);
    }

    @PutMapping("/{id}")
    public MemberResponseDTO updateMember(@PathVariable Long id,
                                          @Valid @RequestBody MemberRequestDTO memberRequestDTO) {
        return memberService.updateMember(id, memberRequestDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return "Member deleted successfully";
    }
}