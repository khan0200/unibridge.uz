import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InformationSummary = ({ item }) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 text-center group hover:bg-white transition-all duration-300 border border-gray-100/60 shadow-md hover:shadow-lg hover:-translate-y-0.5">
      <div className="space-y-2 sm:space-y-3">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105`}>
          <FontAwesomeIcon 
            icon={item.icon} 
            className="text-white text-sm sm:text-base" 
          />
        </div>
        
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-none">
            {item.description}
          </p>
          <p className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationSummary;
