package com.expense.ExpenseManager.controller;

import com.expense.ExpenseManager.dto.DashboardResponse;
import com.expense.ExpenseManager.service.DashboardService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // optional if global CORS exists
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboard(
            @RequestParam(required = false) Integer month) {

        // If month not passed → use current month
        if (month == null) {
            month = LocalDate.now().getMonthValue();
        }

        return dashboardService.getDashboard(month);
    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard(@RequestParam int month) {
        return dashboardService.getDashboard(month);
    }
}