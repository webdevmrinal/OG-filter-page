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
  Box,
  IconButton,
  Link,
  Divider,
  Paper,
  Menu,
  MenuItem,
  Drawer,
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
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import OGLogo from "./assets/OG-Logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FacebookIcon, GoogleIcon, LinkedInIcon } from "./Icons";
import Header from "./Header";
import { loginPageConfig } from "../configs/login.config";

const iconComponents = {
  FacebookIcon,
  GoogleIcon,
  LinkedInIcon,
};

const LoginPage = () => {
  const { images, sliderSettings, navItems, socialButtons, formValidation } =
    loginPageConfig;
  const [showPassword, setShowPassword] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

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
      console.log(values);
    },
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              padding: "2.5em 1em",
              display: "flex",
              flexDirection: "column",
              gap: "1.5em",
            }}
          >
            {navItems.map((item, index) => (
              <NavMenuItem key={index} title={item.title} items={item.items} />
            ))}
            <Button
              sx={{
                marginRight: 3,
                fontWeight: "600",
                fontSize: "1em",
                textTransform: "capitalize",
                "&:hover": {
                  background: "transparent",
                  textDecoration: "underline",
                },
              }}
              color="inherit"
              TouchRippleProps={{ style: { color: "transparent" } }}
            >
              About Us
            </Button>
            <Button
              sx={{
                marginRight: 3,
                fontWeight: "600",
                fontSize: "1em",
                textTransform: "capitalize",
                "&:hover": {
                  background: "transparent",
                  textDecoration: "underline",
                },
              }}
              color="inherit"
              TouchRippleProps={{ style: { color: "transparent" } }}
            >
              Contact
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "2em" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Container
        maxWidth="xl"
        sx={{ mt: 4, pb: { xs: 4, sm: 10 } }}
        className="md:border md:mb-6 md:pt-6 md:shadow-lg md:rounded-xl"
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems={"flex-start"}
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

          <Grid item xs={12} md={6} height={"730px"}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: "16px",
                border: "1px solid lightgray",
              }}
            >
              <Typography
                variant="h6"
                sx={{ px: 4, py: 1, fontWeight: "600" }}
                gutterBottom
              >
                Login to OpenGrowth
              </Typography>
              <Divider />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: ".75em",
                  mb: 2,
                  px: 4,
                  pt: 3.3,
                  pb: 1,
                }}
              >
                {socialButtons.map((button, index) => {
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
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
                      required
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
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                    <Link href="#" variant="body2">
                      Sign up
                    </Link>
                  </Grid>
                  <Grid
                    item
                    py={3}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default LoginPage;

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
