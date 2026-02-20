package com.expense.ExpenseManager.service;


@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseRepository repository;

    public DashboardResponse getDashboard(int month) {

        List<Expense> expenses =
                repository.findByMonth(month);

        Map<String, Double> monthlyTotals =
                expenses.stream()
                        .collect(Collectors.groupingBy(
                                Expense::getCategory,
                                Collectors.summingDouble(Expense::getAmount)));

        List<String> topVendors =
                expenses.stream()
                        .collect(Collectors.groupingBy(
                                Expense::getVendorName,
                                Collectors.summingDouble(Expense::getAmount)))
                        .entrySet().stream()
                        .sorted(Map.Entry.<String, Double>
                                comparingByValue().reversed())
                        .limit(5)
                        .map(Map.Entry::getKey)
                        .toList();

        long anomalyCount =
                expenses.stream()
                        .filter(Expense::getAnomaly)
                        .count();

        return new DashboardResponse(
                monthlyTotals,
                topVendors,
                anomalyCount
        );
    }
}
