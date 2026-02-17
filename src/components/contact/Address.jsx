import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Address = ({ item }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="w-full p-4 md:p-5 lg:p-6 flex xs:not-odd:my-4 rounded-xl bg-white border border-gray-100 hover:scale-[1.02] duration-300 ease-in-out cursor-pointer hover:shadow-[0px_8px_30px_rgba(0,_0,_0,_0.12)] shadow-[0px_2px_10px_rgba(0,_0,_0,_0.08)] max-sm:mx-auto transition-all"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`h-12 md:h-14 aspect-square ${
          hover ? "bg-gradient-to-br from-picto-primary to-purple-600" : "bg-gradient-to-br from-[#EDD8FF] to-[#F3E8FF]"
        } center rounded-lg shadow-sm transition-all duration-300`}
      >
        <FontAwesomeIcon
          icon={item?.icon}
          className={`text-lg md:text-xl ${
            hover ? "text-white" : "text-picto-primary"
          } transition-colors duration-300`}
        />
      </div>
      <div className="ms-4 flex-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[13px] md:text-[15px] text-[#6B7280] font-medium uppercase tracking-wide mb-1">
              {item?.title}
            </p>
            <p className="text-[15px] md:text-[17px] text-[#1F2937] font-semibold leading-relaxed">
              {item?.description}
            </p>
          </div>
          {item?.hasMap && (
            <button
              onClick={() => window.open(item.mapLink, '_blank')}
              className="ml-3 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex-shrink-0"
              title="Xaritada ko'rish"
            >
              <FontAwesomeIcon icon={faMap} className="text-sm" />
              <span className="hidden sm:inline">Xarita</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
