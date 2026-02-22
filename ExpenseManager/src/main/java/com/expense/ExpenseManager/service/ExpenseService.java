package com.expense.ExpenseManager.service;

import com.expense.ExpenseManager.Mapper.ExpenseMapper;
import com.expense.ExpenseManager.dto.ExpenseRequest;
import com.expense.ExpenseManager.dto.ExpenseResponse;
import com.expense.ExpenseManager.entity.CategoryRule;
import com.expense.ExpenseManager.entity.Expense;
import com.expense.ExpenseManager.repository.CategoryRuleRepository;
import com.expense.ExpenseManager.repository.ExpenseRepository;
import com.expense.ExpenseManager.util.CsvParserUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class

ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRuleRepository ruleRepository;

    public ExpenseResponse addExpense(ExpenseRequest request) {

        Expense expense = new Expense();
        expense.setDate(request.getDate());
        expense.setAmount(request.getAmount());
        expense.setVendorName(request.getVendorName());
        expense.setDescription(request.getDescription());

        String category = assignCategory(request.getVendorName());
        expense.setCategory(category);

        // Detect BEFORE saving
        boolean isAnomaly = isAnomaly(category, request.getAmount());
        expense.setAnomaly(isAnomaly);

        expenseRepository.save(expense);

//        detectAnomaly(expense);

        return ExpenseMapper.toResponse(expense);
    }

//    private String assignCategory(String vendor) {
//
//        return ruleRepository.findAll().stream()
//                .filter(rule -> vendor.toLowerCase()
//                        .contains(rule.getVendorKeyword().toLowerCase()))
//                .map(CategoryRule::getCategory)
//                .findFirst()
//                .orElse("Others");
//    }

    private String assignCategory(String vendor) {

        List<CategoryRule> rules = ruleRepository.findMatchingRule(vendor);

        if (!rules.isEmpty()) {
            return rules.get(0).getCategory();
        }

        return "Others";
    }

//    private void detectAnomaly(Expense expense) {
//
//        Double avg =
//                expenseRepository.findAverageByCategory(
//                        expense.getCategory());
//
//        if (avg != null && avg > 0 &&
//                expense.getAmount() > 3 * avg) {
//            expense.setAnomaly(true);
//        }
//    }


    private boolean isAnomaly(String category, Double amount) {

        Double avg = expenseRepository.findAverageByCategory(category);

        if (avg == null || avg == 0) {
            return false;  // first entry case
        }

        double threshold = avg * 3;

        return amount > threshold;
    }

    public void uploadCsv(MultipartFile file) {
        List<ExpenseRequest> list =
                CsvParserUtil.parse(file);

        list.forEach(this::addExpense);
    }

    public List<ExpenseResponse> getAllExpenses() {
        return expenseRepository.findAll().stream()
                .map(ExpenseMapper::toResponse)
                .toList();
    }
}
