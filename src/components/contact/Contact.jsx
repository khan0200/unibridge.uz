import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faMap
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTelegram,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Form from "./Form";
import SocialMedia from "../common/socialMedia/SocialMedia";
import { trackButtonClick } from "../../config/googleSheets";

const addressData = [
  {
    id: 'andijon',
    icon: faLocationDot,
    title: "Andijon (Asosiy ofis)",
    description: "Andijon shahar, Yangi Bozor hududi, Boburshoh ko'chasi, Sakura binosi yaqinida, Malika biznes markazi",
    mapLink: "https://www.google.com/maps/place/Unibridge/@40.7541634,72.3568036,19.28z/data=!4m6!3m5!1s0x38bced0017db5103:0x2ae57d69fa8f7358!8m2!3d40.7542855!4d72.3572351!16s%2Fg%2F11w_h2r0f0?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1295.4527280343857!2d72.35663707585562!3d40.75396479698116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bced0017db5103%3A0x2ae57d69fa8f7358!2sUnibridge!5e0!3m2!1sen!2s!4v1771230924352!5m2!1sen!2s&gestureHandling=greedy",
    hasMap: true
  },
  {
    id: 'tashkent',
    icon: faLocationDot,
    title: "Toshkent filiali",
    description: "Toshkent shahri, Novza metrosi yonida",
    mapLink: "https://maps.app.goo.gl/H2QSPWJKv3ZdZ9R16",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2997.763658064671!2d69.22249781181716!3d41.29224791290484!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0018045457%3A0x11a9cc71baa3226a!2sUnibridge!5e0!3m2!1sen!2sus!4v1773120372179!5m2!1sen!2sus",
    hasMap: true,
    phone: "+998-78-555-24-17"
  }
];

const Contact = () => {
  const [activeView, setActiveView] = useState('form'); // 'form', 'andijon', 'tashkent'

  const handleLocationClick = (locationId) => {
    trackButtonClick(`location_${locationId}`, 'contact_section');
    setActiveView(locationId);
  };

  const handleRegistrationClick = () => {
    trackButtonClick('contact_registration', 'contact_section');
    setActiveView('form');
  };

  const renderRightPanel = () => {
    switch (activeView) {
      case 'andijon': {
        const andijanLocation = addressData.find(item => item.id === 'andijon');
        return (
          <div className="h-full min-h-[400px] rounded-lg overflow-hidden transition-all duration-700 ease-in-out transform animate-fadeIn">
            <iframe
              key="andijon-map"
              src={andijanLocation.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Andijon Office Location"
              className="transition-opacity duration-500 ease-in-out"
            ></iframe>
          </div>
        );
      }
      case 'tashkent': {
        const tashkentLocation = addressData.find(item => item.id === 'tashkent');
        return (
          <div className="h-full min-h-[400px] rounded-lg overflow-hidden transition-all duration-700 ease-in-out transform animate-fadeIn">
            <iframe
              key="tashkent-map"
              src={tashkentLocation.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tashkent Office Location"
              className="transition-opacity duration-500 ease-in-out"
            ></iframe>
          </div>
        );
      }
      default:
        return (
          <div className="transition-all duration-700 ease-in-out transform animate-fadeIn">
            <Form />
          </div>
        );
    }
  };

  return (
    <div className="scroll-section section-shell bg-gradient-to-b from-gray-50 to-white" id="contact">
      <div className="layout-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            Biz bilan <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Bog'laning</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Koreyada ta'lim olish bo'yicha bepul konsultatsiya va professional yordam
          </p>
        </div>

        <div className="surface-panel p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Right Panel - Shows first on mobile */}
            <div className="lg:w-1/2 order-1 lg:order-2 mb-6 lg:mb-0">
              <div className="h-full min-h-[500px]">
                {renderRightPanel()}
              </div>
            </div>

            {/* Left Sidebar - Shows second on mobile */}
            <div className="lg:w-1/2 order-2 lg:order-1 space-y-4 lg:space-y-6">
              <div className="mb-6" id="bizning-manzil">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  Bizning manzillarimiz
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4"></div>
                <div className="flex items-center gap-3 bg-green-50 px-3 py-2 rounded-xl border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-semibold text-green-800">
                    Ish vaqti: 09:00-18:00
                  </p>
                </div>
              </div>

              {/* Registration Button */}
              <button
                onClick={handleRegistrationClick}
                className={`w-full mb-4 p-3 lg:p-4 rounded-2xl transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1 ${activeView === 'form'
                  ? 'bg-blue-50 border-2 border-blue-300 shadow-lg'
                  : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 shadow-md'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${activeView === 'form' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 shadow-md'
                    }`}>
                    <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                  </div>
                  <span className="text-lg lg:text-xl font-bold text-gray-900">Ro'yhatdan o'tish</span>
                </div>
              </button>

              {/* Address Locations */}
              <div className="space-y-3 mb-6">
                {addressData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLocationClick(item.id)}
                    className={`w-full p-3 lg:p-4 rounded-2xl transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1 ${activeView === item.id
                      ? 'bg-blue-50 border-2 border-blue-300 shadow-lg'
                      : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 shadow-md'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl mt-1 transition-colors ${activeView === item.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 shadow-md'
                        }`}>
                        <FontAwesomeIcon icon={item.icon} className="text-base" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base lg:text-lg font-bold text-gray-900">{item.title}</h3>
                          <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold">
                            <FontAwesomeIcon icon={faMap} className="text-xs" />
                            <span>Xarita</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Phone */}
              <div className="mb-6 p-3 lg:p-4 rounded-2xl bg-gray-50 border-2 border-gray-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white text-gray-500 shadow-md">
                    <FontAwesomeIcon icon={faPhone} className="text-base" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1">Telefon</h3>
                    <a
                      href="tel:+998785552417"
                      className="text-blue-600 hover:text-blue-700 transition-colors text-sm lg:text-base font-semibold"
                      onClick={() => trackButtonClick('contact_phone', 'contact_section')}
                    >
                      +998-78-555-24-17
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a
                  href="https://www.instagram.com/unibridge_consulting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] justify-center flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 cursor-pointer shadow-lg transform hover:-translate-y-1 text-sm lg:text-base font-semibold"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-base" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://t.me/unibridge_consulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] justify-center flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer shadow-lg transform hover:-translate-y-1 text-sm lg:text-base font-semibold"
                >
                  <FontAwesomeIcon icon={faTelegram} className="text-base" />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://www.youtube.com/@UnibridgeKoreya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] justify-center flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 cursor-pointer shadow-lg transform hover:-translate-y-1 text-sm lg:text-base font-semibold"
                >
                  <FontAwesomeIcon icon={faYoutube} className="text-base" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
