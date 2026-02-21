package com.expense.ExpenseManager.Mapper;

import com.expense.ExpenseManager.dto.ExpenseResponse;
import com.expense.ExpenseManager.entity.Expense;

public class ExpenseMapper {

    public static ExpenseResponse toResponse(Expense e) {
        return ExpenseResponse.builder()
                .id(e.getId())
                .date(e.getDate())
                .amount(e.getAmount())
                .vendorName(e.getVendorName())
                .description(e.getDescription())
                .category(e.getCategory())
                .anomaly(e.getAnomaly())
                .build();
    }
}
