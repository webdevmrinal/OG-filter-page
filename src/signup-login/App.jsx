import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
  styled,
} from "@mui/material";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Header from "./Header";
import Footer from "./Footer";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    height: "auto", // original desktop styles
    maxWidth: '100rem',
    margin: 'auto auto',
    padding: theme.spacing(2),
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    maxWidth: "200rem",
    height: "auto",
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[4],
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3, 7, 0),
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "auto",
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    paddingBottom: theme.spacing(3),
  },
}));

function App2() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fromSignup) {
      setStep(100);
    }
  }, [location]);

  useEffect(() => {
    if (step > 100) {
      navigate("/signup");
    }
  }, [step, navigate]);

  const renderPage = () => {
    if (step < 50) {
      return <Page1 />;
    } else if (step >= 50 && step <= 100) {
      return <Page2 />;
    }
  };

  const handleBack = () => {
    if (location.state && location.state.fromSignup) {
      setStep(1);
    } else if (step > 1) {
      setStep(Math.max(1, step - 60));
    }
  };

  const handleNext = () => {
    if (step < 100) {
      setStep(100);
    } else {
      navigate("/signup");
    }
  };

  const handleSkipAll = () => {
    navigate("/signup");
  };

  return (
    <>
      <Header />
      <AnimatePresence>
        {step <= 100 && (
          <motion.div
            initial={{ opacity: 0, x: -75 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -75 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            style={{ position: "relative", zIndex: 10 }}
          >
            <StyledContainer>
              <ContentBox>
                <Box sx={{ width: "100%", my: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={step}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#303030",
                        transition: "all 500ms cubic-bezier(0.25,0.1,0.25,1)",
                      },
                    }}
                  />
                </Box>
                {renderPage()}
                <ButtonContainer>
                  <Button
                    onClick={handleBack}
                    sx={{
                      color: "#616161",
                      textTransform: "none",
                      fontWeight: 400,
                    }}
                  >
                    &lt; Back
                  </Button>
                  <Box>
                    <Button
                      onClick={handleSkipAll}
                      sx={{
                        color: "#616161",
                        textTransform: "none",
                        fontWeight: 400,
                        mr: 1.5,
                      }}
                    >
                      Skip All
                    </Button>
                    <Button
                      onClick={handleNext}
                      sx={{
                        color: "#616161",
                        textTransform: "none",
                        fontWeight: 400,
                        mr: 1.5,
                      }}
                    >
                      Skip
                    </Button>
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      sx={{
                        backgroundColor: "#25387c",
                        color: "white",
                        textTransform: "none",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "#303030",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </ButtonContainer>
              </ContentBox>
            </StyledContainer>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App2;
