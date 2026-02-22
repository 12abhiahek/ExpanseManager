import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ExpensesPage from "../pages/ExpensesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/expenses" element={<ExpensesPage />} />
    </Routes>
  );
};

export default AppRoutes;