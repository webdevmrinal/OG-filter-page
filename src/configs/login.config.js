export const loginPageConfig = {
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
    socialButtons: [
      { icon: "LinkedInIcon", color: "#0077B5", label: "LinkedIn" },
      { icon: "GoogleIcon", color: "#DB4437", label: "Google" },
      { icon: "FacebookIcon", color: "#1877F2", label: "Facebook" },
    ],
    formValidation: {
      email: {
        required: "Email is required",
        invalid: "Invalid email address",
      },
      password: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
    },
  };