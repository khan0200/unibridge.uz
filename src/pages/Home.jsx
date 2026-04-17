import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Introduction from "../components/introduction/Introduction";
import Profile from "../components/profile/Profile";
import WorkProcess from "../components/workProcess/WorkProcess";
import Portfolio from "../components/portfolio/Portfolio";
import Profession from "../components/profession/Profession";
import Contact from "../components/contact/Contact";
import Videos from "../components/videos/Videos";
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
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
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
      
      {/* Videos Section */}
      <Videos />

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
