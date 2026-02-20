package com.expense.ExpenseManager.dto;

@Getter
@AllArgsConstructor
public class DashboardResponse {

    private Map<String, Double> monthlyTotals;
    private List<String> topVendors;
    private long anomalyCount;
}
