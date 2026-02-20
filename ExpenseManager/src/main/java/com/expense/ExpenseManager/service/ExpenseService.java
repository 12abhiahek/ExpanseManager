package com.expense.ExpenseManager.service;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseService {

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

        expenseRepository.save(expense);

        detectAnomaly(expense);

        return ExpenseMapper.toResponse(expense);
    }

    private String assignCategory(String vendor) {

        return ruleRepository.findAll().stream()
                .filter(rule -> vendor.toLowerCase()
                        .contains(rule.getVendorKeyword().toLowerCase()))
                .map(CategoryRule::getCategory)
                .findFirst()
                .orElse("Others");
    }

    private void detectAnomaly(Expense expense) {

        Double avg =
                expenseRepository.findAverageByCategory(
                        expense.getCategory());

        if (avg != null && avg > 0 &&
                expense.getAmount() > 3 * avg) {
            expense.setAnomaly(true);
        }
    }

    public void uploadCsv(MultipartFile file) {
        List<ExpenseRequest> list =
                CsvParserUtil.parse(file);

        list.forEach(this::addExpense);
    }
}
