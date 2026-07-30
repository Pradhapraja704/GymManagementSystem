package com.gymmanagement.service.impl;

import com.gymmanagement.dto.DashboardResponseDTO;
import com.gymmanagement.repository.AttendanceRepository;
import com.gymmanagement.repository.MemberRepository;
import com.gymmanagement.repository.TrainerRepository;
import com.gymmanagement.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public DashboardResponseDTO getDashboardSummary() {

        long totalMembers = memberRepository.count();

        long totalTrainers = trainerRepository.count();

        long totalAttendance = attendanceRepository.count();

        long activeMembers = memberRepository.findAll()
                .stream()
                .filter(member -> Boolean.TRUE.equals(member.getActive()))
                .count();

        return new DashboardResponseDTO(
                totalMembers,
                totalTrainers,
                totalAttendance,
                activeMembers
        );
    }
}