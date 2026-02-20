package com.expense.ExpenseManager.controller;

import com.expensemanager.dto.DashboardResponse;
import com.expensemanager.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor

public class DashboardController {

    private final DashboardService service;


    @GetMapping
    public DashboardResponse getDashboard(
            @RequestParam int month) {

        return service.getDashboard(month);
    }
}
