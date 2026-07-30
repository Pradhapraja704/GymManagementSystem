package com.gymmanagement.repository;

import com.gymmanagement.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByStatusContainingIgnoreCaseOrRemarksContainingIgnoreCase(
            String status,
            String remarks
    );

    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

}