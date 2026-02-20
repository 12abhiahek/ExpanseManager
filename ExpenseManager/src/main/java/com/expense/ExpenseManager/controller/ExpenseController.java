package com.expense.ExpenseManager.controller;

import com.expensemanager.dto.*;
import com.expensemanager.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService service;

    @PostMapping
    public ResponseEntity<ExpenseResponse>
    add(@Valid @RequestBody ExpenseRequest request) {

        return ResponseEntity.ok(service.addExpense(request));
    }

    @PostMapping("/upload")
    public ResponseEntity<String>
    upload(@RequestParam MultipartFile file) {

        service.uploadCsv(file);
        return ResponseEntity.ok("Uploaded successfully");
    }
}
