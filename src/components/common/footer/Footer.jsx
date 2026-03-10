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
        element.scrollIntoView({
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
        element.scrollIntoView({
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
    <div className="section-shell--compact">
      <div className="layout-container flex max-md:flex-col justify-between items-center gap-5 md:gap-8 text-neutral-200 border-t border-white/10 pt-4">
        <button onClick={handleLogoClick} className="flex items-center gap-3 bg-transparent border-none cursor-pointer">
          <img src={footerLogo} className="h-8 sm:h-12 rounded-2xl" alt="footer logo" />
          <span className="text-lg md:text-xl font-semibold text-white">Uni Bridge</span>
        </button>
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
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
