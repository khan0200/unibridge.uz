import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { submitToGoogleSheets } from '../config/googleSheets';
import { trackFormSubmission, trackButtonClick } from '../config/googleSheets';
import page1  from '../assets/Page1.jpg';
import reg1   from '../assets/reg1.jpg';
import reg2   from '../assets/reg2.jpg';
import page4  from '../assets/PAGE 4.jpg';
import page5  from '../assets/PAGE 5.jpg';
import page6  from '../assets/PAGE 6.jpg';
// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Add custom CSS for animations
const customStyles = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }
  .ripple-effect {
    position: relative;
    overflow: hidden;
  }
  .ripple-effect::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  .ripple-effect:active::before {
    width: 300px;
    height: 300px;
  }

  /* Custom Swiper Styles */
  .university-swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination-bullet-custom {
    width: 12px;
    height: 12px;
    background: #d1d5db;
    border-radius: 50%;
    opacity: 1;
    transition: all 0.3s ease;
    cursor: pointer;
    margin: 0 4px;
  }

  .swiper-pagination-bullet-custom:hover {
    background: #9ca3af;
    transform: scale(1.25);
  }

  .swiper-pagination-bullet-active-custom {
    width: 32px;
    height: 12px;
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    .swiper-pagination-bullet-active-custom {
      width: 40px;
    }
  }
