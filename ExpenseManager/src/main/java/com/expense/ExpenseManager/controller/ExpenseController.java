package com.expense.ExpenseManager.controller;

import com.expense.ExpenseManager.dto.ExpenseRequest;
import com.expense.ExpenseManager.dto.ExpenseResponse;
import com.expense.ExpenseManager.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
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

    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getAllExpenses() {
        return ResponseEntity.ok(service.getAllExpenses());
    }
}
