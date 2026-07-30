package com.gymmanagement.service;

import com.gymmanagement.dto.TrainerAssignmentRequestDTO;
import com.gymmanagement.dto.TrainerAssignmentResponseDTO;

import java.util.List;

public interface TrainerAssignmentService {

    TrainerAssignmentResponseDTO addAssignment(TrainerAssignmentRequestDTO trainerAssignmentRequestDTO);

    List<TrainerAssignmentResponseDTO> getAllAssignments();

    TrainerAssignmentResponseDTO getAssignmentById(Long id);

    TrainerAssignmentResponseDTO updateAssignment(Long id, TrainerAssignmentRequestDTO trainerAssignmentRequestDTO);

    void deleteAssignment(Long id);

    List<TrainerAssignmentResponseDTO> getAssignmentsByMemberId(Long memberId);

    List<TrainerAssignmentResponseDTO> getAssignmentsByTrainerId(Long trainerId);

    List<TrainerAssignmentResponseDTO> searchAssignments(String keyword);

    List<TrainerAssignmentResponseDTO> getAssignmentsWithPagination(
            int page,
            int size,
            String sortBy,
            String direction
    );
}