package com.gymmanagement.repository;

import com.gymmanagement.entity.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {

    List<DietPlan> findByMemberId(Long memberId);

    List<DietPlan> findByBreakfastContainingIgnoreCase(String breakfast);

    List<DietPlan> findByNotesContainingIgnoreCase(String keyword);
}