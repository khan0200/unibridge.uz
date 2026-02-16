import { useState } from "react";

const TariffCard = ({ tariff }) => {
  const handleTariffSelection = (tariffName) => {
    // Create the message based on tariff name
    const messages = {
      'Standart': 'Assalom aleykum, STANDART ta\'rifini tanladim, ta\'rif haqida ma\'lumot bering!',
      'Premium': 'Assalom aleykum, PREMIUM ta\'rifini tanladim, ta\'rif haqida ma\'lumot bering!',
      'Visa Plus': 'Assalom aleykum, VISA PLUS ta\'rifini tanladim, ta\'rif haqida ma\'lumot bering!'
    };

    const message = messages[tariffName] || `Assalom aleykum, ${tariffName} ta'rifini tanladim, ta'rif haqida ma'lumot bering!`;

    // Store the message in localStorage to pass it to the contact form
    localStorage.setItem('selectedTariffMessage', message);

    // Dispatch a custom event to notify the Form component
    window.dispatchEvent(new CustomEvent('tariffSelected', { detail: { message } }));

    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Wait a bit for scroll to complete, then focus the textarea
      setTimeout(() => {
        const messageTextarea = contactSection.querySelector('textarea[placeholder="Xabar (ixtiyoriy)"]');
        if (messageTextarea) {
          messageTextarea.focus();
        }
      }, 1000);
    }
  };
  const [mouseHover, setMouseHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      className={`relative p-3 sm:p-4 lg:p-5 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl hover:shadow-2xl rounded-2xl border transform hover:-translate-y-1 ${tariff.featured
          ? 'border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 ring-2 ring-blue-300/50'
          : 'border-gray-200 hover:border-blue-300'
        }`}
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    >


      {/* Animated Border Effect */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none ${mouseHover ? 'bg-gradient-to-r from-blue-500/5 to-blue-600/5' : 'bg-transparent'
          }`}
        style={{ transition: 'background 0.3s ease' }}
      />



      {/* Tariff Header */}
      <div className="text-center mb-4 sm:mb-5 relative z-10">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
            {tariff.name}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="mb-3 sm:mb-4">
          <div className="relative">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              {tariff.price.toLocaleString()}
            </span>
            <span className="text-lg text-gray-600 ml-2 font-semibold">SO'M</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border-2 ${tariff.featured
            ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300'
            : 'bg-gray-50 border-gray-200'
          }`}>
          <span className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-2">
            BOSHLANG'ICH TO'LOV:
          </span>
          <div className="text-xl lg:text-2xl font-bold text-gray-900">
            {tariff.initialPayment.toLocaleString()} <span className="text-base text-gray-600">SO'M</span>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center mb-2 sm:mb-3">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide">
            XIZMATLAR
          </h4>
        </div>

        <div className="space-y-1.5">
          {tariff.services.map((service, index) => {
            const isInformationalText = service.text.includes('Ushbu ta\'rif kimlar uchun') || service.text.includes('Universitetdan ko\'proq grant');

            if (isInformationalText) {
              return (
                <div key={index} className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm text-blue-800 font-medium leading-relaxed italic">
                      {service.text}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className={`flex items-center justify-between p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${service.text.includes('STANDART') || service.text.includes('PREMIUM')
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}>
                <div className="flex items-center flex-1 pr-2">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium leading-tight">
                    {service.text}
                  </span>
                </div>
                <span className={`text-xs font-bold whitespace-nowrap px-2 py-1 rounded-full ${service.price === '✓' || service.price === 'Bepul'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                  }`}>
                  {service.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visa Conditions */}
      <div className="space-y-1.5 relative z-10">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-1.5 sm:p-2 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-green-800">{tariff.visaSuccess}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-1.5 sm:p-2 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-green-800">{tariff.visaRefund}</span>
          </div>
        </div>
      </div>

      {/* Tanladim Button */}
      <div className="mt-5 relative z-10">
        <button
          onClick={() => handleTariffSelection(tariff.name)}
          className="w-full py-3 px-5 rounded-xl font-bold text-base transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg"
        >
          Tanladim
        </button>
      </div>
    </div>
  );
};

export default TariffCard;