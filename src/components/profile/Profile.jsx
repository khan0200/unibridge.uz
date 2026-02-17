import image2 from "../../../University logos/image2.jpg";
import SocialMedia from "../common/socialMedia/SocialMedia";
import InformationSummary from "../introduction/InformationSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faUsers, faTrophy } from "@fortawesome/free-solid-svg-icons";

// Information summary data
const informationSummaryData = [
  {
    id: 1,
    title: "Universitetlar",
    description: "40+",
    icon: faGraduationCap,
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Yordam berilgan talabalar",
    description: "300+",
    icon: faUsers,
    color: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "Muvaffaqiyat darajasi",
    description: "95%",
    icon: faTrophy,
    color: "from-orange-500 to-red-600"
  },
];

const Profile = () => {
  return (
    <div className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8" id="profile">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white to-blue-50/60"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Main Content Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Image and Social */}
            <div className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-xl"></div>
              
              <div className="relative space-y-6">
                {/* Profile Image */}
                <div className="relative max-w-xs mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl transform rotate-2 scale-105"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <img
                      className="w-full h-auto object-cover rounded-xl transition-all duration-500 hover:scale-[1.02]"
                      src={image2}
                      alt="UniBridge haqida ma'lumot"
                    />
                  </div>
                </div>

                {/* CTA Button - Moved here */}
                <div className="flex justify-center">
                  <a
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                    href="#universitetlar"
                  >
                    Bizning universitetlarimiz
                  </a>
                </div>

                {/* Social Media */}
                <div className="flex justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md border border-gray-100/80">
                    <SocialMedia />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">UniBridge</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">haqida ma'lumot</span>
                </h2>
                
                <p className="text-base text-gray-600 leading-relaxed">
                  2023-yilda tashkil topgan, Janubiy Koreyada ta'lim olishda professional yordam beruvchi tashkilot.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3">
                {informationSummaryData.map((item) => (
                  <InformationSummary key={item.id} item={item} />
                ))}
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg border border-gray-100">
                  <span className="font-semibold text-gray-900 block mb-1 text-xs">Ro'yxatdan o'tish:</span>
                  <span className="text-gray-600 text-xs">21.10.2022 yil</span>
                </div>
                <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg border border-gray-100">
                  <span className="font-semibold text-gray-900 block mb-1 text-xs">Rahbar:</span>
                  <span className="text-gray-600 text-xs">Muhammadali Abdulahad o'g'li</span>
                </div>
                <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg border border-gray-100">
                  <span className="font-semibold text-gray-900 block mb-1 text-xs">Kompaniya INN:</span>
                  <span className="text-gray-600 text-xs">309961634</span>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                  <span className="font-bold text-blue-800 text-xs">100% onlayn xizmat</span>
                  <span className="block text-blue-600 text-xs">O'zbekiston bo'ylab</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
