package com.expense.ExpenseManager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ExpenseRequest {

    @NotNull
    private LocalDate date;

    @NotNull
    @Positive
    private Double amount;

    @NotBlank
    private String vendorName;

    private String description;
}
