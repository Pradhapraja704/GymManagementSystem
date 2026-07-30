package com.gymmanagement.mapper;

import com.gymmanagement.dto.TrainerAssignmentRequestDTO;
import com.gymmanagement.dto.TrainerAssignmentResponseDTO;
import com.gymmanagement.entity.TrainerAssignment;
import org.springframework.stereotype.Component;

@Component
public class TrainerAssignmentMapper {

    public TrainerAssignment toEntity(TrainerAssignmentRequestDTO dto) {

        TrainerAssignment assignment = new TrainerAssignment();

        assignment.setMemberId(dto.getMemberId());
        assignment.setTrainerId(dto.getTrainerId());
        assignment.setAssignedDate(dto.getAssignedDate());
        assignment.setActive(dto.getActive());
        assignment.setRemarks(dto.getRemarks());

        return assignment;
    }

    public TrainerAssignmentResponseDTO toResponseDTO(TrainerAssignment assignment) {

        TrainerAssignmentResponseDTO dto = new TrainerAssignmentResponseDTO();

        dto.setAssignmentId(assignment.getAssignmentId());
        dto.setMemberId(assignment.getMemberId());
        dto.setTrainerId(assignment.getTrainerId());
        dto.setAssignedDate(assignment.getAssignedDate());
        dto.setActive(assignment.isActive());
        dto.setRemarks(assignment.getRemarks());

        return dto;
    }
}