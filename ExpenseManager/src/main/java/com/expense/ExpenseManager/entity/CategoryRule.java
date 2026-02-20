package com.expense.ExpenseManager.entity;

@Entity
@Table(name = "category_rules")
@Getter
@Setter
public class CategoryRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vendorKeyword;

    private String category;
}
