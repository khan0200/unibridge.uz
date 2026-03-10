import WorkSteps from "./WorkSteps";

const workStepData = [
  {
    id: 1,
    title: "Talabaga Konsultatsiya berish",
    description:
      "Talabani qiziqtirgan barcha savollarga javob beriladi, shartnoma shartlari tanishitiriladi.",
    svgPath:
      "M16 2C13.8783 2 12.0434 3.84315 12.0434 6.08696V8.17391H8.69565C7.20869 8.17391 6 9.38261 6 10.8696V25.3043C6 26.7913 7.20869 28 8.69565 28H23.3043C24.7913 28 26 26.7913 26 25.3043V10.8696C26 9.38261 24.7913 8.17391 23.3043 8.17391H19.9565V6.08696C19.9565 3.84315 18.1217 2 16 2ZM14.2609 6.08696C14.2609 5.06522 15.1043 4.21739 16 4.21739C16.8957 4.21739 17.7391 5.06522 17.7391 6.08696V8.17391H14.2609V6.08696ZM8.69565 10.3913H23.3043C23.5652 10.3913 23.7826 10.6087 23.7826 10.8696V25.3043C23.7826 25.5652 23.5652 25.7826 23.3043 25.7826H8.69565C8.43478 25.7826 8.21739 25.5652 8.21739 25.3043V10.8696C8.21739 10.6087 8.43478 10.3913 8.69565 10.3913ZM16 14.6087C15.3913 14.6087 14.8696 15.1304 14.8696 15.7391C14.8696 16.3478 15.3913 16.8696 16 16.8696C16.6087 16.8696 17.1304 16.3478 17.1304 15.7391C17.1304 15.1304 16.6087 14.6087 16 14.6087Z",
  },
  {
    id: 2,
    title: "Shartnoma tuzish",
    description:
      "Talabani xolati o'rganilgach qulay ta'riflardan birida shartnoma tuzib, talabaga mos universitet tanlanadi.",
    svgPath:
      "M6 2C4.89543 2 4 2.89543 4 4V28C4 29.1046 4.89543 30 6 30H26C27.1046 30 28 29.1046 28 28V8L22 2H6ZM6 4H20V10H26V28H6V4ZM8 14V16H24V14H8ZM8 18V20H24V18H8ZM8 22V24H20V22H8Z",
  },
  {
    id: 3,
    title: "Universitet",
    description:
      "Talabaning Universitetga o'qishga kirishi, Kontrakt to'lashi, Admission olish jarayoni 100% nazorat qilinadi.",
    svgPath:
      "M16 2L2 8L16 14L30 8L16 2ZM16 5.5L24.5 8L16 10.5L7.5 8L16 5.5ZM4 10.5V20.5C4 22.5 9 26 16 26C23 26 28 22.5 28 20.5V10.5L16 16L4 10.5ZM6 12.5L16 18L26 12.5V20.5C26 21.5 22 24 16 24C10 24 6 21.5 6 20.5V12.5Z",
  },
  {
    id: 4,
    title: "Viza",
    description:
      "Talabaning hujjatlari vizaga tayyorlanadi, topshiriladi. Viza chiqganidan so'ng unga kvartira, aviabilet, sim karta, bank kartasi olib berishga yordam beriladi.",
    svgPath:
      "M4 6C2.89543 6 2 6.89543 2 8V24C2 25.1046 2.89543 26 4 26H28C29.1046 26 30 25.1046 30 24V8C30 6.89543 29.1046 6 28 6H4ZM4 8H28V24H4V8ZM6 10V12H10V10H6ZM12 10V12H26V10H12ZM6 14V16H14V14H6ZM16 14V16H26V14H16ZM6 18V20H12V18H6ZM14 18V20H26V18H14Z",
  },
];

const WorkProcess = () => {
  return (
    <div
      className="scroll-section section-shell bg-gradient-to-b from-gray-50 to-white"
      id="work-process"
    >
      <div className="layout-container">
        {/* Header Section */}
        <div className="section-header text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">JARAYON</span>
          </h2>

        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {workStepData.map((data, index) => {
            return (
              <WorkSteps
                data={data}
                style="p-6 lg:p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkProcess;
