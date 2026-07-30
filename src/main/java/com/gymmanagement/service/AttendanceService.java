package com.gymmanagement.service;

import com.gymmanagement.dto.AttendanceRequestDTO;
import com.gymmanagement.dto.AttendanceResponseDTO;

import java.util.List;

public interface AttendanceService {

    AttendanceResponseDTO addAttendance(AttendanceRequestDTO attendanceRequestDTO);

    List<AttendanceResponseDTO> getAllAttendance();

    AttendanceResponseDTO getAttendanceById(Long id);

    AttendanceResponseDTO updateAttendance(Long id, AttendanceRequestDTO attendanceRequestDTO);

    void deleteAttendance(Long id);

    List<AttendanceResponseDTO> searchAttendance(String keyword);

    List<AttendanceResponseDTO> getAttendanceWithPagination(
            int page,
            int size,
            String sortBy,
            String direction
    );
}