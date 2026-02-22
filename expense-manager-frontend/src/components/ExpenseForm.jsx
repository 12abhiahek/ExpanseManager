// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Snackbar,
//   Alert
// } from "@mui/material";
// import API from "../api/axios";

// const ExpenseForm = ({ onSuccess }) => {

//   const [form, setForm] = useState({
//     date: "",
//     amount: "",
//     vendorName: "",
//     description: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleChange = (field, value) => {
//     setForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = async () => {

//     if (!form.date || !form.amount || !form.vendorName) {
//       alert("Please fill required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       await API.post("/expenses", {
//         ...form,
//         amount: Number(form.amount)
//       });

//       setOpen(true);

//       // 🔥 Refresh table
//       if (onSuccess) {
//         onSuccess();
//       }

//       // Reset form
//       setForm({
//         date: "",
//         amount: "",
//         vendorName: "",
//         description: ""
//       });

//     } catch (err) {
//       console.error("Error adding expense:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Add Expense
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 label="Date"
//                 type="date"
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//                 value={form.date}
//                 onChange={(e) => handleChange("date", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={3}>
//               <TextField
//                 label="Amount"
//                 type="number"
//                 fullWidth
//                 value={form.amount}
//                 onChange={(e) => handleChange("amount", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={3}>
//               <TextField
//                 label="Vendor"
//                 fullWidth
//                 value={form.vendorName}
//                 onChange={(e) => handleChange("vendorName", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={3}>
//               <TextField
//                 label="Description"
//                 fullWidth
//                 value={form.description}
//                 onChange={(e) => handleChange("description", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 {loading ? "Adding..." : "Add Expense"}
//               </Button>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={() => setOpen(false)}
//       >
//         <Alert severity="success" variant="filled">
//           Expense Added Successfully
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default ExpenseForm;




import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Box
} from "@mui/material";
import API from "../api/axios";

const ExpenseForm = ({ onSuccess }) => {

  const [form, setForm] = useState({
    date: "",
    amount: "",
    vendorName: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {

    if (!form.date || !form.amount || !form.vendorName) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/expenses", {
        ...form,
        amount: Number(form.amount)
      });

      setOpen(true);

      if (onSuccess) onSuccess();

      setForm({
        date: "",
        amount: "",
        vendorName: "",
        description: ""
      });

    } catch (err) {
      console.error("Error adding expense:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          mt: 3,
          borderRadius: 4,
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Add New Expense
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Vendor Name"
                fullWidth
                value={form.vendorName}
                onChange={(e) => handleChange("vendorName", e.target.value)}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Description"
                fullWidth
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    px: 5,
                    py: 1.2,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "14px",
                    boxShadow: "0 6px 15px rgba(25,118,210,0.3)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 20px rgba(25,118,210,0.4)"
                    }
                  }}
                >
                  {loading ? "Adding..." : "Add Expense"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ borderRadius: 3 }}
        >
          Expense Added Successfully 🎉
        </Alert>
      </Snackbar>
    </>
  );
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    transition: "0.3s",
    "&:hover fieldset": {
      borderColor: "#1976d2"
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px"
    }
  }
};

export default ExpenseForm;