package com.gymmanagement.controller;

import com.gymmanagement.dto.AttendanceRequestDTO;
import com.gymmanagement.dto.AttendanceResponseDTO;
import com.gymmanagement.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public AttendanceResponseDTO addAttendance(@Valid @RequestBody AttendanceRequestDTO attendanceRequestDTO) {
        return attendanceService.addAttendance(attendanceRequestDTO);
    }

    @GetMapping
    public List<AttendanceResponseDTO> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    @GetMapping("/page")
    public List<AttendanceResponseDTO> getAttendanceWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "attendanceId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return attendanceService.getAttendanceWithPagination(
                page,
                size,
                sortBy,
                direction
        );
    }

    @GetMapping("/search")
    public List<AttendanceResponseDTO> searchAttendance(
            @RequestParam String keyword) {

        return attendanceService.searchAttendance(keyword);
    }

    @GetMapping("/{id:\\d+}")
    public AttendanceResponseDTO getAttendanceById(@PathVariable Long id) {
        return attendanceService.getAttendanceById(id);
    }

    @PutMapping("/{id}")
    public AttendanceResponseDTO updateAttendance(
            @PathVariable Long id,
            @Valid @RequestBody AttendanceRequestDTO attendanceRequestDTO) {

        return attendanceService.updateAttendance(id, attendanceRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
    }
}