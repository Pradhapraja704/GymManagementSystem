package com.gymmanagement.controller;

import com.gymmanagement.dto.DashboardResponseDTO;
import com.gymmanagement.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardResponseDTO getDashboardSummary() {
        return dashboardService.getDashboardSummary();
    }
}