`;

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998-',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Carousel images - using actual university logos from folder
  // Import registration images



  const carouselImages = [
    { src: page1, alt: "Koreyada ta'lim" },
    { src: reg1,  alt: "Ro'yxatdan o'tish" },
    { src: reg2,  alt: "Ro'yxatdan o'tish 2" },
    { src: page4, alt: "Koreyada ta'lim - 4" },
    { src: page5, alt: "Koreyada ta'lim - 5" },
    { src: page6, alt: "Koreyada ta'lim - 6" },
  ];

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const styleId = 'registration-swiper-custom-styles';
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      return undefined;
    }

    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);

    return () => {
      styleSheet.remove();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'name') {
      // Always uppercase for name field
      processedValue = value.toUpperCase();
    } else if (name === 'phone') {
      // Format phone number as +998-XX-XXX-XX-XX
      let digits = value.replace(/\D/g, '');
      
      // Remove +998 prefix if it exists in digits
      if (digits.startsWith('998')) {
        digits = digits.substring(3);
      }
      
      // Don't allow more than 9 digits after +998
      if (digits.length > 9) {
        return;
      }
      
      // Format the number
      if (digits.length === 0) {
        processedValue = '';
      } else if (digits.length <= 2) {
        processedValue = `+998-${digits}`;
      } else if (digits.length <= 5) {
        processedValue = `+998-${digits.substring(0, 2)}-${digits.substring(2)}`;
      } else if (digits.length <= 7) {
        processedValue = `+998-${digits.substring(0, 2)}-${digits.substring(2, 5)}-${digits.substring(5)}`;
      } else {
        processedValue = `+998-${digits.substring(0, 2)}-${digits.substring(2, 5)}-${digits.substring(5, 7)}-${digits.substring(7)}`;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors({});
    setSubmitError('');
    
    // Enhanced validation with animations
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Ism majburiy maydon';
    }
    if (!formData.phone.trim() || formData.phone === '+998-') {
      errors.phone = 'Telefon raqam majburiy maydon';
    } else if (formData.phone.replace(/\D/g, '').length < 12) {
      errors.phone = 'Telefon raqam to\'liq emas';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Shake animation for form
      const form = e.target;
      form.classList.add('animate-shake');
      setTimeout(() => form.classList.remove('animate-shake'), 500);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit form data to Google Sheets
      await submitToGoogleSheets(formData);
      
      // Show success message and reset form
      setShowSuccess(true);
      setFormData({ name: '', phone: '+998-', message: '' });
      
      // Track successful form submission
      trackFormSubmission('Registration Form', {
        name: formData.name.trim(),
        phone: formData.phone,
        has_message: formData.message.trim().length > 0
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show user-friendly error message
      const errorMessage = error.message.includes('timeout') 
        ? 'Vaqt tugadi. Iltimos qaytadan urinib ko\'ring.'
        : 'Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  return (
    <div className={`min-h-[100vh] bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      {/* Main Content */}
      <div className="layout-container py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 md:gap-9 lg:gap-12">
          
          {/* Left Side - University Carousel */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/30 hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
            {/* Card Background Gradient */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/20 to-purple-50/20 rounded-2xl sm:rounded-3xl"></div>
            <div className="relative z-10 overflow-visible">
              <div className="text-center mb-4 sm:mb-6">
                 <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight py-1">
                   SIZ HAM KOREYADA O'QING!
                 </h2>
                 <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
               </div>

              {/* Carousel Section */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50/50 via-white/80 to-gray-50/50 shadow-inner border border-gray-100/50">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  {/* Swiper Carousel */}
                  <div className="relative p-4 group">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                      nextEl: '.swiper-button-next-custom',
                      prevEl: '.swiper-button-prev-custom'
                    }}
                    pagination={{
                      el: '.swiper-pagination-custom',
                      clickable: true,
                      bulletClass: 'swiper-pagination-bullet-custom',
                      bulletActiveClass: 'swiper-pagination-bullet-active-custom'
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false
                    }}
                    loop={true}
                    className="university-swiper"
                  >
                    {carouselImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Custom Navigation Buttons */}
                  <button className="swiper-button-prev-custom absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 md:opacity-60 md:hover:opacity-100">
                    <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="swiper-button-next-custom absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 md:opacity-60 md:hover:opacity-100">
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                  {/* Custom Pagination */}
                  <div className="swiper-pagination-custom flex justify-center mt-6 space-x-2"></div>
                </div>
                
                {/* Social Media Links - Desktop Only */}
                <div className="hidden lg:flex justify-center items-center mt-6 space-x-4">
                  <p className="text-gray-600 text-sm font-medium">Bizni kuzatib boring:</p>
                  <div className="flex space-x-3">
                    <a
                      href="https://t.me/unibridge_consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackButtonClick('social_telegram', 'registration_page')}
                      className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/unibridge_consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackButtonClick('social_instagram', 'registration_page')}
                      className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@UnibridgeKoreya"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackButtonClick('social_youtube', 'registration_page')}
                      className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/30 hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
            {/* Card Background Gradient */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-indigo-50/10 to-purple-50/10 rounded-2xl sm:rounded-3xl"></div>
            <div className="relative z-10 overflow-visible">
              <div className="text-center mb-6 sm:mb-8">
                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight py-2">
                   Ro'yxatdan o'ting
                 </h1>
                 <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 sm:mb-4"></div>
               </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Ism va Familiya *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:bg-white/95 text-base shadow-sm ${
                      formErrors.name ? 'border-red-500 bg-red-50/70 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Ism va Familiya"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-2 ml-1 animate-pulse flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Telefon raqam *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:bg-white/95 text-base shadow-sm ${
                      formErrors.phone ? 'border-red-500 bg-red-50/70 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="+998-XX-XXX-XX-XX"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-2 ml-1 animate-pulse flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Qo'shimcha ma'lumot
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-5 py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:bg-white/95 resize-none text-base border-gray-200 hover:border-gray-300 shadow-sm"
                    placeholder="Qiziqayotgan yo'nalish yoki savollaringizni yozing..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple-effect text-lg shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Yuborilmoqda...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Ro'yxatdan o'tish</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </button>

                {submitError && (
                  <p className="text-sm font-medium text-red-600 text-center">
                    {submitError}
                  </p>
                )}
                
                {/* Social Media Links - Mobile Only */}
                <div className="flex lg:hidden justify-center items-center mt-6 space-x-4">
                  <p className="text-gray-600 text-sm font-medium">Bizni kuzatib boring:</p>
                  <div className="flex space-x-3">
                    <a
                      href="https://t.me/unibridge_consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackButtonClick('social_telegram', 'registration_page_mobile')}
                      className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/unibridge_consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackButtonClick('social_instagram', 'registration_page_mobile')}
                      className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@UnibridgeKoreya"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackButtonClick('social_youtube', 'registration_page_mobile')}
                      className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl transform animate-pulse">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Muvaffaqiyatli!</h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Ma'lumotlaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.
              </p>
              <button
                onClick={closeSuccessMessage}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
