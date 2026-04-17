import { useState } from "react";

const testimonialData = [
  {
    name: "Sherzod Toshmatov",
    university: "Gachon University",
    flag: "🇰🇷",
    year: "2024",
    stars: 5,
    short: "UniBridge bo'lmasida hech narsa qila olmasdim!",
    quote: "Hujjat tayyorlashdan tortib, viza olguncha hamma jarayonda yonimda bo'lishdi. Elchixona uchun hujjatlar juda to'g'ri tayyorlandi, viza birinchi urinishda chiqdi. Endi Koreya universitetida o'qiyapman!",
  },
  {
    name: "Dilnoza Yusupova",
    university: "Woosong University",
    flag: "🇰🇷",
    year: "2024",
    stars: 5,
    short: "Juda professional va tez xizmat!",
    quote: "Dastlab Koreya universitetlariga mustaqil hujjat topshirmoqchi edim, lekin juda murakkab bo'lib ketdi. UniBridge bilan bog'langanimda hamma narsa o'z joyiga tushdi. Application, bank hisobi, elchixona — hammasiga yordam berishdi.",
  },
  {
    name: "Jasur Rakhimov",
    university: "Hanyang University",
    flag: "🇰🇷",
    year: "2023",
    stars: 5,
    short: "Stipendiya olishga ham yordam berishdi!",
    quote: "TOP universitetga kirishni orzu qilardim. UniBridge menga Hanyang universitetiga kirish uchun to'g'ri hujjatlarni tayyorlashda va scholarship olishda g'oyat katta yordam berdi. Hozir 70% stipendiya bilan o'qiyapman.",
  },
  {
    name: "Malika Karimova",
    university: "Kyung Hee University",
    flag: "🇰🇷",
    year: "2024",
    stars: 5,
    short: "Viza rad etilganda ham qo'llab-quvvatlashdi!",
    quote: "Birinchi marta vizamiz rad etildi, lekin UniBridge jamoasi umid uzmadilar. Hujjatlarni qayta tayyorlab, ikkinchi urinishda viza chiqdi. Shartnomadagi kafolat to'liq bajarilib, mening poʻyezdim yoʻlga tushdi.",
  },
  {
    name: "Bobur Ergashev",
    university: "Inha University",
    flag: "🇰🇷",
    year: "2023",
    stars: 5,
    short: "Aeroportdan kvartiraga qadar yordam!",
    quote: "Visa Plus ta'rifini tanlaganimda hamma narsa to'liq xizmat ko'rsatildi. Aviabilet, aeroportda kutib olish, kvartira topish — hamma narsa oldindan hal bo'ldi. Koreya hayotim tinch boshlandi.",
  },
  {
    name: "Nodira Xasanova",
    university: "Sun Moon University",
    flag: "🇰🇷",
    year: "2024",
    stars: 5,
    short: "IELTS'siz ham qabul qilindi!",
    quote: "IELTS sertifikatim yo'q edi, shu sababli Koreyaga borish imkoniyatim yo'q deb o'ylardim. UniBridge IELTS talab qilmaydigan universitetlarni tavsiya qildi va hujjatlarni shu asosda tayyorladi. Endi Koreya tilini o'rganayapman!",
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonialData.length) % testimonialData.length);
  const next = () => setCurrent((c) => (c + 1) % testimonialData.length);

  const item = testimonialData[current];

  return (
    <div className="scroll-section section-shell bg-gradient-to-b from-white to-gray-50" id="testimonials">
      <div className="layout-container">

        {/* Header */}
        <div className="section-header text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Talabalar{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Fikrlari
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Koreya universitetlariga o'qishga kirgan talabalarimizning haqiqiy fikrlari
          </p>
        </div>

        {/* Mobile: single card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative surface-card p-7 sm:p-10">
            {/* Quote icon */}
            <div className="absolute top-6 right-7 text-6xl text-blue-100 font-serif leading-none select-none">"</div>

            {/* Stars + university */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <StarRating count={item.stars} />
              <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
                {item.flag} {item.university}
              </span>
              <span className="text-xs text-gray-400">{item.year}</span>
            </div>

            {/* Short headline */}
            <p className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
              "{item.short}"
            </p>

            {/* Full quote */}
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
              {item.quote}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">{item.university} talabasi</p>
              </div>
            </div>

            {/* Nav arrows */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
              <button onClick={prev} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-1.5 flex-1">
                {testimonialData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-blue-500" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`}
                  />
                ))}
              </div>

              <span className="text-xs text-gray-400 mr-1">{current + 1} / {testimonialData.length}</span>

              <button onClick={next} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Testimonial;

