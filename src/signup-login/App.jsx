import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, LinearProgress } from "@mui/material";
import Page1 from "./Page1";
import Page2 from "./Page2";
import SignupPage from "./SignupNew"; // Import SignupPage
import Header from "./Header";
import Footer from "./Footer";
import { StyledContainer, ContentBox, ButtonContainer } from "./Components/Box";

function App2() {
  const [step, setStep] = useState(1);
  const [page1Data, setPage1Data] = useState({});
  const [page2Data, setPage2Data] = useState({});
  const [resetFlag, setResetFlag] = useState(false); // Flag to reset Page1 and Page2
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fromSignup) {
      setStep(100); // Go to the signup page if navigating from the signup page
    }
  }, [location]);

  useEffect(() => {
    if (step > 100) {
      navigate("/signup");
    }
  }, [step, navigate]);

  // Function to reset UI state
  const resetUIState = () => {
    setPage1Data({});
    setPage2Data({});
    setResetFlag(true); // Trigger UI reset
    setTimeout(() => setResetFlag(false), 0); // Reset the flag after the effect
  };

  const handlePage1Data = (data) => {
    setPage1Data(data); // Update local state with the data from Page1
  };

  const handlePage2Data = (data) => {
    setPage2Data(data); // Update local state with the data from Page2
  };

  const resetAllData = () => {
    resetUIState(); // Reset the UI state only
  };

  const renderPage = () => {
    if (step < 50) {
      return <Page1 data={page1Data} onDataChange={handlePage1Data} reset={resetFlag} />;
    } else if (step >= 50 && step <= 100) {
      return <Page2 data={page2Data} onDataChange={handlePage2Data} reset={resetFlag} />;
    } else if (step === 100) {
      return <SignupPage resetAllData={resetAllData} />;
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
