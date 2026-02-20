package com.expense.ExpenseManager.entity;

@Entity
@Table(name = "expenses")
@Getter
@Setter
public class Expense {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private Double amount;

    private String vendorName;

    @Column(length = 1000)
    private String description;

    private String category;

    private Boolean anomaly = false;
}
