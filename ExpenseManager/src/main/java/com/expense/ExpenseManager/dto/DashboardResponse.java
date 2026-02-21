package com.expense.ExpenseManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
public class DashboardResponse {

//    private Map<String, Double> monthlyTotals;
//    private List<String> topVendors;
//    private long anomalyCount;

    private Map<String, Double> monthlyTotals;
    private List<Map<String, Object>> topVendors;
    private long anomalyCount;
}
