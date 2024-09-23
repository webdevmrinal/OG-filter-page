import React from "react";
import { useTheme } from "@mui/system";
import {
    Box,
    Button,
    CardContent,
    CardMedia,
    Rating,
    Typography,
    Chip,
} from "@mui/material";
import { MainCard, NameBox } from "./Experts/Components/ExpertStyle";
import { Link } from "react-router-dom";

export const ExpertCard = ({ expert, handleExpertClick, context }) => {
    console.log(expert);

    const theme = useTheme();

    // Separate the industry from other categories for different styling
    const categoriesWithIndustry = expert?.category
        .split(",")
        .concat(expert.industry);
    const uniqueCategories = Array.from(
        new Set(categoriesWithIndustry?.map((cat) => cat.trim().toLowerCase()))
    ).map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1));

    const industryChip = uniqueCategories.find(
        (cat) => cat.toLowerCase() === expert.industry.toLowerCase()
    );
    const categoryChips = uniqueCategories
        .filter((cat) => cat.toLowerCase() !== expert.industry.toLowerCase())
        .slice(0, 1); // Show only 1 category

    return (
        <MainCard
            sx={{
                height: context === "carousel" ? "20em" : "27em", // Adjust height based on context
                
            }}
        >
            <CardMedia
                component="div"
                sx={{
                    height: context === "carousel" ? "100%" : "65%", // Adjust height for image area based on context
                    position: "relative",
                    backgroundImage: `url(https://academy.opengrowth.com/assets/images/users/${expert?.img})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <Link
                    to={
                        context === "myConnection"
                            ? `/detail/${expert?.profile_url}`
                            : context === "allExperts" || context === "carousel"
                            ? `/expert-profile/${expert?.profile_url}`
                            : `/profile/${expert?.profile_url}`
                    }
                    style={{ textDecoration: "none" }}
                    state={{ expertEmail: expert?.email }}
                >
                    <NameBox>
                        <Typography variant="subtitle1" align="center">
                            {expert?.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ fontSize: "0.75rem" }}
                        >
                            {expert?.industry}
                        </Typography>
                    </NameBox>
                </Link>
            </CardMedia>

            {context !== "carousel" && (
                <CardContent sx={{ padding: '0px', mt: 1.5, ml: 1 }}>
                    {/* Show about section and chips for other contexts */}
                    <Typography
                        variant="body2"
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {expert?.about}
                    </Typography>
                    <Button
                        size="small"
                        sx={{ mb: 0.5, fontSize: ".75em", px: 0 }}
                        onClick={() => handleExpertClick(expert)}
                    >
                        Know More
                    </Button>
                    {context === "allExperts" ? (
                        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: 5 }}
                                onClick={() => handleExpertClick(expert)}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ color: 'white' }}
                                >
                                    Request a Call
                                </Typography>
                            </Button>
                        </Box>
                    ) : (
                        <>
                            {context === "myConnection" ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mt: 2,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Interactions: 9
                                    </Typography>
                                    <Rating
                                        name="read-only"
                                        value={3.5}
                                        readOnly
                                    />
                                </Box>
                            ) : (
                                <Box sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {categoryChips.map(
                                            (category, index) => (
                                                <Chip
                                                    key={index}
                                                    label={category}
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                />
                                            )
                                        )}
                                        <Chip
                                            label={industryChip}
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                            )}
                        </>
                    )}
                </CardContent>
            )}
        </MainCard>
    );
};


