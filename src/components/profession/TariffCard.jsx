const TariffCard = ({ tariff, isOpen, onToggle }) => {
  const handleTariffSelection = (tariffName) => {
    const messages = {
      'Standart': "Assalom aleykum, STANDART ta'rifini tanladim, ta'rif haqida ma'lumot bering!",
      'Premium': "Assalom aleykum, PREMIUM ta'rifini tanladim, ta'rif haqida ma'lumot bering!",
      'Visa Plus': "Assalom aleykum, VISA PLUS ta'rifini tanladim, ta'rif haqida ma'lumot bering!",
      'Regional': "Assalom aleykum, REGIONAL ta'rifini tanladim, ta'rif haqida ma'lumot bering!",
      'E-Viza (Til sertifikatli)': "Assalom aleykum, E-VIZA (Til sertifikatli) ta'rifini tanladim, ta'rif haqida ma'lumot bering!",
      'E-Viza (Til sertifikatisiz)': "Assalom aleykum, E-VIZA (Til sertifikatisiz) ta'rifini tanladim, ta'rif haqida ma'lumot bering!"
    };
    const message = messages[tariffName] || `Assalom aleykum, ${tariffName} ta'rifini tanladim, ta'rif haqida ma'lumot bering!`;
    localStorage.setItem('selectedTariffMessage', message);
    window.dispatchEvent(new CustomEvent('tariffSelected', { detail: { message } }));
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const messageTextarea = contactSection.querySelector('textarea[placeholder="Xabar (ixtiyoriy)"]');
        if (messageTextarea) messageTextarea.focus();
      }, 1000);
    }
  };

  return (
    <div
      className={`relative surface-card overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
        tariff.featured ? 'ring-2 ring-blue-400/60' : ''
      }`}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${
        tariff.featured
          ? 'bg-gradient-to-r from-blue-500 to-purple-600'
          : tariff.vip
          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
          : 'bg-gradient-to-r from-blue-400 to-blue-600'
      }`} />

      {/* Card content */}
      <div className="p-5 sm:p-6">

        {/* ── Header: name + price ── */}
        <div className="text-center mb-5">
          <h3 className="text-base sm:text-lg font-extrabold text-gray-900 uppercase tracking-widest mb-3">
            {tariff.name}
          </h3>

          <div className="mb-4">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">
              {tariff.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-1.5 font-semibold">SO'M</span>
          </div>

          {/* Initial payment box */}
          <div className={`rounded-xl px-4 py-3 border ${
            tariff.featured
              ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <p className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Boshlang'ich to'lov
            </p>
            <p className="text-lg sm:text-xl font-black text-gray-900">
              {tariff.initialPayment.toLocaleString()}
              <span className="text-xs text-gray-500 ml-1 font-semibold">SO'M</span>
            </p>
          </div>
        </div>

        {/* ── XIZMATLAR accordion trigger ── */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 opacity-90" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Xizmatlar</span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* ── Accordion body ── */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: isOpen ? '1200px' : '0px',
            opacity: isOpen ? 1 : 0,
            transition: 'max-height 0.4s ease, opacity 0.3s ease'
          }}
        >
          <div className="pt-4 space-y-4">

            {/* Services list */}
            <div className="space-y-1.5">
              {tariff.services.map((service, index) => {
                const isInfo =
                  service.text.includes("Ushbu ta'rif kimlar uchun") ||
                  service.text.includes("Universitetdan ko'proq grant");

                if (isInfo) {
                  return (
                    <div key={index} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-amber-800 font-medium leading-relaxed">{service.text}</span>
                    </div>
                  );
                }

                return (
                  <div key={index} className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border ${
                    service.text.includes('STANDART') || service.text.includes('PREMIUM')
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-gray-700 font-medium leading-relaxed">{service.text}</span>
                    </div>
                    {service.price && (
                      <span className={`text-[0.6rem] font-bold whitespace-nowrap px-2 py-0.5 rounded-full flex-shrink-0 ${
                        service.price === '✓' || service.price === 'Bepul'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {service.price}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            {tariff.additionalInfo && tariff.additionalInfo.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-[0.65rem] font-bold text-gray-700 uppercase tracking-widest">Qo'shimcha ma'lumot</h4>
                </div>
                <div className="space-y-1.5">
                  {tariff.additionalInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-amber-800 font-medium leading-relaxed">{info}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Schedule */}
            {tariff.paymentSchedule && tariff.paymentSchedule.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-[0.65rem] font-bold text-gray-700 uppercase tracking-widest">To'lov tartibi</h4>
                </div>
                <div className="space-y-1.5">
                  {tariff.paymentSchedule.map((step, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                      <span className="text-xs text-purple-800 font-medium">{step.condition}</span>
                      <span className="text-[0.6rem] font-bold whitespace-nowrap px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex-shrink-0">{step.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visa Conditions */}
            <div className="space-y-1.5">
              <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-green-800 leading-relaxed">{tariff.visaSuccess}</span>
              </div>

              {tariff.visaRefund && (
                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-green-800 leading-relaxed">{tariff.visaRefund}</span>
                </div>
              )}
            </div>

            {/* Tanladim Button */}
            <button
              onClick={() => handleTariffSelection(tariff.name)}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md mt-1"
            >
              Tanladim
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
