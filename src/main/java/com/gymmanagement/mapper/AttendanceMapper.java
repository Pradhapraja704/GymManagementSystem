package com.gymmanagement.mapper;

import com.gymmanagement.dto.AttendanceRequestDTO;
import com.gymmanagement.dto.AttendanceResponseDTO;
import com.gymmanagement.entity.Attendance;
import org.springframework.stereotype.Component;

@Component
public class AttendanceMapper {

    public Attendance toEntity(AttendanceRequestDTO dto) {

        Attendance attendance = new Attendance();

        attendance.setMemberId(dto.getMemberId());
        attendance.setTrainerId(dto.getTrainerId());
        attendance.setAttendanceDate(dto.getAttendanceDate());
        attendance.setCheckInTime(dto.getCheckInTime());
        attendance.setCheckOutTime(dto.getCheckOutTime());
        attendance.setStatus(dto.getStatus());
        attendance.setRemarks(dto.getRemarks());

        return attendance;
    }

    public AttendanceResponseDTO toResponseDTO(Attendance attendance) {

        AttendanceResponseDTO dto = new AttendanceResponseDTO();

        dto.setAttendanceId(attendance.getAttendanceId());
        dto.setMemberId(attendance.getMemberId());
        dto.setTrainerId(attendance.getTrainerId());
        dto.setAttendanceDate(attendance.getAttendanceDate());
        dto.setCheckInTime(attendance.getCheckInTime());
        dto.setCheckOutTime(attendance.getCheckOutTime());
        dto.setStatus(attendance.getStatus());
        dto.setRemarks(attendance.getRemarks());

        return dto;
    }
}