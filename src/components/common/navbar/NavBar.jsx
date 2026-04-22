import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../University logos/Logo.png";

const navItems = [
  { id: 1, name: "Bosh sahifa", url: "introduction", type: "scroll" },
  { id: 2, name: "Biz haqimizda", url: "profile", type: "scroll" },
  { id: 3, name: "Xizmatlar", url: "services", type: "scroll" },
  { id: 4, name: "Jarayon", url: "work-process", type: "scroll" },
  { id: 5, name: "Admissions", url: "https://admissions-university.vercel.app/", type: "external" },
  { id: 6, name: "Videolar", url: "videos", type: "scroll" },
  { id: 7, name: "Aloqa", url: "contact", type: "scroll" },
];

const NavBarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleMenuClick = (item) => {

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Handle page navigation (for /universities, etc.)
    if (item.type === 'page') {
      navigate(item.url);
      return;
    }

    // Handle external navigation
    if (item.type === 'external') {
      window.location.href = item.url;
      return;
    }

    // Handle scroll navigation (for sections on home page)
    const url = item.url;
    const scrollToSection = (sectionId) => {
      // Wait for DOM to be ready and find element with retry logic
      const findAndScroll = (attempts = 0) => {
        const element = document.getElementById(sectionId);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else if (attempts < 15) {
          // Retry up to 15 times with 100ms intervals
          setTimeout(() => findAndScroll(attempts + 1), 100);
        }
      };

      findAndScroll();
    };

    if (isHomePage) {
      // If on home page, scroll directly to section
      scrollToSection(url);
    } else {
      // If on other pages, navigate to home page with hash
      navigate(`/#${url}`);
      // After navigation, scroll to the section with longer delay
      setTimeout(() => {
        scrollToSection(url);
      }, 800);
    }
  };

  return navItems.map((item) => (
    <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
      <button
        onClick={() => handleMenuClick(item)}
        className="hover:text-picto-primary px-4 py-2.5 mx-0.5 block cursor-pointer bg-transparent border-none text-inherit font-inherit"
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
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
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

  const handleRegistrationClick = () => {
    navigate("/registration");
  };

  return (
    <div
      className={`sticky top-0 z-50 ${position > 50
        ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-slate-200/70"
        : "bg-white/95 border-b border-slate-100"
        }`}
      style={{ transition: 'background-color 0.4s ease, box-shadow 0.4s ease' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 lg:py-2.5">

        {/* ── MOBILE layout (< lg) ─────────────────────────── */}
        <div className="flex lg:hidden items-center justify-between">

          {/* Left: hamburger dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content rounded-2xl z-[60] mt-3 w-72 p-3 shadow-xl font-semibold flex-nowrap bg-white/95 backdrop-blur-xl text-black border border-gray-100"
            >
              <NavBarMenu />
              <li className="mt-2 px-2">
                <button
                  onClick={handleRegistrationClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold py-3 px-4 rounded-xl text-center"
                >
                  Ro'yxatdan o'tish
                </button>
              </li>
            </ul>
          </div>

          {/* Center: logo */}
          <button onClick={handleLogoClick} className="bg-transparent border-0 cursor-pointer p-0">
            <img src={logo} className="h-10 rounded-xl" alt="UniBridge logo" />
          </button>

          {/* Right: compact register button */}
          <button
            onClick={handleRegistrationClick}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md"
            style={{ minHeight: 'auto', minWidth: 'auto' }}
          >
            Ariza
          </button>
        </div>

        {/* ── DESKTOP layout (≥ lg) ────────────────────────── */}
        <div className="hidden lg:flex items-center justify-between">

          {/* Left: logo */}
          <button onClick={handleLogoClick} className="flex items-center bg-transparent border-0 cursor-pointer p-0">
            <img src={logo} className="h-12 rounded-2xl" alt="UniBridge logo" />
          </button>

          {/* Center: nav links */}
          <ul className="flex menu menu-horizontal text-[15px] font-medium">
            <NavBarMenu />
          </ul>

          {/* Right: register CTA */}
          <button
            onClick={handleRegistrationClick}
            className="btn-cta px-5 py-2.5 text-sm"
          >
            Ro'yxatdan o'tish
          </button>
        </div>

      </div>
    </div>
  );
};

export default NavBar;

