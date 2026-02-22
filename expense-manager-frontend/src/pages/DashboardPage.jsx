
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Divider,
  Card,
  CardContent
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import WarningIcon from "@mui/icons-material/Warning";

import API from "../api/axios";
import CategoryChart from "../components/CategoryChart";
import TopVendorsChart from "../components/TopVendorsChart";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = () => {
    setLoading(true);

    API.get("/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error loading dashboard", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Typography sx={{ mt: 4 }} align="center">
        No dashboard data available
      </Typography>
    );
  }

  const totalExpense = data.monthlyTotals
    ? Object.values(data.monthlyTotals).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        px: 5,
        py: 4
      }}
    >
      {/* ================= HEADER ================= */}
      <Typography variant="h4" fontWeight="bold">
        Dashboard
      </Typography>

      <Typography variant="subtitle1" color="text.secondary">
        Expense Analytics Overview
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* ================= SUMMARY CARDS ================= */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Total Expense */}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              borderRadius: 5,
              height: 150,
              p: 1,
              transition: "all 0.4s ease",
              cursor: "pointer",
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              color: "#fff",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }
            }}
          >
            <CardContent>
              <TrendingUpIcon sx={{ fontSize: 32 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Total Expense
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ₹ {totalExpense.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Overall spending this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Categories */}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              borderRadius: 5,
              height: 150,
              p: 1,
              transition: "all 0.4s ease",
              cursor: "pointer",
              background: "linear-gradient(135deg, #9c27b0, #ba68c8)",
              color: "#fff",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }
            }}
          >
            <CardContent>
              <CategoryIcon sx={{ fontSize: 32 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Categories
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {Object.keys(data.monthlyTotals || {}).length}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Active spending categories
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Vendors */}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              borderRadius: 5,
              height: 150,
              p: 1,
              transition: "all 0.4s ease",
              cursor: "pointer",
              background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
              color: "#fff",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }
            }}
          >
            <CardContent>
              <StoreIcon sx={{ fontSize: 32 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Top Vendors
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {data.topVendors?.length || 0}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Highest expense vendors
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Anomalies */}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              borderRadius: 5,
              height: 150,
              p: 1,
              transition: "all 0.4s ease",
              cursor: "pointer",
              background: "linear-gradient(135deg, #d32f2f, #ef5350)",
              color: "#fff",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }
            }}
          >
            <CardContent>
              <WarningIcon sx={{ fontSize: 32 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Anomalies
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {data.anomalyCount}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Suspicious transactions detected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= CHART SECTION ================= */}
      <Grid
        container
        spacing={4}
        sx={{ alignItems: "stretch" }}
      >
        {/* CATEGORY CARD */}
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 6,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              background: "#fff",
              transition: "all 0.3s ease",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Category Breakdown
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Distribution of expenses by category
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ flex: 1 }}>
              <CategoryChart data={data.monthlyTotals} />
            </Box>
          </Paper>
        </Grid>

        {/* TOP VENDORS CARD */}
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 6,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              background: "#fff",
              transition: "all 0.3s ease",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Top Vendors
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Highest spending vendors
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ flex: 1 }}>
              <TopVendorsChart vendors={data.topVendors} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;