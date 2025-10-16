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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{university.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          {/* University Image and Basic Info */}
          <div className="text-center mb-4">
            <img
              src={university.image}
              alt={university.title}
              className="w-24 h-24 object-contain bg-gray-50 rounded-lg mx-auto mb-3"
            />
            <div className="flex justify-center gap-4 mb-4">
              <div className="bg-blue-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-semibold text-blue-800">QS Ranking: </span>
                <span className="text-sm text-blue-600">{university.ranking}</span>
              </div>
              <div className="bg-green-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-semibold text-green-800">Til talabi: </span>
                <span className="text-sm text-green-600">{university.languageReq}</span>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Interview:</h3>
              <p className="text-gray-600 text-sm">{university.interview}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Location:</h3>
              <p className="text-gray-600 text-sm">{university.location}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">App Fee:</h3>
              <p className="text-gray-600 text-sm">{university.applicationFee}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Notes:</h3>
              <p className="text-gray-600 text-sm">{university.notes}</p>
            </div>
          </div>

          {/* Available Programs */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-center">Available Programs</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              {university.majors && university.majors.length > 0 ? (
                <div className="grid gap-2">
                  {university.majors.map((major, index) => (
                    <div key={index} className="bg-white p-2 rounded border">
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
        <div className="flex justify-center gap-4 p-4 border-t bg-gray-50">
          <button
            onClick={handleTopshirish}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faFileText} />
            Topshirish
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversityModal;