import React, { useCallback, useEffect, useState } from "react";
import ExpertCarousel from "./ExpertCarousel";
import axios from "axios";
import TrendingBlogs from "./TrendingBlogs";
import { Box } from "@mui/material";

const blogData = [
  {
    image: "https://picsum.photos/id/1/800/600",
    title: "The ultimate guide on business process optimization",
    author: "Surbhi Bapna",
    authorImage: "https://picsum.photos/id/1000/100/100",
    category: "Startup Basics",
  },
  {
    image: "https://picsum.photos/id/20/800/600",
    title: "Balancing commitment and flexibility with on-demand expertise",
    author: "OpenGrowth Content Team",
    authorImage: "https://picsum.photos/id/1001/100/100",
    category: "Industry Insights with Experts",
  },
  {
    image: "https://picsum.photos/id/48/800/600",
    title: "Optimize your remote workspace with essential tech tips",
    author: "OpenGrowth Content Team",
    authorImage: "https://picsum.photos/id/1002/100/100",
    category: "Remote Work",
  },
  {
    image: "https://picsum.photos/id/60/800/600",
    title: "Clear your IT backlog to boost business growth",
    author: "OpenGrowth Content Team",
    authorImage: "https://picsum.photos/id/1003/100/100",
    category: "Future Tech",
  },
  {
    image: "https://picsum.photos/id/180/800/600",
    title: "Leveraging AI for enhanced customer experience",
    author: "Tech Innovator",
    authorImage: "https://picsum.photos/id/1004/100/100",
    category: "Artificial Intelligence",
  },
  {
    image: "https://picsum.photos/id/239/800/600",
    title: "The rise of sustainable startups: A green revolution",
    author: "Eco Entrepreneur",
    authorImage: "https://picsum.photos/id/1005/100/100",
    category: "Sustainability",
  },
  {
    image: "https://picsum.photos/id/287/800/600",
    title: "Mastering the art of digital marketing for small businesses",
    author: "Marketing Guru",
    authorImage: "https://picsum.photos/id/1006/100/100",
    category: "Digital Marketing",
  },
  {
    image: "https://picsum.photos/id/366/800/600",
    title: "Blockchain technology: Revolutionizing supply chain management",
    author: "Blockchain Expert",
    authorImage: "https://picsum.photos/id/1007/100/100",
    category: "Blockchain",
  },
  {
    image: "https://picsum.photos/id/403/800/600",
    title: "The psychology of pricing: Strategies for startups",
    author: "Pricing Strategist",
    authorImage: "https://picsum.photos/id/1008/100/100",
    category: "Business Strategy",
  },
  {
    image: "https://picsum.photos/id/450/800/600",
    title: "Building a resilient team culture in the age of remote work",
    author: "HR Specialist",
    authorImage: "https://picsum.photos/id/1009/100/100",
    category: "Team Management",
  },
];

function Homepage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExperts = useCallback(async (category = null) => {
    setLoading(true);
    try {
      let response;
      if (category) {
        response = await axios.post(
          "https://academy.opengrowth.com/api/search_mentor",
          {
            email: "akriti@opengrowth.com",
            start: 0,
            end: 10,
            key: `0_popular_tags_${category}`,
            search: category,
            search_with: "tags",
            action: "",
            token: "kKRyYp5DebEw0fP",
          }
        );
      } else {
        response = await axios.post(
          "https://academy.opengrowth.com/api/get_all_mentors",
          {
            id: "akriti@opengrowth.com",
            start: 0,
            end: 10,
            key: "0_all_mentors_0_to_10",
          }
        );
      }
      setExperts(response.data);
    } catch (error) {
      console.error("Error fetching experts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  return (
    <>
      {!loading && (
        <Box sx={{ px: 2 }}>
          <ExpertCarousel experts={experts} />
          <TrendingBlogs blogs={blogData} />
        </Box>
      )}
    </>
  );
}

export default Homepage;
