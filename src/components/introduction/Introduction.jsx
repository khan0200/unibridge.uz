import { useState, useEffect } from "react";
import page1 from "../../assets/Page1.jpg";
import reg1 from "../../assets/reg1.jpg";
import reg2 from "../../assets/reg2.jpg";
import page4 from "../../assets/PAGE 4.jpg";
import page5 from "../../assets/PAGE 5.jpg";
import page6 from "../../assets/PAGE 6.jpg";
import "./introduction.css";
import InformationSummary from "./InformationSummary";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { trackButtonClick } from "../../config/googleSheets";

const carouselImages = [
  {
    id: 1,
    src: page1,
    alt: "Koreyada ta'lim - Page 1"
  },
  {
    id: 2,
    src: reg1,
    alt: "Ro'yxatdan o'tish - Reg 1"
  },
  {
    id: 3,
    src: reg2,
    alt: "Ro'yxatdan o'tish - Reg 2"
  },
  {
    id: 4,
    src: page4,
    alt: "Koreyada ta'lim - Page 4"
  },
  {
    id: 5,
    src: page5,
    alt: "Koreyada ta'lim - Page 5"
  },
  {
    id: 6,
    src: page6,
    alt: "Koreyada ta'lim - Page 6"
  }
];

const Introduction = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Loading bar progress
  useEffect(() => {
    if (!isAutoPlaying) return;

    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / 90); // 90 intervals over 3 seconds
      });
    }, 33); // ~30fps

    return () => clearInterval(progressInterval);
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="scroll-section relative pt-14 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[72vh] flex items-center overflow-hidden"
      id="introduction"
    >
      {/* Subtle decorative accents - reduced from 48 animated grid elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-blue-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-purple-200/15 to-purple-300/10 rounded-full blur-3xl"></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full mt-4 sm:mt-8 lg:mt-10">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Main Heading - Clean Version */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                KOREYADA
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                TA'LIM
              </span>
            </h1>
          </div>

          {/* Clean Description Card */}
          <div className="surface-card p-6 sm:p-8">
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-medium">
              Koreyaning <span className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2.5 py-1 rounded-lg text-sm font-semibold shadow-sm">TOP universitetlari</span>da
              ta'lim olishda <span className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2.5 py-1 rounded-lg text-sm font-semibold shadow-sm">professional yordam</span> va
              vizagacha to'liq qo'llab-quvvatlash
            </p>
          </div>

          {/* Clean CTA Button */}
          <div className="text-center lg:text-left">
            <Link
              to="/registration"
              onClick={() => trackButtonClick('cta_consultation', 'hero_section')}
              className="btn-cta px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              <FontAwesomeIcon icon={faPhone} className="text-base sm:text-lg" />
              Bepul konsultatsiyaga yozilish
            </Link>
          </div>
        </div>

        {/* Right Image Carousel - Enhanced */}
        <div className="lg:col-span-5 order-first lg:order-last">
          <div className="relative max-w-md mx-auto lg:max-w-none">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-2xl blur-2xl transform rotate-3 scale-105 animate-float"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-amber-400/10 to-pink-400/10 rounded-2xl blur-xl transform -rotate-2 scale-110 animate-float-delayed"></div>

            {/* Floating Elements - reduced from 3 */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
            <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-50" style={{ animation: 'float 6s ease-in-out infinite 2s' }}></div>

            {/* Carousel Container - Fixed Dimensions */}
            <div className="carousel-container relative bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl shadow-gray-300/25 border border-gray-100/50 floating-carousel">
              <div
                className="carousel-image-wrapper relative rounded-xl"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Carousel Images - Maintaining Original Dimensions */}
                {carouselImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 flex items-center justify-center ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    <img
                      className="carousel-image"
                      src={image.src}
                      alt={image.alt}
                    />
                  </div>
                ))}

                {/* Navigation Arrows - Small and subtle */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Oldingi rasm"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Keyingi rasm"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                </button>

                {/* Dots - Centered at bottom */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentSlide
                          ? 'bg-white shadow-sm'
                          : 'bg-white/40 hover:bg-white/60'
                        }`}
                      aria-label={`Rasm ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Ultra-thin loading bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
