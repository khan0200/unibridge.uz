import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../University logos/Logo.png";

const navItems = [
  { id: 1, name: "Bosh sahifa", url: "introduction", type: "scroll" },
  { id: 2, name: "Biz haqimizda", url: "profile", type: "scroll" },
  { id: 3, name: "Xizmatlar", url: "services", type: "scroll" },
  { id: 4, name: "Jarayon", url: "work-process", type: "scroll" },
  { id: 5, name: "Universitetlar", url: "/universities", type: "page" },
  { id: 6, name: "Aloqa", url: "contact", type: "scroll" },
];

const NavBarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleMenuClick = (item) => {
    console.log('=== MENU NAVIGATION DEBUG ===');
    console.log('Clicked Item:', item);
    console.log('Is Home Page:', isHomePage);
    console.log('Current Location:', location.pathname, location.hash);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Handle page navigation (for /universities, etc.)
    if (item.type === 'page') {
      console.log('Navigating to page:', item.url);
      navigate(item.url);
      return;
    }

    // Handle scroll navigation (for sections on home page)
    const url = item.url;
    const scrollToSection = (sectionId) => {
      console.log('scrollToSection called with:', sectionId);

      // Wait for DOM to be ready and find element with retry logic
      const findAndScroll = (attempts = 0) => {
        console.log(`Attempt ${attempts + 1} to find element:`, sectionId);
        const element = document.getElementById(sectionId);
        console.log('Element found:', element);

        // Debug: Check all elements with similar IDs
        const allElements = document.querySelectorAll('[id*="bizning"], [id*="manzil"], [id*="contact"]');
        console.log('All related elements:', allElements);

        if (element) {
          const elementTop = element.offsetTop;
          const navbarHeight = 80; // Approximate navbar height
          let offset = navbarHeight;

          // Add centering offset for specific sections
          if (sectionId === 'introduction') {
            offset = navbarHeight + (window.innerHeight * 0.08); // 8% additional offset for introduction
          } else if (sectionId === 'profile') {
            offset = window.innerHeight * 0.25; // 25% of viewport height to center Profile card
          } else if (sectionId === 'services') {
            offset = window.innerHeight * 0.05; // 5% of viewport height (reduced by 10%)
          } else if (sectionId === 'work-process') {
            offset = window.innerHeight * 0.05; // 5% of viewport height (reduced by 10%)
          } else if (sectionId === 'universitetlar') {
            offset = window.innerHeight * 0.15; // 15% of viewport height for better centering
          } else if (sectionId === 'contact') {
            offset = window.innerHeight * 0.05; // 5% of viewport height (reduced by 5%)
          } else if (sectionId === 'bizning-manzil') {
            offset = window.innerHeight * 0.07; // 7% for bizning-manzil section
          }

          console.log('Scrolling to position:', elementTop - offset, 'Element top:', elementTop, 'Offset:', offset);
          window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
          });
        } else if (attempts < 15) {
          console.log('Element not found, retrying...');
          // Retry up to 15 times with 100ms intervals
          setTimeout(() => findAndScroll(attempts + 1), 100);
        } else {
          console.log('Element not found after 15 attempts');
        }
      };

      findAndScroll();
    };

    if (isHomePage) {
      // If on home page, scroll directly to section
      console.log('On home page, scrolling directly');
      scrollToSection(url);
    } else {
      // If on other pages, navigate to home page with hash
      console.log('Not on home page, navigating to:', `/#${url}`);
      navigate(`/#${url}`);
      // After navigation, scroll to the section with longer delay
      setTimeout(() => {
        console.log('Navigation timeout executed, attempting scroll');
        scrollToSection(url);
      }, 800);
    }
  };

  return navItems.map((item) => (
    <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
      <button
        onClick={() => handleMenuClick(item)}
        className={`hover:text-picto-primary px-5 py-3 mx-1 block cursor-pointer bg-transparent border-none text-inherit font-inherit`}
      >
        {item.name}
      </button>
    </li>
  ));
};

const NavBar = () => {
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
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
    <div
      className={`sticky top-0 z-50 ${position > 50
        ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 py-2"
        : "bg-white py-3"
        }`}
      style={{ transition: 'background-color 0.4s ease, padding 0.4s ease, box-shadow 0.4s ease' }}
    >
      <div className="navbar flex justify-between mx-auto content">
        <div className="flex items-center justify-between">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content rounded-2xl z-[60] mt-3 w-72 p-3 shadow-xl font-semibold flex-nowrap bg-white/95 backdrop-blur-xl text-black border border-gray-100"
            >
              <NavBarMenu />
            </ul>
          </div>

          <button
            onClick={handleLogoClick}
            className="flex items-center border-0 lg:max-xxl:ps-5 bg-transparent cursor-pointer"
          >
            <img src={logo} className="h-8 sm:h-14 rounded-2xl" alt="logo" />
          </button>
        </div>

        <div className="lg:flex items-center">
          <ul className="hidden lg:flex menu menu-horizontal text-[16px] font-medium md:shrink-0">
            <NavBarMenu />
          </ul>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
