import { useState, useEffect } from "react";
import { trackFormSubmission } from "../../config/googleSheets";

const telegramSVG = (
  <svg
    className="w-4 md:w-6 aspect-square"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.34 9.32013L6.34 2.32013C5.78749 2.04514 5.16362 1.94724 4.55344 2.03978C3.94326 2.13232 3.37646 2.4108 2.93033 2.83724C2.48421 3.26369 2.18046 3.81735 2.0605 4.42274C1.94054 5.02813 2.0102 5.65578 2.26 6.22013L4.66 11.5901C4.71446 11.72 4.74251 11.8593 4.74251 12.0001C4.74251 12.1409 4.71446 12.2803 4.66 12.4101L2.26 17.7801C2.0567 18.2368 1.97076 18.7371 2.00998 19.2355C2.0492 19.7339 2.21235 20.2145 2.48459 20.6338C2.75682 21.0531 3.12953 21.3977 3.56883 21.6363C4.00812 21.875 4.50009 22 5 22.0001C5.46823 21.9955 5.92949 21.8861 6.35 21.6801L20.35 14.6801C20.8466 14.4303 21.264 14.0474 21.5557 13.5742C21.8474 13.101 22.0018 12.556 22.0018 12.0001C22.0018 11.4442 21.8474 10.8993 21.5557 10.4261C21.264 9.95282 20.8466 9.56994 20.35 9.32013H20.34ZM19.45 12.8901L5.45 19.8901C5.26617 19.9784 5.05973 20.0084 4.85839 19.976C4.65705 19.9436 4.47041 19.8504 4.32352 19.709C4.17662 19.5675 4.07648 19.3845 4.03653 19.1846C3.99658 18.9846 4.01873 18.7772 4.1 18.5901L6.49 13.2201C6.52094 13.1484 6.54766 13.075 6.57 13.0001H13.46C13.7252 13.0001 13.9796 12.8948 14.1671 12.7072C14.3546 12.5197 14.46 12.2653 14.46 12.0001C14.46 11.7349 14.3546 11.4806 14.1671 11.293C13.9796 11.1055 13.7252 11.0001 13.46 11.0001H6.57C6.54766 10.9253 6.52094 10.8518 6.49 10.7801L4.1 5.41013C4.01873 5.22309 3.99658 5.01568 4.03653 4.8157C4.07648 4.61572 4.17662 4.43273 4.32352 4.29128C4.47041 4.14982 4.65705 4.05666 4.85839 4.02428C5.05973 3.9919 5.26617 4.02186 5.45 4.11013L19.45 11.1101C19.6138 11.194 19.7513 11.3215 19.8473 11.4786C19.9433 11.6356 19.994 11.8161 19.994 12.0001C19.994 12.1842 19.9433 12.3647 19.8473 12.5217C19.7513 12.6787 19.6138 12.8062 19.45 12.8901Z"
      fill="white"
    />
  </svg>
);

const commonClass =
  "w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder:text-gray-500 text-gray-900 shadow-sm hover:shadow-md text-sm";

const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [fullname, setFullname] = useState("");
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  
  // Check for stored messages on component mount and listen for changes
  useEffect(() => {
    const checkStoredMessages = () => {
      const storedTariffMessage = localStorage.getItem('selectedTariffMessage');
      const storedUniversityMessage = localStorage.getItem('selectedUniversityMessage');
      
      if (storedTariffMessage) {
        setMessage(storedTariffMessage);
        localStorage.removeItem('selectedTariffMessage');
      } else if (storedUniversityMessage) {
        setMessage(storedUniversityMessage);
        localStorage.removeItem('selectedUniversityMessage');
      }
    };

    // Check on mount
    checkStoredMessages();

    // Listen for tariff selection events
    const handleTariffSelected = (event) => {
      setMessage(event.detail.message);
    };

    // Listen for university selection events
    const handleUniversitySelected = (event) => {
      setMessage(event.detail.message);
    };

    // Listen for storage changes (when localStorage is updated from other components)
    const handleStorageChange = () => {
      checkStoredMessages();
    };

    window.addEventListener('tariffSelected', handleTariffSelected);
    window.addEventListener('universitySelected', handleUniversitySelected);
    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listeners
     return () => {
       window.removeEventListener('tariffSelected', handleTariffSelected);
       window.removeEventListener('universitySelected', handleUniversitySelected);
       window.removeEventListener('storage', handleStorageChange);
     };
   }, []);
  
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Remove all non-digit characters except the + at the beginning
    let digits = value.replace(/[^\d]/g, '');
    
    // Ensure it starts with 998
    if (!digits.startsWith('998')) {
      digits = '998' + digits.replace(/^998/, '');
    }
    
    // Limit to 12 digits (998 + 9 digits)
    digits = digits.substring(0, 12);
    
    // Format the number
    let formatted = '+998';
    if (digits.length > 3) {
      formatted += ' ' + digits.substring(3, 5);
    }
    if (digits.length > 5) {
      formatted += ' ' + digits.substring(5, 8);
    }
    if (digits.length > 8) {
      formatted += ' ' + digits.substring(8, 10);
    }
    if (digits.length > 10) {
      formatted += ' ' + digits.substring(10, 12);
    }
    
    setPhoneNumber(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fullname.trim() || !phoneNumber || phoneNumber === "+998 " || !level) {
      setSubmitStatus("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const formData = new FormData();
      formData.append('fullname', fullname.trim());
      formData.append('phone', phoneNumber);
      formData.append('level', level);
      formData.append('message', message.trim());

      const response = await fetch('https://script.google.com/macros/s/AKfycbz1QNh2BqHp03QS7UvwcJ8YzsJS3o-hS1J975oVddoTAZIyrk65F_gXK-sCB1ywz0Q/exec', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSubmitStatus("Ma'lumotlaringiz muvaffaqiyatli yuborildi!");
        
        // Track successful form submission
        trackFormSubmission('Contact Form', {
          fullname: fullname.trim(),
          phone: phoneNumber,
          level: level,
          has_message: message.trim().length > 0
        });
        
        // Reset form
        setFullname("");
        setPhoneNumber("+998 ");
        setLevel("");
        setMessage("");
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="p-4 bg-white/60 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Ro'yhatdan o'tish
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
          Savollaringizni yozib qoldiring! Sizga tez orada aloqaga chiqamiz!
        </p>
      </div>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">To'liq ism *</label>
            <input
              type="text"
              placeholder="Ismingizni kiriting"
              className={`${commonClass}`}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Telefon raqam *</label>
            <input
              type="tel"
              placeholder="+998 XX XXX XX XX"
              className={`${commonClass}`}
              pattern="\+998 \d{2} \d{3} \d{2} \d{2}"
              value={phoneNumber}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Ta'lim darajasi *</label>
            <div className="relative">
              <select
                className={`${commonClass} appearance-none pr-10 ${level ? 'text-gray-900' : 'text-gray-500'}`}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              >
                <option value="" disabled>Tanlang</option>
                <option value="KASBIY_TALIM">Kasbiy ta'lim (Kollej)</option>
                <option value="BAKALAVR">Bakalavr</option>
                <option value="MAGISTR">Magistr</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Xabar (ixtiyoriy)</label>
            <textarea
              placeholder="Qo'shimcha ma'lumot yoki savollaringizni yozing..."
              className={`${commonClass} min-h-[100px] resize-vertical`}
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          {submitStatus && (
            <div className={`text-sm mt-2 ${submitStatus.includes('muvaffaqiyatli') ? 'text-green-600' : 'text-red-600'}`}>
              {submitStatus}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'} {telegramSVG}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
