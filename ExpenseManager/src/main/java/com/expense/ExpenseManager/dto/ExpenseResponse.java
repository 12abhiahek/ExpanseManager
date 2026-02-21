package com.expense.ExpenseManager.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

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
