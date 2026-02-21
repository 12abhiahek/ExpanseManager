package com.expense.ExpenseManager.repository;

import com.expense.ExpenseManager.entity.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT AVG(e.amount) FROM Expense e WHERE e.category = :category")
    Double findAverageByCategory(@Param("category") String category);

    @Query("SELECT e FROM Expense e WHERE MONTH(e.date) = :month")
    List<Expense> findByMonth(@Param("month") int month);

    Page<Expense> findAll(Pageable pageable);

    @Query("""
       SELECT e.vendorName, SUM(e.amount)
       FROM Expense e
       WHERE MONTH(e.date) = :month
       GROUP BY e.vendorName
       ORDER BY SUM(e.amount) DESC
    """)
    List<Object[]> findTopVendors(@Param("month") int month);

    @Query("""
   SELECT e.category, SUM(e.amount)
   FROM Expense e
   WHERE MONTH(e.date) = :month
   GROUP BY e.category
""")
    List<Object[]> findMonthlyTotals(@Param("month") int month);

    @Query("""
   SELECT COUNT(e)
   FROM Expense e
   WHERE MONTH(e.date) = :month
   AND e.anomaly = true
""")
    long countMonthlyAnomalies(@Param("month") int month);
}
