import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper
} from "@mui/material";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import CsvUpload from "../components/CsvUpload";
import API from "../api/axios";

const ExpensesPage = () => {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const res = await API.get("/expenses");

      //  Handles both normal list and paginated response
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.content;

      setExpenses(data);

    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Expense Management
      </Typography>

      <Typography variant="subtitle1" color="text.secondary">
        Add, Upload, and Manage Your Expenses
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ExpenseForm onSuccess={fetchExpenses} />
        </Grid>

        <Grid item xs={12} md={4}>
          <CsvUpload onSuccess={fetchExpenses} />
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
        {/*  FIXED: pass rows + loading */}
        <ExpenseTable rows={expenses} loading={loading} />
      </Paper>
    </Box>
  );
};

export default ExpensesPage;