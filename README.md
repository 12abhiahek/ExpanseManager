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
