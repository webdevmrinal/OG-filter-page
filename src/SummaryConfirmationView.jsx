// SummaryConfirmationView.jsx
import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Rating,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  StyledSummaryBox,
  StyledConfirmationBox,
  DateButton,
  DurationButton,
  TimeButton,
} from './Experts/Components/TimeStyles';
import { ButtonContainer } from './Experts/Components/ProfileStyles';
import ContactModal from './ContactModal';

const SummaryConfirmationView = ({
  view, // 'summary' or 'confirmation'
  professorName,
  profileData,
  selectedTimes,
  duration,
  isGift,
  formatTimeSlot,
  onCancel,
  onConfirm,
  resetAndBookAnotherSlot,
  openContactModal,
  handleOpenContactModal,
  handleCloseContactModal,
  expertImage,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getDurationLabel = (duration) => {
    switch (duration) {
      case '15':
        return 'Quick - 15 Min';
      case '30':
        return 'Regular - 30 Min';
      case '45':
        return 'Extra - 45 Min';
      case '60':
        return 'All Access - 60 Min';
      default:
        return `${duration} Min`;
    }
  };

  return (
    <StyledSummaryBox
      sx={{
        padding: isMobile ? 2 : 4, // Adjust padding for mobile
      }}
    >
      {view === 'confirmation' && (
        <StyledConfirmationBox
          sx={{
            flexDirection: isMobile ? 'column' : 'row', // Stack icon and text vertically on mobile
            alignItems: isMobile ? 'center' : 'flex-start', // Center items on mobile
            textAlign: isMobile ? 'center' : 'left', // Center text on mobile
            gap: isMobile ? 1 : 2, // Add spacing between icon and text on mobile
          }}
        >
          <CheckCircleOutlineIcon
            fontSize={isMobile ? 'large' : 'inherit'}
            color="success"
          />
          <Typography variant={isMobile ? 'h6' : 'h5'}>
            Your session is confirmed!
          </Typography>
        </StyledConfirmationBox>
      )}
      
      {/* Avatar and Professor Name */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          mt: 2,
          flexDirection: isMobile ? 'column' : 'row', // Stack vertically on mobile
          textAlign: isMobile ? 'center' : 'left', // Center text on mobile
        }}
      >
        <Avatar
          src={`https://academy.opengrowth.com/assets/images/users/${expertImage}`}
          alt={profileData?.name}
          sx={{
            width: isMobile ? 80 : 60,
            height: isMobile ? 80 : 60,
            mr: isMobile ? 0 : 2,
            mb: isMobile ? 1 : 0, // Add margin bottom on mobile
          }}
        />
        <Typography
          variant={isMobile ? "h6" : "h6"}
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          {professorName}
        </Typography>
      </Box>

      {/* Selected Times */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Selected Times:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
          {selectedTimes.map((timeSlot, index) => (
            <DateButton
              key={index}
              value={timeSlot}
              disabled
              selected
              sx={{
                padding: isMobile ? '6px 8px' : '8px 12px',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
              }}
            >
              {formatTimeSlot(timeSlot)}
            </DateButton>
          ))}
        </Box>
      </Box>

      {/* Duration */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Duration:
        </Typography>
        <ToggleButtonGroup exclusive>
          <DurationButton
            value={duration}
            aria-label={`${duration} minutes`}
            disabled
            selected
            sx={{
              width: 'auto',
              flexGrow: 0,
              padding: isMobile ? '6px 8px' : '8px 12px',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }}
          >
            {getDurationLabel(duration)}
          </DurationButton>
        </ToggleButtonGroup>
      </Box>

      {/* Gift Message */}
      {isGift && (
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'green', textAlign: isMobile ? 'center' : 'left' }}
        >
          This is a gift.
        </Typography>
      )}

      {/* Price and Rating with Action Buttons */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'flex-start',
          gap: isMobile ? 2 : 0,
        }}
      >
        {/* Price and Rating */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            gap: 1,
          }}
        >
          <Typography variant="h6" component="span">
            ₹4,999 • Session
          </Typography>
          <Rating value={5} readOnly size={isMobile ? 'small' : 'small'} />
          <Typography variant="body2" component="span">
            5.0 (40)
          </Typography>
        </Box>

        {/* Action Buttons */}
        {view === 'summary' ? (
          // Render Cancel and Confirm buttons
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: isMobile ? 'column' : 'row',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={onCancel}
              sx={{
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirm}
              sx={{
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Confirm
            </Button>
          </Box>
        ) : (
          // Render Book Another Slot and Contact Me buttons
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: isMobile ? 'column' : 'row',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={resetAndBookAnotherSlot}
              sx={{
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Book Another Slot
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenContactModal}
              sx={{
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Contact Me
            </Button>

            <ContactModal
              open={openContactModal}
              onClose={handleCloseContactModal}
              professorName={professorName}
            />
          </Box>
        )}
      </Box>
    </StyledSummaryBox>
  );
};

export default SummaryConfirmationView;
