import { Outlet } from "react-router-dom";
import NavBar from "../components/common/navbar/NavBar";
import Footer from "../components/common/footer/Footer";
import ScrollToTop from "../components/common/scrollToTop/ScrollToTop";
import useFacebookPixel from "../hooks/useFacebookPixel";

const Main = () => {
  // Initialize Facebook Pixel tracking
  useFacebookPixel();

  return (
    <div data-theme={"light"} className="relative">
      <NavBar />
      <Outlet />
      <div className="bg-gradient-to-r from-[#223047] via-[#273850] to-[#2A374A]">
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Main;
