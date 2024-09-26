// Admin.js
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    Paper,
    Divider,
    Skeleton,
    useMediaQuery,
    useTheme,
    Snackbar,
    Alert,
    Grid,
} from "@mui/material";
import { green, red } from '@mui/material/colors';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AppointmentItem } from "./Experts/Components/AppointmentStyle"; // Ensure this path is correct
import { v4 as uuidv4 } from 'uuid';

// Constants for localStorage keys
const APPROVAL_KEY = 'approvalFlags';

// Initialize approval flags in localStorage if not already set
const initializeApprovalFlags = () => {
    const storedFlags = localStorage.getItem(APPROVAL_KEY);
    if (!storedFlags) {
        localStorage.setItem(APPROVAL_KEY, JSON.stringify({}));
    }
};

// Get approval flags from localStorage
const getApprovalFlags = () => {
    const storedFlags = localStorage.getItem(APPROVAL_KEY);
    return storedFlags ? JSON.parse(storedFlags) : {};
};

// Update approval flags in localStorage
const updateApprovalFlags = (appointmentId, role) => {
    const flags = getApprovalFlags();
    if (!flags[appointmentId]) {
        flags[appointmentId] = { admin: 0, expert: 0 };
    }
    flags[appointmentId][role] = 1;
    localStorage.setItem(APPROVAL_KEY, JSON.stringify(flags));
};

// AttendedItemSkeleton Component for loading state
const AttendedItemSkeleton = ({ isMobile }) => (
    <AppointmentItem isMobile={isMobile}>
        <Skeleton
            variant="circular"
            width={56}
            height={56}
            sx={{ mr: isMobile ? 0 : 2, mb: isMobile ? 2 : 0 }}
            animation="wave"
        />
        <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="40%" animation="wave" />
            <Skeleton variant="text" width="60%" animation="wave" />
            <Skeleton variant="text" width="30%" animation="wave" />
            <Skeleton variant="text" width="50%" animation="wave" />
        </Box>
    </AppointmentItem>
);

// AttendedItem Component to display each appointment
const AttendedItem = ({ item, isMobile, onApprove, onReject }) => {
    console.log("this is item for page admin: ", item);

    const navigate = useNavigate(); // Initialize useNavigate
    const flags = getApprovalFlags();
    const itemFlags = flags[item.id] || { admin: 0, expert: 0 };

    const handleCardClick = () => {
        // Optionally handle card click
    };

    // Format selected times
    const formatSelectedTimes = (selectedTimes) => {
        return selectedTimes.map((timeSlot) => {
            const [date, time] = timeSlot.split("_");
            return `${date} at ${time}`;
        }).join(" | ");
    };

    return (
        <AppointmentItem
            onClick={handleCardClick}
            isMobile={isMobile}
        >
            {/* Responsive Grid Container */}
            <Grid container spacing={isMobile ? 2 : 3} alignItems="center">
                {/* Avatars Section */}
                <Grid item xs={12} sm={4} md={1.2} lg={1.2}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: isMobile ? "center" : "center",
                            alignItems: 'center',
                            position: "relative",
                            width: "auto", // Allow width to adjust based on content
                            height: isMobile ? 80 : 80, // Consistent height
                            margin: "0 auto",
                        }}
                    >
                        {/* Expert Avatar */}
                        <Avatar
                            src={
                                item.expertImage
                                    ? `https://academy.opengrowth.com/assets/images/users/${item.expertImage}`
                                    : "/assets/images/users/default_expert.png" // Fallback image
                            }
                            alt={item.professorName}
                            sx={{
                                width: isMobile ? 60 : 80,
                                height: isMobile ? 60 : 80,
                                position: "absolute",
                                left: isMobile ? "10%" : 0,
                                zIndex: 2,
                                border: "2px solid white",
                            }}
                        />

                        {/* User Avatar */}
                        <Avatar
                            src="https://academy.opengrowth.com/assets/images/users/default.png"
                            alt={item.user?.firstName || item.user?.name}
                            sx={{
                                width: isMobile ? 60 : 80,
                                height: isMobile ? 60 : 80,
                                position: "absolute",
                                left: isMobile ? "50%" : 60, // Adjust overlap for mobile
                                zIndex: 1,
                                border: "2px solid white",
                                transform: isMobile ? "translateX(-50%)" : "none",
                            }}
                        />
                    </Box>
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} sm={6} md={7.5} lg={7.5}>
                    <Box
                        sx={{
                            paddingLeft: isMobile ? 0 : "20px", // Remove padding on mobile
                            textAlign: isMobile ? "center" : "left",
                        }}
                    >
                        {/* Text Content */}
                        <Typography variant="subtitle1" sx={{ fontSize: '1em', fontWeight: 500 }}>
                            {item.user?.firstName || item.user?.name} requested a session with {item.professorName}
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                            Selected Times: {formatSelectedTimes(item.selectedTimes)}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                            Duration: {item.duration} Min
                        </Typography>

                        <Box display="flex" mt={0.5} alignItems="center" justifyContent={isMobile ? "center" : "flex-start"}>
                            <CalendarTodayIcon
                                sx={{
                                    width: "0.5em",
                                    height: "0.7em",
                                    mr: 0.5,
                                    color: "text.secondary",
                                    paddingTop: "1px",
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                Booked On: {item.date}
                            </Typography>
                        </Box>

                        {item.isGift && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                This is a gift.
                            </Typography>
                        )}
                    </Box>
                </Grid>

                {/* Buttons Section */}
                <Grid item xs={12} sm={2} md={3} lg={3}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            gap: 1,
                            justifyContent: isMobile ? "center" : "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            size={isMobile ? "small" : "medium"}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering card click
                                onApprove(item.id);
                            }}
                            sx={{
                                backgroundColor: green[100],
                                color: green[600],
                                '&:hover': {
                                    backgroundColor: green[200],
                                },
                                px: isMobile ? 1 : 2,
                                width: isMobile ? "100%" : "auto",
                            }}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="contained"
                            size={isMobile ? "small" : "medium"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onReject(item.id);
                            }}
                            sx={{
                                backgroundColor: red[100],
                                color: red[600],
                                '&:hover': {
                                    backgroundColor: red[200],
                                },
                                px: isMobile ? 1 : 2,
                                width: isMobile ? "100%" : "auto",
                            }}
                        >
                            Reject
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </AppointmentItem>
    );
    }

