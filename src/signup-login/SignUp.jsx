import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { LinkedIn, Google, Facebook } from "@mui/icons-material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    interest: "",
    country: "",
  });

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbarMessage("Data submitted successfully!");
        setSnackbarSeverity("success");
        setOpen(true);
      } else {
        setSnackbarMessage("Failed to submit data.");
        setSnackbarSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Error submitting data.");
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full flex">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="https://placehold.co/400x600"
            alt="Signup"
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Signup on OpenGrowth</h2>
          <div className="flex justify-between mb-4 gap-4">
            <Button
              variant="outlined"
              startIcon={<LinkedIn />}
              style={{ padding: "5px 30px" }}
            >
              LinkedIn
            </Button>
            <Button
              variant="outlined"
              startIcon={<Google />}
              style={{ padding: "5px 30px" }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<Facebook />}
              style={{ padding: "5px 35px" }}
            >
              Facebook
            </Button>
          </div>
          <div className="text-center text-gray-500 mb-4">or</div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-4"
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mb-4"
              />
              <FormControl fullWidth className="mb-4">
                <InputLabel>Interest</InputLabel>
                <Select
                  variant="outlined"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Interest 1">Interest 1</MenuItem>
                  <MenuItem value="Interest 2">Interest 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth className="mb-4">
                <InputLabel>Country</InputLabel>
                <Select
                  variant="outlined"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Country 1">Country 1</MenuItem>
                  <MenuItem value="Country 2">Country 2</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mb-4"
                type="submit"
              >
                Register Now
              </Button>
            </div>
          </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <div className="mt-5 text-center text-gray-500 text-sm">
            By registering, I agree to the OpenGrowth Academy{" "}
            <a href="#" className="text-blue-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
