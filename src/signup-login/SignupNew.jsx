import React, { useState } from "react";
import Slider from "react-slick";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Link,
  Divider,
  Autocomplete,
  Chip,
  Paper,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Footer from "./Footer";
import {
  LinkedIn,
  Google,
  Facebook,
  Visibility,
  VisibilityOff,
  ArrowDropDown,
  Menu as MenuIcon,
} from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import ArrowBack from "@mui/icons-material/ArrowBack";
import "slick-carousel/slick/slick-theme.css";
import LoginPage from "./LoginPage";
import OGLogo from "./assets/OG-Logo.svg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LinkedInIcon, GoogleIcon, FacebookIcon } from "./Icons";
import Header from "./Header";
import { signupConfig } from "../configs/signup.config";

const iconComponents = {
  LinkedInIcon,
  GoogleIcon,
  FacebookIcon,
};

const SignupPage = () => {
  const { images, interests, countries, navItems, sliderSettings } =
    signupConfig;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
    interests: Yup.array().min(
      signupConfig.formValidation.interests.min.value,
      signupConfig.formValidation.interests.min.message
    ),
    country: Yup.string().required(
      signupConfig.formValidation.country.required
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      interests: [],
      country: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event, newValue) => {
    setSelectedInterests(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />


      <Container
        maxWidth="xl"
        sx={{ mt: 4, pb: 4 }}
        className="md:border md:mb-6 md:pt-6 md:shadow-lg md:rounded-xl"
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems={"center"}
        >
          <Grid item xs={12} md={6}>
            <Slider {...sliderSettings}>
              {images.map((url, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    height: { xs: "300px", sm: "400px", md: "700px" },
                    overflow: "hidden",
                    borderRadius: "10px",
                    backgroundImage: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}
            </Slider>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{ borderRadius: "16px", border: "1px solid lightgray" }}
            >
              <Typography
                variant="h6"
                sx={{ px: 4, py: 1, fontWeight: "600" }}
                gutterBottom
              >
                Signup on OpenGrowth
              </Typography>
              <Divider />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: ".75em",
                  mb: 2,
                  px: 4,
                  pb: 1,
                  pt: 3.3,
                }}
              >
                {signupConfig.socialButtons.map((button, index) => {
                  const IconComponent = iconComponents[button.icon];
                  console.log(button.icon, iconComponents[button.icon]);
                  return (
                    <Button
                      key={index}
                      variant="outlined"
                      fullWidth
                      TouchRippleProps={{ style: { color: button.color } }}
                      sx={{
                        py: 1,
                        gridColumnStart: index === 0 ? "span 2" : "auto",
                        border: "1px solid lightgray",
                        "&:hover": {
                          border: "1px solid lightgray",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "40px",
                        color: button.color,
                        backgroundColor: "white",
                      }}
                    >
                      <IconComponent
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </Button>
                  );
                })}
              </Box>
              <Divider sx={{ px: 4, my: 2, fontSize: ".75em" }}>OR</Divider>
              <form
                onSubmit={formik.handleSubmit}
                style={{ padding: "0 2rem" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={
                        <>
                          First Name <span style={{ color: "red" }}>*</span>
                        </>
                      }
                      InputLabelProps={{
                        sx: {
                          "& .MuiInputLabel-asterisk": {
                            display: "none",
                          },
                        },
                      }}
                      variant="outlined"
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
                    <TextField
                      fullWidth
                      label={
                        <>
                          Last Name <span style={{ color: "red" }}>*</span>
                        </>
                      }
                      InputLabelProps={{
                        sx: {
                          "& .MuiInputLabel-asterisk": {
                            display: "none",
                          },
                        },
                      }}
                      variant="outlined"
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
                    <TextField
                      fullWidth
                      label={
                        <>
                          Email Address <span style={{ color: "red" }}>*</span>
                        </>
                      }
                      InputLabelProps={{
                        sx: {
                          "& .MuiInputLabel-asterisk": {
                            display: "none",
                          },
                        },
                      }}
                      variant="outlined"
                      {...formik.getFieldProps("email")}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={
                        <>
                          Password <span style={{ color: "red" }}>*</span>
                        </>
                      }
                      InputLabelProps={{
                        sx: {
                          "& .MuiInputLabel-asterisk": {
                            display: "none",
                          },
                        },
                      }}
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
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
                            edge="end"
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
                        formik.setFieldTouched("interests", true);
                      }}
                      onBlur={() => formik.setFieldTouched("interests", true)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Interests"
                          variant="outlined"
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
                    <TextField
                      fullWidth
                      select
                      label={
                        <>
                          Country <span style={{ color: "red" }}>*</span>
                        </>
                      }
                      InputLabelProps={{
                        sx: {
                          "& .MuiInputLabel-asterisk": {
                            display: "none",
                          },
                        },
                      }}
                      variant="outlined"
                      {...formik.getFieldProps("country")}
                      error={
                        formik.touched.country && Boolean(formik.errors.country)
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
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      onClick={() => navigate("/dashboardpage")}
                    >
                      Register Now
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Typography
                color="secondary.main"
                variant="body2"
                sx={{ px: 4, m: 2, textAlign: "center" }}
              >
                {signupConfig.termsAndPrivacy.text}{" "}
                <Link
                  color="primary"
                  href={signupConfig.termsAndPrivacy.termsLink}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  color="primary"
                  href={signupConfig.termsAndPrivacy.privacyLink}
                >
                  Privacy Policy
                </Link>
              </Typography>
            </Paper>
            <Typography
              color="secondary.main"
              variant="body2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {signupConfig.expertSignup.text}{" "}
              <Link href={signupConfig.expertSignup.link}>Sign up here!</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Button
        sx={{
          color: "#25", // Adjust the color as needed
          textTransform: "none",
          background: "transparent",
          border: "none",
          fontSize: "0.8rem", // Adjust the font size as needed
          "&:hover": {
            backgroundColor: "transparent",
          },
          m: 2,
        }}
        onClick={() => {
          navigate(signupConfig.backButton.route, {
            state: { fromSignup: true },
          });
        }}
      >
        {signupConfig.backButton.text}
      </Button>

      <Footer />
    </Box>
  );
};

export default SignupPage;

const NavMenuItem = ({ title, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="primary"
        onClick={handleClick}
        endIcon={<ArrowDropDown />}
        sx={{
          marginRight: 3,
          fontWeight: "600",
          fontSize: "1em",
          textTransform: "capitalize",
          "&:hover": { background: "transparent", textDecoration: "underline" },
        }}
        TouchRippleProps={{ style: { color: "transparent" } }}
      >
        {title}
      </Button>
      <Menu
        sx={{ borderRadius: "2em" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
