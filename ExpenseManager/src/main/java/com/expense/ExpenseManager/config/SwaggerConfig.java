package com.expense.ExpenseManager.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class  SwaggerConfig {

    @Bean
    public OpenAPI expenseManagerOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Expense Manager API")
                        .version("1.0.0")
                        .description("API documentation for Expense Manager Application")
                        .contact(new Contact()
                                .name("Abhishek Singh")
                                .email("abhishek184april@gmail.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")));
    }
}
