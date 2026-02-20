package com.expense.ExpenseManager.exception;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String>
    handle(Exception ex) {

        return ResponseEntity
                .badRequest()
                .body(ex.getMessage());
    }
}
