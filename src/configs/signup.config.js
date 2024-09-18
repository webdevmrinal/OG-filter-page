export const signupConfig = {
    images: [
      "https://images.unsplash.com/photo-1590649917466-06e6e1c3e92d?fit=crop&w=500&h=700",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&h=700",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=500&h=700",
    ],
  
    sliderSettings: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    },
  
    navItems: [
      { title: "Hire", items: ["Find Talent", "Post a Job", "Hiring Solutions"] },
      {
        title: "Enable",
        items: ["Training Programs", "Certifications", "Resources"],
      },
      {
        title: "Grow",
        items: ["Business Solutions", "Marketing Services", "Consulting"],
      },
    ],
  
    interests: [
      "Artificial Intelligence",
      "Blogging",
      "Dance",
      "Data Science",
      "Demand Engagement",
      "Entrepreneur",
      "Finance",
      "Fractional",
      "Human Resource",
      "Leadership",
      "Learning languages",
    ],
  
    countries: [
      "United States",
      "Canada",
      "Mexico",
      "Brazil",
      "Argentina",
      "United Kingdom",
      "France",
      "Germany",
      "Italy",
      "Spain",
      "Australia",
      "New Zealand",
      "China",
      "Japan",
      "India",
      "South Korea",
      "South Africa",
      "Nigeria",
      "Egypt",
      "Kenya",
      "Russia",
      "Turkey",
      "Saudi Arabia",
      "Iran",
      "United Arab Emirates",
      "Vietnam",
      "Thailand",
      "Indonesia",
      "Malaysia",
      "Philippines",
      "Singapore",
      "Pakistan",
      "Bangladesh",
      "Sri Lanka",
      "Nepal",
      "Israel",
      "Jordan",
      "Lebanon",
      "Iraq",
      "Syria",
      "Ukraine",
      "Poland",
      "Czech Republic",
      "Hungary",
      "Sweden",
      "Norway",
      "Denmark",
      "Finland",
    ],
  
    socialButtons: [
      { icon: "LinkedInIcon", color: "#0077B5", label: "LinkedIn" },
      { icon: "GoogleIcon", color: "#DB4437", label: "Google" },
      { icon: "FacebookIcon", color: "#1877F2", label: "Facebook" },
    ],
  
    formValidation: {
      firstName: {
        required: "First name is required",
      },
      lastName: {
        required: "Last name is required",
      },
      email: {
        required: "Email is required",
        invalid: "Invalid email address",
      },
      password: {
        required: "Password is required",
        min: {
          value: 8,
          message: "Password should be at least 8 characters long",
        },
      },
      interests: {
        min: {
          value: 1,
          message: "At least one interest is required",
        },
      },
      country: {
        required: "Country is required",
      },
    },
  
    termsAndPrivacy: {
      text: "By registering, I agree to the OpenGrowth Academy",
      termsLink: "#",
      privacyLink: "#",
    },
  
    expertSignup: {
      text: "Are you interested in becoming an expert?",
      link: "#",
    },
  
    backButton: {
      text: "Back",
      route: "/get-started",
    },
  };