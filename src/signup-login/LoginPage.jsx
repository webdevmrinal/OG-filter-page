import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  Link,
  Divider,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import Footer from "./Footer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FacebookIcon, GoogleIcon, LinkedInIcon } from "./Icons";
import Header from "./Header";
import { loginPageConfig } from "../configs/login.config";
import { FormButton, SocialButtons } from "./Components/Buttons";
import { FormPaper } from "./Components/Cards";
import { FormContainer, SocialBox } from "./Components/Box";
import { FormTextField } from "./Components/TextField";
import { SliderStyles } from "./Components/SliderStyle";
import { ShimmerLoading } from "./Components/ShimmerEffect";
import ShimmerSignup from "./Components/SignupShimmer";
import users from "./Components/MockUsers"; // Import the mock users from the file

const iconComponents = {
  LinkedInIcon,
  GoogleIcon,
  FacebookIcon,
};

const LoginPage = () => {
  const { images, sliderSettings, navItems, socialButtons, formValidation } =
    loginPageConfig;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userNotRegistered, setUserNotRegistered] = useState(false); // To show if user not registered
  const [showSnackbar, setShowSnackbar] = useState(false); // To show snackbar
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setImagesLoaded(true), 500);
    }, 500);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(formValidation.email.invalid)
        .required(formValidation.email.required),
      password: Yup.string()
        .min(
          formValidation.password.minLength.value,
          formValidation.password.minLength.message
        )
        .required(formValidation.password.required),
    }),
    onSubmit: (values) => {
      setSubmitting(true); // Show loading spinner
  
      const user = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
  
      if (user) {
        // Simulate a delay to show the loading spinner
        setTimeout(() => {
          console.log("User logged in:", user.name);
          setSubmitting(false); // Stop the loading spinner
          navigate("/dashboardpage"); // Redirect after success
        }, 1000); // 2 seconds delay to show the spinner
      } else {
        // If user is not found, show the error message
        setTimeout(() => {
          setSubmitting(false); // Stop the loading spinner
          setUserNotRegistered(true);
          setShowSnackbar(true); // Show snackbar on failure
        }, 1000); // 1 second delay for error simulation
      }
    },
  });
  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false); // Close the snackbar manually
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <ShimmerSignup />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, px: 1 }}>
      <Header />
      <FormContainer>
        <FormPaper>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              flexGrow: 1,
              position: "relative",
              display: { xs: "none", md: "block" },
            }}
          >
            {imagesLoaded && (
              <Slider {...sliderSettings}>
                {images.map((url, index) => (
                  <SliderStyles key={index} sx={{ backgroundImage: `url(${url})` }} />
                ))}
              </Slider>
            )}
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              p: { xs: 2, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <Box
              display={"flex"}
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "center", sm: "space-between" },
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "600", mt: { sm: 2 } }}>
                Login on OpenGrowth
              </Typography>

              {/* Login Link */}
              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Didn't have an account?
                <Link
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                  onClick={() => navigate("/signup")}
                >
                  Join now
                </Link>
              </Typography>
            </Box>

            <Divider />
            <SocialBox>
              {loginPageConfig.socialButtons.map((button, index) => {
                const IconComponent = iconComponents[button.icon];
                if (!IconComponent) {
                  console.error(`Icon component for ${button.icon} not found`);
                  return null;
                }
                return (
                  <SocialButtons key={index} variant="outlined">
                    <IconComponent
                      style={{ marginRight: 1, width: 20, height: 20 }}
                    />
                    <Typography variant={"subtitle2"} sx={{ mt: 0.5, ml: 1 }}>
                      {button.label}
                    </Typography>
                  </SocialButtons>
                );
              })}
            </SocialBox>
            <Divider sx={{ my: 2, fontSize: ".75em" }}>OR</Divider>
            <Box sx={{ mt: 2 }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormTextField
                      fullWidth
                      label="Email Address"
                      {...formik.getFieldProps("email")}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Link href="#" variant="body2" sx={{ mb: 2 }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <FormButton
                      variant="contained"
                      type="submit"
                      disabled={submitting} // Disable the button while submitting
                    >
                      {submitting ? <CircularProgress size={24} /> : "Login Now"}
                    </FormButton>
                  </Grid>
                </Grid>
              </form>
            </Box>

            {/* Snackbar to show if user is not registered */}
            <Snackbar
              open={showSnackbar}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={4000}
            >
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                You are not registered. <Link onClick={() => navigate("/signup")} sx={{ cursor: 'pointer' }}>Join now</Link>.
              </Alert>
            </Snackbar>
          </Box>
        </FormPaper>
      </FormContainer>
      <Footer />
    </Box>
  );
};

export default LoginPage;
