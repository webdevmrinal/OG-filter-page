import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  IconButton,
  Link,
  MenuItem,
  Divider,
  CircularProgress,
  Box,
  Grid,
  Autocomplete,
} from "@mui/material";
import Slider from "react-slick";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Footer from "./Footer";
import Header from "./Header";
import { LinkedInIcon, GoogleIcon, FacebookIcon } from "./Icons";
import { signupConfig } from "../configs/signup.config";
import { FormButton, SocialButtons } from "./Components/Buttons";
import { FormPaper } from "./Components/Cards";
import { FormContainer, SocialBox } from "./Components/Box";
import { FormTextField } from "./Components/TextField";
import { SliderStyles } from "./Components/SliderStyle";
import { ShimmerLoading } from "./Components/ShimmerEffect";
import ShimmerSignup from "./Components/SignupShimmer";

const iconComponents = {
  LinkedInIcon,
  GoogleIcon,
  FacebookIcon,
};

const SignupPage = ({ resetAllData }) => {
  const { images, interests, countries, sliderSettings } = signupConfig;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Load Page1 and Page2 data from localStorage if it exists
  const page1Data = JSON.parse(localStorage.getItem('page1Data'));
  const page2Data = JSON.parse(localStorage.getItem('page2Data'));

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    interests: [],
    country: "",
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setImagesLoaded(true), 1000);
    }, 2000);
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const validationSchema = Yup.object({
    firstName: Yup.string().required(
      signupConfig.formValidation.firstName.required
    ),
    lastName: Yup.string().required(
      signupConfig.formValidation.lastName.required
    ),
    email: Yup.string()
      .email(signupConfig.formValidation.email.invalid)
      .required(signupConfig.formValidation.email.required),
    password: Yup.string()
      .min(
        signupConfig.formValidation.password.min.value,
        signupConfig.formValidation.password.min.message
      )
      .required(signupConfig.formValidation.password.required),
    interests: Yup.array()
      .min(
        signupConfig.formValidation.interests.min.value,
        signupConfig.formValidation.interests.min.message
      ),
    country: Yup.string().required(signupConfig.formValidation.country.required),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values); 
      setSubmitting(true);
  
      // Get existing submissions from localStorage
      const existingSubmissions =
        JSON.parse(localStorage.getItem("signupSubmissions")) || [];
  
      // Prepare new submission data
      const newSubmission = {
        ...values,
        page1Data,  // Include locked Page1 data if needed
        page2Data,  // Include locked Page2 data if needed
        submittedAt: new Date().toISOString(),
      };
  
      // Append the new submission to the existing ones
      existingSubmissions.push(newSubmission);
  
      // Save updated submissions to localStorage
      localStorage.setItem("signupSubmissions", JSON.stringify(existingSubmissions));
  
      // Clear form data after submission
      formik.resetForm();
  
      // Redirect after successful submission
      setSubmitting(false);
      navigate("/dashboardpage");
    },
  });  
  

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
              display: { xs: "none", md: "block" }, // Hide on xs, show on md and larger
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
              p: { xs: 2, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <Button
              sx={{
                px: 4,
                position: "absolute",
                top: "10px",
                left: "10px",
                color: "primary.main",
              }}
              onClick={() =>
                navigate(signupConfig.backButton.route, {
                  state: { fromSignup: true },
                })
              }
            >
              &lt; {signupConfig.backButton.text}
            </Button>
            <Box
              display={"flex"}
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "center", sm: "space-between" },
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", mt: { xs: 4, sm: 2 } }}
              >
                Signup on OpenGrowth
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: { xs: 1, sm: 3 } }}>
                Already registered?{" "}
                <Link
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                  onClick={() => navigate("/login")}
                >
                  Login now
                </Link>
              </Typography>
            </Box>
            <Divider />
            <SocialBox>
              {signupConfig.socialButtons.map((button, index) => {
                const IconComponent = iconComponents[button.icon];
                if (!IconComponent) {
                  console.error(`Icon component for ${button.icon} not found`);
                  return null;
                }
                return (
                  <SocialButtons key={index} variant="outlined">
                    <IconComponent style={{ marginRight: 1, width: 20, height: 20 }} />
                    <Typography variant="subtitle2" sx={{ mt: 0.5, ml: 1 }}>
                      {button.label}
                    </Typography>
                  </SocialButtons>
                );
              })}
            </SocialBox>
            <Divider sx={{ my: 1, fontSize: ".75em" }}>OR</Divider>
            <Box sx={{ mt: 2 }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormTextField
                      fullWidth
                      label="First Name"
                      {...formik.getFieldProps("firstName")}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormTextField
                      fullWidth
                      label="Last Name"
                      {...formik.getFieldProps("lastName")}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>

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
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
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
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      id="interests"
                      options={interests}
                      getOptionLabel={(option) => option}
                      value={formik.values.interests}
                      onChange={(event, value) => {
                        formik.setFieldValue("interests", value);
                      }}
                      renderInput={(params) => (
                        <FormTextField
                          {...params}
                          label="Interests"
                          error={
                            formik.touched.interests &&
                            Boolean(formik.errors.interests)
                          }
                          helperText={
                            formik.touched.interests && formik.errors.interests
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField
                      fullWidth
                      select
                      label="Country"
                      {...formik.getFieldProps("country")}
                      error={
                        formik.touched.country &&
                        Boolean(formik.errors.country)
                      }
                      helperText={
                        formik.touched.country && formik.errors.country
                      }
                    >
                      {countries.map((country) => (
                        <MenuItem value={country} key={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </FormTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormButton
                      variant="contained"
                      type="submit"
                      disabled={submitting} // Disable the button while submitting
                    >
                      {submitting ? <CircularProgress size={24} /> : "Register Now"}
                    </FormButton>
                  </Grid>
                </Grid>
              </form>
            </Box>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {signupConfig.termsAndPrivacy.text}{" "}
              <Link href={signupConfig.termsAndPrivacy.termsLink}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={signupConfig.termsAndPrivacy.privacyLink}>
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </FormPaper>
      </FormContainer>
      <Footer />
    </Box>
  );
};

export default SignupPage;
