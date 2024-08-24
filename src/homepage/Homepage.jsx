import React, { useCallback, useEffect, useState } from "react";
import ExpertCarousel from "./ExpertCarousel";
import axios from "axios";
import TrendingBlogs from "./TrendingBlogs";
import Courses from "./Courses";
import { Box } from "@mui/material";
import Communities from "./Communities";
import Hub from "./hub";
import Testimonials from "./Testimonials";

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

const courses = [
  {
      title: 'Digital Marketing',
      category: 'Marketing',
      date: 'Aug 9, 2024 | 6:28 AM',
      description: 'This course provides a comprehensive overview of the strategies and tactics used to effectively promote products or…',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg',
      avatar: ['https://randomuser.me/api/portraits/men/75.jpg', 'https://randomuser.me/api/portraits/women/65.jpg'],
      comments: 0,
      views: 5,
  },
  {
      title: 'Prospective Fractional Experts Guide',
      category: 'Leadership',
      date: 'Jun 7, 2024 | 3:48 AM',
      description: 'A short course on transitioning from a 9 to 5 job to a Fractional Executive, a cornerstone of the gig economy. Find out…',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg',
      avatar: ['https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'],
      comments: 0,
      views: 70,
  },
  {
      title: 'final testing course',
      category: 'HR',
      date: 'Apr 24, 2024 | 9:40 AM',
      description: 'testing testing testing',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/66.jpg'],
      comments: 0,
      views: 48,
  },
  {
      title: 'StartUp Fundamentals',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb__90082e05-8020-4bd8-8246-af0ef0853187.jpeg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'Make You Pitch Investor Ready',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'Business Modeling through Strategy and Analysis',
      category: 'Product',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'This course will give you a complete overview of developing and designing...',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_Strategy-and-Analysis.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'MVP Fundamentals',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_10HowtomeasurePMF.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'HR for Remote Teams (HRD & HRM)',
      category: 'HR',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A bulletproof Human Resource Development and Human Resource Management...',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_hrnew.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
];

const communities = [
  {
      title: 'Startup Founders Club',
      category: 'Marketing',
      date: 'Aug 9, 2024 | 6:28 AM',
      description: 'Welcome to the Content Marketing Essentials Community! We are a vibrant space for marketers, content creators, and enthusiasts…',
      image: 'https://academy.opengrowth.com/assets/images/community/Startup.jpg',
      avatar: ['https://randomuser.me/api/portraits/men/75.jpg', 'https://randomuser.me/api/portraits/women/65.jpg'],
      comments: 0,
      views: 5,
  },
  {
      title: 'OpenGrowth',
      category: 'Leadership',
      date: 'Jun 7, 2024 | 3:48 AM',
      description: 'A short course on transitioning from a 9 to 5 job to a Fractional Executive, a cornerstone of the gig economy. Find out…',
      image: 'https://academy.opengrowth.com/assets/images/community/ban-min.jpg',
      avatar: ['https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'],
      comments: 0,
      views: 70,
  },
  {
      title: 'Mentorship Hub',
      category: 'HR',
      date: 'Apr 24, 2024 | 9:40 AM',
      description: 'testing testing testing',
      image: 'https://academy.opengrowth.com/assets/images/community/startup.jpeg',
      avatar: ['https://randomuser.me/api/portraits/women/66.jpg'],
      comments: 0,
      views: 48,
  },
  {
      title: 'Collab Connect',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/community/coll.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'StartUpSphere',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'Content Marketing Essentials',
      category: 'Product',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'This course will give you a complete overview of developing and designing...',
      image: 'https://academy.opengrowth.com/assets/images/community/en.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'MVP Fundamentals',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/community/content.jpeg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
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
            end: 16,
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
            end: 16,
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
          <Courses course={courses} />
          {/* <Communities course={communities} /> */}
          <Hub course={communities} />
          <Testimonials />
        </Box>
      )}
    </>
  );
}

export default Homepage;
