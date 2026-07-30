package com.gymmanagement.service.impl;

import com.gymmanagement.dto.TrainerRequestDTO;
import com.gymmanagement.dto.TrainerResponseDTO;
import com.gymmanagement.entity.Trainer;
import com.gymmanagement.mapper.TrainerMapper;
import com.gymmanagement.repository.TrainerRepository;
import com.gymmanagement.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainerServiceImpl implements TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private TrainerMapper trainerMapper;

    @Override
    public TrainerResponseDTO addTrainer(TrainerRequestDTO trainerRequestDTO) {

        Trainer trainer = trainerMapper.toEntity(trainerRequestDTO);

        Trainer savedTrainer = trainerRepository.save(trainer);

        return trainerMapper.toResponseDTO(savedTrainer);
    }

    @Override
    public List<TrainerResponseDTO> getAllTrainers() {

        return trainerRepository.findAll()
                .stream()
                .map(trainerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TrainerResponseDTO getTrainerById(Long id) {

        Trainer trainer = trainerRepository.findById(id).orElse(null);

        if (trainer == null) {
            return null;
        }

        return trainerMapper.toResponseDTO(trainer);
    }

    @Override
    public TrainerResponseDTO updateTrainer(Long id, TrainerRequestDTO trainerRequestDTO) {

        Trainer existingTrainer = trainerRepository.findById(id).orElse(null);

        if (existingTrainer == null) {
            return null;
        }

        existingTrainer.setFullName(trainerRequestDTO.getFullName());
        existingTrainer.setEmail(trainerRequestDTO.getEmail());
        existingTrainer.setPhoneNumber(trainerRequestDTO.getPhoneNumber());
        existingTrainer.setSpecialization(trainerRequestDTO.getSpecialization());
        existingTrainer.setExperienceYears(trainerRequestDTO.getExperienceYears());
        existingTrainer.setSalary(trainerRequestDTO.getSalary());
        existingTrainer.setJoiningDate(trainerRequestDTO.getJoiningDate());
        existingTrainer.setGender(trainerRequestDTO.getGender());
        existingTrainer.setAddress(trainerRequestDTO.getAddress());
        existingTrainer.setActive(trainerRequestDTO.getActive());

        Trainer updatedTrainer = trainerRepository.save(existingTrainer);

        return trainerMapper.toResponseDTO(updatedTrainer);
    }

    @Override
    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }

    @Override
    public List<TrainerResponseDTO> searchTrainers(String keyword) {

        return trainerRepository
                .findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCaseOrSpecializationContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword,
                        keyword
                )
                .stream()
                .map(trainerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TrainerResponseDTO> getTrainersWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return trainerRepository.findAll(pageable)
                .stream()
                .map(trainerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}