package com.gymmanagement.controller;

import com.gymmanagement.dto.TrainerRequestDTO;
import com.gymmanagement.dto.TrainerResponseDTO;
import com.gymmanagement.service.TrainerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trainers")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping
    public TrainerResponseDTO addTrainer(@Valid @RequestBody TrainerRequestDTO trainerRequestDTO) {
        return trainerService.addTrainer(trainerRequestDTO);
    }

    @GetMapping
    public List<TrainerResponseDTO> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    @GetMapping("/page")
    public List<TrainerResponseDTO> getTrainersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "trainerId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return trainerService.getTrainersWithPagination(
                page,
                size,
                sortBy,
                direction
        );
    }

    @GetMapping("/search")
    public List<TrainerResponseDTO> searchTrainers(
            @RequestParam String keyword) {
        return trainerService.searchTrainers(keyword);
    }

    @GetMapping("/{id:\\d+}")
    public TrainerResponseDTO getTrainerById(@PathVariable Long id) {
        return trainerService.getTrainerById(id);
    }

    @PutMapping("/{id}")
    public TrainerResponseDTO updateTrainer(
            @PathVariable Long id,
            @Valid @RequestBody TrainerRequestDTO trainerRequestDTO) {

        return trainerService.updateTrainer(id, trainerRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTrainer(@PathVariable Long id) {
        trainerService.deleteTrainer(id);
    }
}