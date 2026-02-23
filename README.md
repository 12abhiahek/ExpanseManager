#  Mini Expense Manager

A full-stack application to track daily expenses with rule-based categorization, anomaly detection, CSV upload, and dashboard analytics.

---

##  Features

###  Add Expense Manually
- Fields: Date, Amount, Vendor Name, Description
- Category auto-assigned based on vendor-to-category mapping

###  CSV Upload
- Upload multiple expenses via CSV
- Backend parses and stores entries
- Same business logic applied as manual entry

###  Rule-Based Categorization
- Vendor → Category mapping stored in database
- Automatically assigns category during expense creation

###  Anomaly Detection
- If expense > 3× average of its category → flagged as anomaly
- Anomalies highlighted distinctly in UI
- Anomaly status stored in database

###  Dashboard Summary
- Monthly totals per category
- Top 5 vendors by total spend
- Count of anomalies

---

##  Technologies Used

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

### Frontend
- React
- Material UI (MUI)
- Axios

---

## ⚙ Setup Instructions

### 🔹 Backend Setup

1. Clone the repository


git clone <your-repository-url>
cd ExpenseManager

2. Create MySQL database
CREATE DATABASE expense_manager;

3. Update application.properties

4. Run backend
mvn spring-boot:run

### 🔹 Frontend Setup
cd expense-manager-frontend
npm install
npm run dev

### CSV Format
date,amount,vendorName,description

### Short Design Note
The application uses a rule-based categorization system where vendor-to-category mappings are stored in a dedicated database table. During expense creation (manual or CSV), the vendor name is matched against this mapping to automatically assign a category.

Anomaly detection is performed in the service layer by calculating the average expense amount for the category and checking if the new expense exceeds 3× that average. The anomaly flag is stored in the database to avoid recalculating on every dashboard request.

The data model includes separate entities for Expense and CategoryRule to maintain clean separation of business rules and transactional data.

A key trade-off made was calculating the category average dynamically at insertion time instead of maintaining aggregated statistics for simplicity. CSV upload reuses the same expense service method to ensure consistent business logic.

### Architecture Overview
## Entities
- Expense
- id
- date
- amount
- vendorName
- category
- description
- anomaly (boolean)

## CategoryRule

- id
- vendorKeyword
- category

### Screen Short
- Dashboard Deatils
<img width="1873" height="1017" alt="image" src="https://github.com/user-attachments/assets/a5b24c71-8e8c-4055-ad60-d0ae1f8c5788" />

- <img width="1598" height="720" alt="image" src="https://github.com/user-attachments/assets/c59c6438-5970-4d01-a709-2b439d98531c" />

- Expense management
<img width="1576" height="833" alt="image" src="https://github.com/user-attachments/assets/fd9328a2-116d-4243-8dee-0f485b532a30" />

-Expense Table
<img width="1605" height="764" alt="image" src="https://github.com/user-attachments/assets/7d1870d5-1174-417b-b620-403cb16256a5" />