// Admin Component
const Admin = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const navigate = useNavigate(); 

    // Initialize approval flags in localStorage
    useEffect(() => {
        initializeApprovalFlags();
        fetchAppointments();
    }, []);

    // Fetch Appointments from localStorage
    const fetchAppointments = () => {
        setLoading(true);
        try {
            const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
            // Assign unique IDs to appointments if not already set
            const appointmentsWithIds = storedAppointments.map((appt) => ({
                ...appt,
                id: appt.id || uuidv4(), // Assign an ID if not present
            }));
            setAppointments(appointmentsWithIds);
            // Update localStorage in case some appointments were missing IDs
            localStorage.setItem('appointments', JSON.stringify(appointmentsWithIds));
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setNotification({ open: true, message: "Failed to fetch appointments.", severity: "error" });
        }
        setLoading(false);
    };

    // Handle Approve Action
    const handleApprove = (appointmentId) => {
        // Assuming 'admin' is the role approving here
        updateApprovalFlags(appointmentId, 'admin');
        setNotification({ open: true, message: "Session approved successfully!", severity: "success" });
        fetchAppointments(); // Refresh the appointments to reflect changes
    };

    // Handle Reject Action
    const handleReject = (appointmentId) => {
        // For rejection, you might want to remove the appointment or mark it as rejected
        // Here, we'll remove it from the list and localStorage
        const updatedAppointments = appointments.filter((item) => item.id !== appointmentId);
        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        setNotification({ open: true, message: "Session rejected successfully!", severity: "error" });
    };

    // Filter appointments based on approval flags
    const getFilteredAppointments = () => {
        const flags = getApprovalFlags();
        return appointments.filter(item => {
            const itemFlags = flags[item.id];
            // Show if not approved by admin
            return !itemFlags || itemFlags.admin === 0;
        });
    };

    return (
        <Paper elevation={0} sx={{ borderRadius: 2, width: isMobile ? "100%" : "auto", padding: 2 }}>
            <Typography variant="h6" sx={{ px: 3, py: 1, mt: 1, textAlign: isMobile ? "center" : "left" }}>
                Requested Sessions
            </Typography>
            <Divider sx={{ width: "96%", alignSelf: "center", mb: 1, ml: isMobile ? 0 : 3 }} />

            <Box sx={{ px: isMobile ? 2 : 3, py: 1 }}>
                {loading ? (
                    <>
                        <AttendedItemSkeleton isMobile={isMobile} />
                        <AttendedItemSkeleton isMobile={isMobile} />
                        <AttendedItemSkeleton isMobile={isMobile} />
                    </>
                ) : (
                    getFilteredAppointments().length > 0 ? (
                        getFilteredAppointments().map((item) => (
                            <AttendedItem
                                key={item.id}
                                item={item}
                                isMobile={isMobile}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
                            No pending sessions.
                        </Typography>
                    )
                )}
            </Box>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={() => setNotification({ ...notification, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setNotification({ ...notification, open: false })}
                    severity={notification.severity}
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Paper>
    );

};

export default Admin;
