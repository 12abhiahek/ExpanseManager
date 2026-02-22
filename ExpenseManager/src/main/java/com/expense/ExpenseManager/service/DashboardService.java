package com.expense.ExpenseManager.service;


import com.expense.ExpenseManager.dto.DashboardResponse;
import com.expense.ExpenseManager.entity.Expense;
import com.expense.ExpenseManager.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseRepository repository;

    public DashboardResponse getDashboard(int month) {

        //  Category totals
        Map<String, Double> monthlyTotals =
                repository.findMonthlyTotals(month)
                        .stream()
                        .collect(Collectors.toMap(
                                row -> (String) row[0],
                                row -> (Double) row[1]
                        ));

        //  Top vendors
        List<Map<String, Object>> topVendors =
                repository.findTopVendors(month)
                        .stream()
                        .limit(5)
                        .map(row -> {
                            Map<String, Object> map = new HashMap<>();
                            map.put("name", row[0]);
                            map.put("amount", row[1]);
                            return map;
                        })
                        .toList();

        //  Anomaly count
        long anomalyCount =
                repository.countMonthlyAnomalies(month);

        return new DashboardResponse(
                monthlyTotals,
                topVendors,
                anomalyCount
        );
    }
}