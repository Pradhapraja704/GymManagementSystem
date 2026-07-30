package com.gymmanagement.dto;

public class DashboardResponseDTO {

    private long totalMembers;
    private long totalTrainers;
    private long totalAttendance;
    private long activeMembers;

    public DashboardResponseDTO() {
    }

    public DashboardResponseDTO(long totalMembers, long totalTrainers, long totalAttendance, long activeMembers) {
        this.totalMembers = totalMembers;
        this.totalTrainers = totalTrainers;
        this.totalAttendance = totalAttendance;
        this.activeMembers = activeMembers;
    }

    public long getTotalMembers() {
        return totalMembers;
    }

    public void setTotalMembers(long totalMembers) {
        this.totalMembers = totalMembers;
    }

    public long getTotalTrainers() {
        return totalTrainers;
    }

    public void setTotalTrainers(long totalTrainers) {
        this.totalTrainers = totalTrainers;
    }

    public long getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(long totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    public long getActiveMembers() {
        return activeMembers;
    }

    public void setActiveMembers(long activeMembers) {
        this.activeMembers = activeMembers;
    }
}