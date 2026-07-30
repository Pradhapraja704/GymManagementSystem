package com.gymmanagement.repository;

import com.gymmanagement.entity.TrainerAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainerAssignmentRepository extends JpaRepository<TrainerAssignment, Long> {

    List<TrainerAssignment> findByMemberId(Long memberId);

    List<TrainerAssignment> findByTrainerId(Long trainerId);

    List<TrainerAssignment> findByRemarksContainingIgnoreCase(String keyword);
}