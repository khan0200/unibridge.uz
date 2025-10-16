import TariffCard from "./TariffCard";
import { Link } from "react-router-dom";

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
  }
];

const Profession = () => {
  return (
    <div className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bizning <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Xizmatlar</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Koreyada ta'lim olish uchun to'liq qo'llab-quvvatlash va professional yordam
          </p>
        </div>

        {/* Tariff Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20">
          {tariffData.map((tariff, index) => (
            <TariffCard key={index} tariff={tariff} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl shadow-gray-300/20 border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Bepul konsultatsiya olish
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Mutaxassislarimiz bilan bog'laning va Koreyada ta'lim olish imkoniyatlari haqida batafsil ma'lumot oling
            </p>
            <Link
              to="/registration"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl text-lg cursor-pointer"
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
