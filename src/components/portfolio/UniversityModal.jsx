import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileText } from '@fortawesome/free-solid-svg-icons';
import { trackUniversityInteraction, trackButtonClick } from '../../config/googleSheets';

const UniversityModal = ({ isOpen, onClose, university }) => {
  if (!isOpen || !university) return null;

  const handleTopshirish = () => {
    // Track university application button click
    trackUniversityInteraction(university.title, 'application_click');
    trackButtonClick('university_application', university.title);

    // Create the message with university name
    const message = `Assalom aleykum, ${university.title} ni tanladim, ushbu universitet haqida ma'lumot bering!`;

    // Close the modal first
    onClose();

    // Dispatch custom event to notify Form component
    const universitySelectedEvent = new CustomEvent('universitySelected', {
      detail: { message }
    });
    window.dispatchEvent(universitySelectedEvent);

    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Focus the textarea after a brief delay
      setTimeout(() => {
        const messageTextarea = contactSection.querySelector('textarea[placeholder="Xabar (ixtiyoriy)"]');
        if (messageTextarea) {
          messageTextarea.focus();
        }
      }, 100);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-fadeIn">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{university.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* University Image and Basic Info */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center p-3">
              <img
                src={university.image}
                alt={university.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {university.ranking && (
                <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                  <span className="text-sm font-semibold text-blue-800">Ranking: </span>
                  <span className="text-sm text-blue-600">{university.ranking}</span>
                </div>
              )}
              <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                <span className="text-sm font-semibold text-green-800">Til talabi: </span>
                <span className="text-sm text-green-600">{university.languageReq}</span>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Interview:</h3>
              <p className="text-gray-600 text-sm">{university.interview}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Location:</h3>
              <p className="text-gray-600 text-sm">{university.location}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">App Fee:</h3>
              <p className="text-gray-600 text-sm">{university.applicationFee}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Notes:</h3>
              <p className="text-gray-600 text-sm">{university.notes}</p>
            </div>
          </div>

          {/* Available Programs */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-center text-base">Available Programs</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              {university.majors && university.majors.length > 0 ? (
                <div className="grid gap-2">
                  {university.majors.map((major, index) => (
                    <div key={index} className="bg-white p-3 rounded-xl border border-gray-100">
                      <span className="font-medium text-gray-800 text-sm">{major.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-sm">Dasturlar haqida ma'lumot yo'q</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-center gap-4 p-5 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          <button
            onClick={handleTopshirish}
            className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 font-semibold flex items-center gap-2 shadow-md"
          >
            <FontAwesomeIcon icon={faFileText} />
            Topshirish
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversityModal;
