// ConfirmationView.jsx
import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Button,
    Rating,
    ToggleButtonGroup,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { StyledSummaryBox, StyledConfirmationBox, DateButton, DurationButton } from './Experts/Components/TimeStyles';
import { ButtonContainer } from './Experts/Components/ProfileStyles';
import ContactModal from './ContactModal';

const ConfirmationView = ({
    professorName,
    profileData,
    selectedTimes,
    duration,
    isGift,
    formatTimeSlot,
    resetAndBookAnotherSlot,
    openContactModal,
    handleOpenContactModal,
    handleCloseContactModal,
}) => {
    return (
        <StyledSummaryBox>
            <StyledConfirmationBox>
                <CheckCircleOutlineIcon />
                <Typography variant="h6">
                    Your session is confirmed!
                </Typography>
            </StyledConfirmationBox>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
                <Avatar
                    src={`https://academy.opengrowth.com/assets/images/users/${profileData?.img}`}
                    alt={profileData?.name}
                    sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    {professorName}
                </Typography>
            </Box>

            {/* Selected Times */}
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Selected Times:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {selectedTimes.map((timeSlot, index) => (
                        <DateButton key={index} value={timeSlot} disabled selected>
                            {formatTimeSlot(timeSlot)}
                        </DateButton>
                    ))}
                </Box>
            </Box>

            {/* Duration */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Duration:
                </Typography>

                <ToggleButtonGroup exclusive>
                    <DurationButton
                        value={duration}
                        aria-label={`${duration} minutes`}
                        disabled
                        selected
                    >
                        {duration} Min
                    </DurationButton>
                </ToggleButtonGroup>
            </Box>

            {isGift && (
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: 'green' }}
                >
                    This is a gift.
                </Typography>
            )}

            <Box
                sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}
            >
                <Box>
                    <Typography variant="h6" component="span">
                        ₹4,999 • Session
                    </Typography>
                    <Rating value={5} readOnly size="small" sx={{ ml: 1 }} />
                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                        5.0 (40)
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={resetAndBookAnotherSlot}>
                        Book Another Slot
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleOpenContactModal}
                    >
                        Contact Me
                    </Button>

                    <ContactModal
                        open={openContactModal}
                        onClose={handleCloseContactModal}
                        professorName={professorName}
                    />
                </Box>
            </Box>
        </StyledSummaryBox>
    );
};

export default ConfirmationView;
