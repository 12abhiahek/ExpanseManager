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
//public class DashboardService {
//
//    private final ExpenseRepository repository;
//
//    public DashboardResponse getDashboard(int month) {
//
//        List<Expense> expenses =
//                repository.findByMonth(month);
//
//        Map<String, Double> monthlyTotals =
//                expenses.stream()
//                        .collect(Collectors.groupingBy(
//                                Expense::getCategory,
//                                Collectors.summingDouble(Expense::getAmount)));
//
//        List<String> topVendors =
//                expenses.stream()
//                        .collect(Collectors.groupingBy(
//                                Expense::getVendorName,
//                                Collectors.summingDouble(Expense::getAmount)))
//                        .entrySet().stream()
//                        .sorted(Map.Entry.<String, Double>
//                                comparingByValue().reversed())
//                        .limit(5)
//                        .map(Map.Entry::getKey)
//                        .toList();
//
//        long anomalyCount =
//                expenses.stream()
//                        .filter(Expense::getAnomaly)
//                        .count();
//
//        return new DashboardResponse(
//                monthlyTotals,
//                topVendors,
//                anomalyCount
//        );
//    }
//}


//@Service
//@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseRepository repository;

    public DashboardResponse getDashboard(int month) {

        // 1️⃣ Category totals
        Map<String, Double> monthlyTotals =
                repository.findMonthlyTotals(month)
                        .stream()
                        .collect(Collectors.toMap(
                                row -> (String) row[0],
                                row -> (Double) row[1]
                        ));

        // 2️⃣ Top vendors
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

        // 3️⃣ Anomaly count
        long anomalyCount =
                repository.countMonthlyAnomalies(month);

        return new DashboardResponse(
                monthlyTotals,
                topVendors,
                anomalyCount
        );
    }
}