package com.gymmanagement.mapper;

import com.gymmanagement.dto.TrainerRequestDTO;
import com.gymmanagement.dto.TrainerResponseDTO;
import com.gymmanagement.entity.Trainer;
import org.springframework.stereotype.Component;

@Component
public class TrainerMapper {

    public Trainer toEntity(TrainerRequestDTO trainerRequestDTO) {

        Trainer trainer = new Trainer();

        trainer.setFullName(trainerRequestDTO.getFullName());
        trainer.setEmail(trainerRequestDTO.getEmail());
        trainer.setPhoneNumber(trainerRequestDTO.getPhoneNumber());
        trainer.setSpecialization(trainerRequestDTO.getSpecialization());
        trainer.setExperienceYears(trainerRequestDTO.getExperienceYears());
        trainer.setSalary(trainerRequestDTO.getSalary());
        trainer.setJoiningDate(trainerRequestDTO.getJoiningDate());
        trainer.setGender(trainerRequestDTO.getGender());
        trainer.setAddress(trainerRequestDTO.getAddress());
        trainer.setActive(trainerRequestDTO.getActive());

        return trainer;
    }

    public TrainerResponseDTO toResponseDTO(Trainer trainer) {

        TrainerResponseDTO responseDTO = new TrainerResponseDTO();

        responseDTO.setTrainerId(trainer.getTrainerId());
        responseDTO.setFullName(trainer.getFullName());
        responseDTO.setEmail(trainer.getEmail());
        responseDTO.setPhoneNumber(trainer.getPhoneNumber());
        responseDTO.setSpecialization(trainer.getSpecialization());
        responseDTO.setExperienceYears(trainer.getExperienceYears());
        responseDTO.setSalary(trainer.getSalary());
        responseDTO.setJoiningDate(trainer.getJoiningDate());
        responseDTO.setGender(trainer.getGender());
        responseDTO.setAddress(trainer.getAddress());
        responseDTO.setActive(trainer.getActive());

        return responseDTO;
    }
}