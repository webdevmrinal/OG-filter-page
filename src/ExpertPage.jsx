// ExpertPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
    Box,
    Typography,
    Button,
    Divider,
    Card,
    Grid,
    Skeleton, // Import Skeleton
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { ScrollableBox, CategoryButton } from "./Experts/Components/ExpertStyle";
import { ExpertPopup } from "./ExpertPopup";
import { ExpertCard } from "./ExpertCard";
import { useNavigate } from 'react-router-dom';

// Define the initial categories
const initialCategories = [
    "Expert",
    "Fractional",
    "Demand Engagement",
    "Artificial Intelligence",
    "Entrepreneur",
    "Human Resource",
    "Data Science",
    "Finance",
    "Leadership",
    "Marketing",
    "Seasoned Entrepreneur",
];

function ExpertPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize as true
    const [categories, setCategories] = useState(initialCategories);
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false); // Initialize as false

    const perPage = 8;

    const navigate = useNavigate();

    const fetchExperts = useCallback(async (category = null, pageIndex = 0, reset = false) => {
        setLoading(true);
        const startIndex = pageIndex * perPage;
        const endIndex = startIndex + perPage;
        try {
            let response;
            if (category) {
                response = await axios.post("https://academy.opengrowth.com/api/search_mentor", {
                    email: "akriti@opengrowth.com",
                    start: startIndex,
                    end: endIndex,
                    key: `0_popular_tags_${category}`,
                    search: category,
                    search_with: "tags",
                    action: "",
                    token: "kKRyYp5DebEw0fP",
                });
            } else {
                response = await axios.post("https://academy.opengrowth.com/api/get_all_mentors", {
                    id: "akriti@opengrowth.com",
                    start: startIndex,
                    end: endIndex,
                    key: `0_all_mentors_${startIndex}_to_${endIndex}`,
                });
            }
            const newExperts = response.data;
            if (reset) {
                setExperts(newExperts);
            } else {
                setExperts((prevExperts) => [...prevExperts, ...newExperts]);
            }
            // Update hasMore based on the number of experts fetched
            if (newExperts.length < perPage) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (error) {
            console.error("Error fetching experts:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const reset = page === 0;
        fetchExperts(selectedCategory, page, reset);
    }, [selectedCategory, page, fetchExperts]);

    useEffect(() => {
        if (selectedCategory) {
            const newCategories = [
                selectedCategory,
                ...categories.filter((category) => category !== selectedCategory),
            ];
            setCategories(newCategories);
        } else {
            setCategories(initialCategories);
        }
    }, [selectedCategory, categories]);

    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
        setPage(0);
    };

    const handleExpertClick = (expert) => {
        setSelectedExpert(expert);
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const navigateToExpertsPage = () => {
        navigate('/expertpage');
    };

    const navigateToAppointmentPage = (appointment) => {
        navigate('/appointmentpage', { state: { appointment } }); // Pass appointment data if needed
    };

    return (
        <Card
            sx={{
                bgcolor: "white",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                width: "auto",
                position: "relative",
                p: 1,
            }}
        >
            {/* Title Section */}
            <Box sx={{ px: 2, pt: 1 }}>
                {loading ? (
                    <Skeleton variant="text" width={150} height={30} sx={{ mb: 1 }} aria-hidden="true" />
                ) : (
                    <Box display={'flex'} gap={1}>
                    <Typography variant="h6" >
                        Growth Experts,
                    </Typography>
                    <Typography variant="subtitle1" color={'textSecondary'} sx={{mt: 0.5}}>
                        Pick your focus area
                    </Typography>
                    </Box>
                )}
            </Box>
            
            {/* Conditionally Render Divider */}
            {!loading && <Divider sx={{ width: "98%", ml: 2 , mb: 2}} />}
            
            {/* Category Selection */}
            <Box sx={{ px: 2, py: 1, overflow: "hidden", pl: 2 }}>
                {loading ? (
                    <>
                        <Skeleton variant="text" width={180} height={20} sx={{ mb: 1 }} aria-hidden="true" />
                        <ScrollableBox>
                            {Array.from(new Array(8)).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width={120}
                                    height={40}
                                    sx={{ flexShrink: 0, mr: 1, borderRadius: '1.5em' }}
                                    aria-hidden="true"
                                />
                            ))}
                        </ScrollableBox>
                    </>
                ) : (
                    <>
                        <Typography variant="div" fontWeight="semibold" fontSize={17} sx={{ pl: 0.5, mb: 1 }}>
                            Choose a category:
                        </Typography>
                        <ScrollableBox>
                            {categories.map((category) => (
                                <CategoryButton
                                    key={category}
                                    active={selectedCategory === category}
                                    variant="contained"
                                    size="small"
                                    sx={{ flexShrink: 0 }}
                                    onClick={() => handleCategoryClick(category)}
                                    endIcon={selectedCategory === category ? <CloseIcon /> : null}
                                >
                                    {category}
                                </CategoryButton>
                            ))}
                        </ScrollableBox>
                    </>
                )}
            </Box>
            
            {/* Experts Grid */}
            <Grid
                container
                columnSpacing={2}
                rowSpacing={1}
                sx={{
                    placeItems: "center",
                    placeContent: "center",
                    py: "1.5em",
                    pl: { xs: 1, sm: 2 },
                }}
            >
                {/* Initial Loading: Render multiple ExpertCards with loading=true */}
                {loading && page === 0
                    ? Array.from(new Array(perPage)).map((_, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={`skeleton-${index}`}
                            sx={{ px: "4px !important" }}
                        >
                            <ExpertCard loading={true} context="expertPage" />
                        </Grid>
                    ))
                    : experts.map((expert) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={expert.id}
                            sx={{ px: "4px !important" }}
                        >
                            <ExpertCard
                                expert={expert}
                                handleExpertClick={handleExpertClick}
                                context="expertPage"
                                loading={false}
                            />
                        </Grid>
                    ))}
                {/* Loading More: Render ExpertCards with loading=true */}
                {loading && page > 0 && Array.from(new Array(perPage)).map((_, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={`loadmore-skeleton-${index}`}
                        sx={{ px: "4px !important" }}
                    >
                        <ExpertCard loading={true} context="expertPage" />
                    </Grid>
                ))}
            </Grid>
            
            {/* Load More Button */}
            {!loading && hasMore && (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Button variant="contained" onClick={handleLoadMore}>
                        Load More
                    </Button>
                </Box>
            )}
            
            {/* Expert Popup */}
            <ExpertPopup
                expert={selectedExpert}
                onClose={() => setSelectedExpert(null)}
            />
        </Card>
    );

}

export default ExpertPage;
