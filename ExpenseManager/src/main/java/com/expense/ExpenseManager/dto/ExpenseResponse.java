package com.expense.ExpenseManager.dto;

@Getter
@Builder
public class ExpenseResponse {

    private Long id;
    private LocalDate date;
    private Double amount;
    private String vendorName;
    private String description;
    private String category;
    private Boolean anomaly;
}
