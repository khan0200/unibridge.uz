import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Introduction from "../components/introduction/Introduction";
import Profile from "../components/profile/Profile";
import WorkProcess from "../components/workProcess/WorkProcess";
import Portfolio from "../components/portfolio/Portfolio";
import Profession from "../components/profession/Profession";
import Contact from "../components/contact/Contact";
import "../../index.css";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation when component mounts or location changes
    if (location.hash) {
      const hashSection = location.hash.substring(1); // Remove the # symbol
      // Special handling for bizning-manzil - redirect to contact section
      const sectionId = hashSection === 'bizning-manzil' ? 'contact' : hashSection;
      
      // Function to wait for element and then scroll
      const waitForElementAndScroll = (attempts = 0) => {
        const element = document.getElementById(sectionId);
        
        if (element) {
          const elementTop = element.offsetTop;
          const navbarHeight = 80; // Approximate navbar height
          let offset = navbarHeight;
          
          // Add centering offset for specific sections
          if (['profile', 'services', 'work-process', 'universitetlar'].includes(sectionId)) {
            offset = window.innerHeight * 0.15; // 15% of viewport height for better centering
          } else if (sectionId === 'contact') {
            // For contact section, scroll to show the bizning-manzil part
            offset = window.innerHeight * 0.1; // 10% for contact section to show bizning-manzil
          }
          
          window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
          });
        } else if (attempts < 20) {
          // Retry up to 20 times with 150ms intervals for better reliability
          setTimeout(() => waitForElementAndScroll(attempts + 1), 150);
        }
      };
      
      // Start waiting for element with initial delay to ensure DOM is ready
      setTimeout(() => waitForElementAndScroll(), 200);
    }
  }, [location.hash]);

  return (
    <div className="relative">
      {/* Introduction Section */}
      <div className="introduction-background">
        <Introduction />
      </div>
      
      {/* Profile Section */}
      <div className="profile-background">
        <Profile />
      </div>
      
      {/* Services Section */}
      <div className="bg-soft-white">
        <Profession />
      </div>
      
      {/* Work Process Section */}
      <div className="bg-soft-white">
        <WorkProcess />
      </div>
      
      {/* Portfolio Section */}
      <Portfolio />
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
