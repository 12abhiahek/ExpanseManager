package com.expense.ExpenseManager.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT AVG(e.amount) FROM Expense e WHERE e.category = :category")
    Double findAverageByCategory(@Param("category") String category);

    @Query("SELECT e FROM Expense e WHERE MONTH(e.date) = :month")
    List<Expense> findByMonth(@Param("month") int month);

    Page<Expense> findAll(Pageable pageable);
}
