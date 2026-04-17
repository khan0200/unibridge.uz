import TariffCard from "./TariffCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const tariffData = [
  {
    id: 1,
    name: "Standart",
    price: 13000000,
    initialPayment: 6500000,
    featured: false,
    services: [
      { text: "Mijozning Universitet talab qilgan barcha hujjatlarini tayyorlash (Apostil, Tarjima, Notarius)", price: "1 000 000 so'm" },
      { text: "Mijozni 3 ta Universitetga onlayn ro'yxatdan o'tkazish (Apply)", price: "1 300 000 so'm" },
      { text: "2 ta Universitet uchun Application fee (100 000 KRW gacha)", price: "1 000 000 so'm" },
      { text: "Universitetga hujjatlarni o'z vaqtida yetkazib berish xizmati", price: "500 000 so'm" },
      { text: "Talabaga Universitet uchun 1 kunlik bank hisobi (Kapital, Milliy bank)", price: "400 000 so'm" },
      { text: "Elchixona talab qilgan hujjatlarni tayyorlash xizmati", price: "1 500 000 so'm" },
      { text: "Ota-ona uchun 1 kunlik bank hisobiga pul qo'yish (Kapital, Milliy bank)", price: "800 000 so'm" },
      { text: "Arzon avia bilet, kvartira topib berish xizmati", price: "✓" },
      { text: "Koreya orqali Universitetga to'lov qilib berish xizmati", price: "Bepul" }
    ],
    visaSuccess: "Viza chiqsa: 6.5 million so'm to'lov qilinadi.",
    visaRefund: "Viza chiqmasa barcha to'lov 100% qaytariladi!"
  },
  {
    id: 2,
    name: "Premium",
    price: 32500000,
    initialPayment: 32500000,
    featured: true,
    services: [
      { text: "STANDART TA'RIFIDAGI BARCHA XIZMATLAR!", price: "✓" },
      { text: "2 ta Universitet uchun Application fee (150 000 KRW gacha)", price: "1 500 000 so'm" },
      { text: "Talabaga 1 OYLIK KDB BANK HISOBI QILIB BERILADI", price: "✓" },
      { text: "Elchixona uchun hujjatlarni tayyorlab berish, elchixona to'lovini qilib berish", price: "3 000 000 so'm" },
      { text: "Ushbu ta'rif kimlar uchun: Elchixona viza bermasa 1 oylik bankshotga kuyishni xoxlamaganlar uchun!", price: "" },
      { text: "Universitetdan ko'proq grant olishga ko'zi yetadiganlar uchun!", price: "" }
    ],
    visaSuccess: "Viza chiqsa: To'lov yo'q.",
    visaRefund: "Viza chiqmasa barcha to'lov 100% qaytariladi!"
  },
  {
    id: 3,
    name: "Visa Plus",
    price: 65000000,
    initialPayment: 65000000,
    featured: false,
    vip: true,
    services: [
      { text: "PREMIUM TA'RIFIDAGI BARCHA XIZMATLAR!", price: "✓" },
      { text: "Talabaga 1 OYLIK KDB BANK HISOBI QILIB BERILADI", price: "✓" },
      { text: "Universitet kontrakti to'lab beriladi. (Limit: 1800$ - 23 000 000 so'mgacha)", price: "✓" },
      { text: "Tashkent-Seoul To'g'ridan-to'g'ri reysga Aviabilet olib beriladi", price: "✓" },
      { text: "Talaba Aeroportda kutib olinadi", price: "✓" },
      { text: "Universitetga yaqin joydan kvartira topib beriladi", price: "✓" },
      { text: "Ushbu ta'rif kimlar uchun: Elchixona viza bermasa, hech qanday harajatga kuymaslikni xoxlovchilar uchun!", price: "" }
    ],
    visaSuccess: "Viza chiqsa: To'lov yo'q.",
    visaRefund: "Viza chiqmasa barcha to'lov 100% qaytariladi!"
  },
  {
    id: 4,
    name: "Regional",
    price: 24000000,
    initialPayment: 2000000,
    featured: false,
    services: [
      { text: "Universitet tanlash va yo'nalish bo'yicha professional maslahat", price: "✓" },
      { text: "Talabaning universitet talab qilgan barcha hujjatlarini tayyorlash (Apostil, tarjima, notarial tasdiq)", price: "✓" },
      { text: "2 ta universitetga onlayn ro'yxatdan o'tkazish (Apply)", price: "✓" },
      { text: "Application fee to'lab beriladi (70 000 KRW gacha)", price: "✓" },
      { text: "Universitetga hujjatlarni o'z vaqtida yetkazib berish", price: "✓" },
      { text: "Elchixonaga viza uchun hujjatlarni tayyorlash va topshirish", price: "✓" },
      { text: "Talabaga Koreya SIM karta va bank kartasi taqdim etiladi", price: "✓" }
    ],
    additionalInfo: [
      "Jarayon: Regional Visa (Telex) orqali amalga oshiriladi",
      "Viza tasdiqlangandan so'ng xizmat to'lovi to'lanadi"
    ],
    paymentSchedule: [
      { amount: "2,000,000 so'm", condition: "shartnoma imzolanganida" },
      { amount: "22,000,000 so'm", condition: "D2 viza tasdiqlangandan so'ng" }
    ],
    visaSuccess: "Viza tasdiqlangandan so'ng to'lov amalga oshiriladi."
  },
  {
    id: 5,
    name: "E-Viza (Til sertifikatli)",
    price: 16000000,
    initialPayment: 1000000,
    featured: false,
    services: [
      { text: "Magistratura uchun universitet tanlash bo'yicha maslahat", price: "✓" },
      { text: "Hujjatlarni tayyorlash (apostil, tarjima, notarial tasdiq)", price: "✓" },
      { text: "2 ta universitetga onlayn ro'yxatdan o'tkazish", price: "✓" },
      { text: "Universitetga hujjatlarni yetkazib berish", price: "✓" },
      { text: "Immigratsiyaga viza uchun hujjatlarni tayyorlash va topshirish", price: "✓" },
      { text: "Talabaga Koreya SIM karta va bank kartasi beriladi", price: "✓" }
    ],
    additionalInfo: [
      "Magistratura uchun D-2 elektron viza (E-Visa)",
      "Immigratsiya orqali rasmiy viza jarayoni",
      "Ko'rib chiqish muddati odatda 3–5 oy"
    ],
    paymentSchedule: [
      { amount: "1,000,000 so'm", condition: "shartnoma imzolanganida" },
      { amount: "15,000,000 so'm", condition: "E-Viza tasdiqlangandan so'ng" }
    ],
    visaSuccess: "E-Viza tasdiqlangandan so'ng to'lov amalga oshiriladi."
  },
  {
    id: 6,
    name: "E-Viza (Til sertifikatisiz)",
    price: 24000000,
    initialPayment: 2000000,
    featured: false,
    services: [
      { text: "Magistratura uchun universitet va yo'nalish tanlash bo'yicha maslahat", price: "✓" },
      { text: "Hujjatlarni tayyorlash (apostil, tarjima, notarial tasdiq)", price: "✓" },
      { text: "2 ta universitetga onlayn ro'yxatdan o'tkazish", price: "✓" },
      { text: "Application fee to'lab beriladi (70 000 KRW gacha)", price: "✓" },
      { text: "Universitetga hujjatlarni yetkazib berish", price: "✓" },
      { text: "Immigratsiyaga viza uchun hujjatlarni tayyorlash va topshirish", price: "✓" },
      { text: "Talabaga Koreya SIM karta va bank kartasi beriladi", price: "✓" }
    ],
    additionalInfo: [
      "Magistratura uchun D-2 elektron viza (E-Visa)",
      "Til sertifikati talab qilinmaydi",
      "Viza ko'rib chiqish muddati 3–5 oy"
    ],
    paymentSchedule: [
      { amount: "2,000,000 so'm", condition: "shartnoma imzolanganida" },
      { amount: "22,000,000 so'm", condition: "E-Viza tasdiqlangandan so'ng" }
    ],
    visaSuccess: "E-Viza tasdiqlangandan so'ng to'lov amalga oshiriladi."
  }
];

const Profession = () => {
  const [openCardId, setOpenCardId] = useState(null);

  const handleToggle = (id) => {
    setOpenCardId(prev => prev === id ? null : id);
  };

  return (
    <div className="scroll-section section-shell bg-gradient-to-b from-white to-gray-50" id="services">
      <div className="layout-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Bizning <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Xizmatlar</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Koreyada ta'lim olish uchun to'liq qo'llab-quvvatlash va professional yordam
          </p>
        </div>

        {/* Tariff Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-10 sm:mb-12 lg:mb-14">
          {tariffData.map((tariff) => (
            <TariffCard
              key={tariff.id}
              tariff={tariff}
              isOpen={openCardId === tariff.id}
              onToggle={() => handleToggle(tariff.id)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="surface-panel p-8 lg:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Bepul konsultatsiya olish
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Mutaxassislarimiz bilan bog'laning va Koreyada ta'lim olish imkoniyatlari haqida batafsil ma'lumot oling
            </p>
            <Link
              to="/registration"
              className="btn-cta px-8 py-4 text-lg cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Bepul Konsultatsiya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profession;
