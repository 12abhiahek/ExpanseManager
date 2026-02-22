import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#1976d2", "#ff9800", "#4caf50", "#e91e63"];

const CategoryChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value
  }));

  const total = chartData.reduce((sum, i) => sum + i.value, 0);

  return (
    <Box sx={{ width: "100%" }}>
      
      {/* ================= DONUT CHART ================= */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          mx: "auto",
          aspectRatio: "1 / 1",
          position: "relative"
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="62%"
              outerRadius="82%"
              paddingAngle={2}
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) =>
                `₹ ${value.toLocaleString()}`
              }
            />
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER TEXT */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center"
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Expense
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            ₹ {total.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Across all categories
          </Typography>
        </Box>
      </Box>

      {/* ================= LEGEND (SEPARATE, NO OVERLAP) ================= */}
      <Box sx={{ mt: 3 }}>
        {chartData.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);
          return (
            <Box
              key={item.name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                mb: 1
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor:
                      COLORS[index % COLORS.length],
                    mr: 1
                  }}
                />
                <Typography variant="body2">
                  {item.name}
                </Typography>
              </Box>

              <Typography variant="body2" fontWeight="bold">
                ₹ {item.value.toLocaleString()} ({percent}%)
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoryChart;