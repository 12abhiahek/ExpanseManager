import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
  Box
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import API from "../api/axios";

const CsvUpload = () => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await API.post("/expenses/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setOpen(true);
      setFileName("");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          mb: 3,
          borderRadius: 4,
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Upload Expenses (CSV)
          </Typography>

          <Box
            sx={{
              border: "2px dashed #1976d2",
              borderRadius: 4,
              p: 5,
              textAlign: "center",
              backgroundColor: "#f9fbff",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#eef4ff",
                transform: "translateY(-3px)",
                boxShadow: "0 8px 20px rgba(25,118,210,0.15)"
              }
            }}
          >
            <CloudUploadIcon
              sx={{ fontSize: 50, color: "#1976d2", mb: 2 }}
            />

            <Typography variant="body1" sx={{ mb: 2 }}>
              Drag & Drop your CSV file here or click below
            </Typography>

            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              disabled={loading}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "0 6px 15px rgba(25,118,210,0.3)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 20px rgba(25,118,210,0.4)"
                }
              }}
            >
              {loading ? "Uploading..." : "Choose CSV File"}
              <input
                hidden
                type="file"
                accept=".csv"
                onChange={handleUpload}
              />
            </Button>

            {fileName && (
              <Typography
                variant="body2"
                sx={{ mt: 2, color: "gray" }}
              >
                Selected File: {fileName}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: 3 }}>
          CSV Uploaded Successfully 🎉
        </Alert>
      </Snackbar>
    </>
  );
};

export default CsvUpload;