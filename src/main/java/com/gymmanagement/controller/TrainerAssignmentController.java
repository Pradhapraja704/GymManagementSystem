package com.gymmanagement.controller;

import com.gymmanagement.dto.TrainerAssignmentRequestDTO;
import com.gymmanagement.dto.TrainerAssignmentResponseDTO;
import com.gymmanagement.service.TrainerAssignmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignments")
public class TrainerAssignmentController {

    @Autowired
    private TrainerAssignmentService trainerAssignmentService;

    @PostMapping
    public TrainerAssignmentResponseDTO addAssignment(
            @Valid @RequestBody TrainerAssignmentRequestDTO trainerAssignmentRequestDTO) {

        return trainerAssignmentService.addAssignment(trainerAssignmentRequestDTO);
    }

    @GetMapping
    public List<TrainerAssignmentResponseDTO> getAllAssignments() {
        return trainerAssignmentService.getAllAssignments();
    }

    @GetMapping("/page")
    public List<TrainerAssignmentResponseDTO> getAssignmentsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "assignmentId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return trainerAssignmentService.getAssignmentsWithPagination(
                page,
                size,
                sortBy,
                direction
        );
    }

    @GetMapping("/search")
    public List<TrainerAssignmentResponseDTO> searchAssignments(
            @RequestParam String keyword) {

        return trainerAssignmentService.searchAssignments(keyword);
    }

    @GetMapping("/{id:\\d+}")
    public TrainerAssignmentResponseDTO getAssignmentById(@PathVariable Long id) {
        return trainerAssignmentService.getAssignmentById(id);
    }

    @GetMapping("/member/{memberId}")
    public List<TrainerAssignmentResponseDTO> getAssignmentsByMemberId(
            @PathVariable Long memberId) {

        return trainerAssignmentService.getAssignmentsByMemberId(memberId);
    }

    @GetMapping("/trainer/{trainerId}")
    public List<TrainerAssignmentResponseDTO> getAssignmentsByTrainerId(
            @PathVariable Long trainerId) {

        return trainerAssignmentService.getAssignmentsByTrainerId(trainerId);
    }

    @PutMapping("/{id}")
    public TrainerAssignmentResponseDTO updateAssignment(
            @PathVariable Long id,
            @Valid @RequestBody TrainerAssignmentRequestDTO trainerAssignmentRequestDTO) {

        return trainerAssignmentService.updateAssignment(id, trainerAssignmentRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        trainerAssignmentService.deleteAssignment(id);
    }
}