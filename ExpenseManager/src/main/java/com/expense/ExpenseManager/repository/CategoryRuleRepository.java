package com.expense.ExpenseManager.repository;

import com.expense.ExpenseManager.entity.CategoryRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRuleRepository extends JpaRepository<CategoryRule, Long> {

        @Query("SELECT c FROM CategoryRule c WHERE LOWER(:vendor) LIKE LOWER(CONCAT('%', c.vendorKeyword, '%'))")
        List<CategoryRule> findMatchingRule(@Param("vendor") String vendor);

}
