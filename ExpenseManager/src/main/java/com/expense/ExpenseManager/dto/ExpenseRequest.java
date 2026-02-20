package com.expense.ExpenseManager.dto;

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
