import { useNavigate, useLocation } from "react-router-dom";
import footerLogo from "../../../../University logos/footer logo.png";
import { trackButtonClick } from "../../../config/googleSheets";

/* Footer nabLinks */
const navItems = [
  { id: 1, name: "Bosh sahifa", url: "introduction" },
  { id: 2, name: "Biz haqimizda", url: "profile" },
  { id: 3, name: "Jarayon", url: "work-process" },
  { id: 4, name: "Universitetlar", url: "universitetlar" },
  { id: 5, name: "Xizmatlar", url: "services" },
];
const copyrightYear = new Date().getFullYear();

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleNavClick = (url) => {
    // Track navigation click
    trackButtonClick(`nav_${url}`, 'footer');
    
    // Special handling for bizning-manzil - redirect to contact section
    const targetSection = url === 'bizning-manzil' ? 'contact' : url;
    
    const scrollToSection = (sectionId) => {
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
      }
    };
    
    if (isHomePage) {
      // If on home page, scroll directly to section
      scrollToSection(targetSection);
    } else {
      // If on other pages, navigate to home page with hash
      navigate(`/#${targetSection}`);
      // After navigation, scroll to the section
      setTimeout(() => {
        scrollToSection(targetSection);
      }, 100);
    }
  };

  const handleLogoClick = () => {
    // Track logo click
    trackButtonClick('footer_logo', 'navigation');
    
    const scrollToIntroduction = () => {
      const element = document.getElementById('introduction');
      if (element) {
        const elementTop = element.offsetTop;
        const navbarHeight = 80; // Navbar height
        const additionalOffset = window.innerHeight * 0.08; // 8% of viewport height for better positioning
        
        window.scrollTo({
          top: elementTop - navbarHeight - additionalOffset,
          behavior: 'smooth'
        });
      }
    };

    if (isHomePage) {
      scrollToIntroduction();
    } else {
      navigate('/#introduction');
      setTimeout(() => {
        scrollToIntroduction();
      }, 100);
    }
  };

  return (
    <div className="py-8 md:py-12 px-4 max-w-7xl mx-auto">
      <div className="flex max-md:flex-col justify-between items-center gap-4 md:gap-6 text-neutral-200">
        <button onClick={handleLogoClick} className="flex items-center gap-3 bg-transparent border-none cursor-pointer">
          <img src={footerLogo} className="h-8 sm:h-12 rounded-2xl" alt="footer logo" />
          <span className="text-lg md:text-xl font-semibold text-white">Uni Bridge</span>
        </button>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.url.toLowerCase())}
              className="group relative text-sm md:text-base hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer text-neutral-200"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white scale-x-0 duration-300 group-hover:scale-x-100"></span>
            </button>
          ))}
        </div>
        <p className="text-sm md:text-base text-center md:text-right">
          &copy; {copyrightYear} UniBridge.uz
        </p>
      </div>
    </div>
  );
};

export default Footer;
