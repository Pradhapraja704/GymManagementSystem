package com.gymmanagement.service.impl;

import com.gymmanagement.dto.TrainerAssignmentRequestDTO;
import com.gymmanagement.dto.TrainerAssignmentResponseDTO;
import com.gymmanagement.entity.TrainerAssignment;
import com.gymmanagement.mapper.TrainerAssignmentMapper;
import com.gymmanagement.repository.TrainerAssignmentRepository;
import com.gymmanagement.service.TrainerAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainerAssignmentServiceImpl implements TrainerAssignmentService {

    @Autowired
    private TrainerAssignmentRepository trainerAssignmentRepository;

    @Autowired
    private TrainerAssignmentMapper trainerAssignmentMapper;

    @Override
    public TrainerAssignmentResponseDTO addAssignment(TrainerAssignmentRequestDTO trainerAssignmentRequestDTO) {

        TrainerAssignment assignment = trainerAssignmentMapper.toEntity(trainerAssignmentRequestDTO);

        TrainerAssignment savedAssignment = trainerAssignmentRepository.save(assignment);

        return trainerAssignmentMapper.toResponseDTO(savedAssignment);
    }

    @Override
    public List<TrainerAssignmentResponseDTO> getAllAssignments() {

        return trainerAssignmentRepository.findAll()
                .stream()
                .map(trainerAssignmentMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TrainerAssignmentResponseDTO getAssignmentById(Long id) {

        TrainerAssignment assignment = trainerAssignmentRepository.findById(id).orElse(null);

        if (assignment == null) {
            return null;
        }

        return trainerAssignmentMapper.toResponseDTO(assignment);
    }

    @Override
    public TrainerAssignmentResponseDTO updateAssignment(Long id, TrainerAssignmentRequestDTO trainerAssignmentRequestDTO) {

        TrainerAssignment assignment = trainerAssignmentRepository.findById(id).orElse(null);

        if (assignment == null) {
            return null;
        }

        assignment.setMemberId(trainerAssignmentRequestDTO.getMemberId());
        assignment.setTrainerId(trainerAssignmentRequestDTO.getTrainerId());
        assignment.setAssignedDate(trainerAssignmentRequestDTO.getAssignedDate());
        assignment.setActive(trainerAssignmentRequestDTO.getActive());
        assignment.setRemarks(trainerAssignmentRequestDTO.getRemarks());

        TrainerAssignment updatedAssignment = trainerAssignmentRepository.save(assignment);

        return trainerAssignmentMapper.toResponseDTO(updatedAssignment);
    }

    @Override
    public void deleteAssignment(Long id) {
        trainerAssignmentRepository.deleteById(id);
    }

    @Override
    public List<TrainerAssignmentResponseDTO> getAssignmentsByMemberId(Long memberId) {

        return trainerAssignmentRepository.findByMemberId(memberId)
                .stream()
                .map(trainerAssignmentMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TrainerAssignmentResponseDTO> getAssignmentsByTrainerId(Long trainerId) {

        return trainerAssignmentRepository.findByTrainerId(trainerId)
                .stream()
                .map(trainerAssignmentMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TrainerAssignmentResponseDTO> searchAssignments(String keyword) {

        return trainerAssignmentRepository.findByRemarksContainingIgnoreCase(keyword)
                .stream()
                .map(trainerAssignmentMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TrainerAssignmentResponseDTO> getAssignmentsWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return trainerAssignmentRepository.findAll(pageable)
                .stream()
                .map(trainerAssignmentMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}