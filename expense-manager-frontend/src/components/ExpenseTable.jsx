import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ExpenseTable = ({ rows = [], loading = false }) => {

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },

    { field: "vendorName", headerName: "Vendor", flex: 1 },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <strong>₹ {params.value}</strong>
      )
    },

    { field: "category", headerName: "Category", flex: 1 },

    {
      field: "anomaly",
      headerName: "Status",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Anomaly" color="error" size="small" />
        ) : (
          <Chip label="Normal" color="success" size="small" />
        )
    }
  ];

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Recent Expenses
        </Typography>

        <Box sx={{ height: 450, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } }
            }}
            getRowClassName={(params) =>
              params.row.anomaly ? "anomaly-row" : ""
            }
            sx={{
              border: "none",

              // Header Styling
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f9fafb",
                fontWeight: "bold",
                fontSize: "14px"
              },

              // Smooth transition for row
              "& .MuiDataGrid-row": {
                transition: "all 0.25s ease",
                borderLeft: "4px solid transparent"
              },

              // Strong Hover Effect
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e3f2fd",
                transform: "scale(1.01)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderLeft: "4px solid #1976d2",
                cursor: "pointer"
              },

              // Anomaly row strong highlight
              "& .anomaly-row": {
                backgroundColor: "#fff5f5",
                borderLeft: "4px solid #d32f2f"
              },

              "& .anomaly-row:hover": {
                backgroundColor: "#ffebee",
                transform: "scale(1.01)",
                boxShadow: "0 4px 12px rgba(211,47,47,0.2)"
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpenseTable;