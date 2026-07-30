package com.gymmanagement.service;

import com.gymmanagement.dto.TrainerRequestDTO;
import com.gymmanagement.dto.TrainerResponseDTO;

import java.util.List;

public interface TrainerService {

    TrainerResponseDTO addTrainer(TrainerRequestDTO trainerRequestDTO);

    List<TrainerResponseDTO> getAllTrainers();

    TrainerResponseDTO getTrainerById(Long id);

    TrainerResponseDTO updateTrainer(Long id, TrainerRequestDTO trainerRequestDTO);

    void deleteTrainer(Long id);

    List<TrainerResponseDTO> searchTrainers(String keyword);

    List<TrainerResponseDTO> getTrainersWithPagination(
            int page,
            int size,
            String sortBy,
            String direction
    );
}