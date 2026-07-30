package com.gymmanagement.service.impl;

import com.gymmanagement.dto.AttendanceRequestDTO;
import com.gymmanagement.dto.AttendanceResponseDTO;
import com.gymmanagement.entity.Attendance;
import com.gymmanagement.mapper.AttendanceMapper;
import com.gymmanagement.repository.AttendanceRepository;
import com.gymmanagement.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private AttendanceMapper attendanceMapper;

    @Override
    public AttendanceResponseDTO addAttendance(AttendanceRequestDTO attendanceRequestDTO) {

        Attendance attendance = attendanceMapper.toEntity(attendanceRequestDTO);

        Attendance savedAttendance = attendanceRepository.save(attendance);

        return attendanceMapper.toResponseDTO(savedAttendance);
    }

    @Override
    public List<AttendanceResponseDTO> getAllAttendance() {

        return attendanceRepository.findAll()
                .stream()
                .map(attendanceMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceResponseDTO getAttendanceById(Long id) {

        Attendance attendance = attendanceRepository.findById(id).orElse(null);

        if (attendance == null) {
            return null;
        }

        return attendanceMapper.toResponseDTO(attendance);
    }

    @Override
    public AttendanceResponseDTO updateAttendance(Long id, AttendanceRequestDTO attendanceRequestDTO) {

        Attendance attendance = attendanceRepository.findById(id).orElse(null);

        if (attendance == null) {
            return null;
        }

        attendance.setMemberId(attendanceRequestDTO.getMemberId());
        attendance.setTrainerId(attendanceRequestDTO.getTrainerId());
        attendance.setAttendanceDate(attendanceRequestDTO.getAttendanceDate());
        attendance.setCheckInTime(attendanceRequestDTO.getCheckInTime());
        attendance.setCheckOutTime(attendanceRequestDTO.getCheckOutTime());
        attendance.setStatus(attendanceRequestDTO.getStatus());
        attendance.setRemarks(attendanceRequestDTO.getRemarks());

        Attendance updatedAttendance = attendanceRepository.save(attendance);

        return attendanceMapper.toResponseDTO(updatedAttendance);
    }

    @Override
    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    @Override
    public List<AttendanceResponseDTO> searchAttendance(String keyword) {

        return attendanceRepository
                .findByStatusContainingIgnoreCaseOrRemarksContainingIgnoreCase(
                        keyword,
                        keyword
                )
                .stream()
                .map(attendanceMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceResponseDTO> getAttendanceWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return attendanceRepository.findAll(pageable)
                .stream()
                .map(attendanceMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}