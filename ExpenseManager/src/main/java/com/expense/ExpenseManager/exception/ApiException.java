package com.expense.ExpenseManager.exception;

public class ApiException extends RuntimeException {

    public ApiException(String message) {
        super(message);
    }
}
