import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects = ({ data, onDetailsClick }) => {
  return (
    <div className="w-full surface-card overflow-hidden group hover:-translate-y-1"
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <img src={data?.image} alt={`${data?.title} image`} className="w-full h-36 sm:h-40 object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-300" />
        {data?.ranking && (
          <div className="absolute top-3 right-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
              {data?.ranking}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full mb-2">
            {data?.category}
          </span>
          <h3 className="text-gray-900 text-sm sm:text-base lg:text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
            {data?.title}
          </h3>
        </div>
        {/* Language Requirements */}
        <div className="mb-4">
          {data?.languageReq && (
            <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
              <span className="text-xs sm:text-sm font-medium text-green-700">{data.languageReq}</span>
            </div>
          )}
        </div>


        <button
          onClick={onDetailsClick}
          className="w-full btn-cta text-sm sm:text-base"
        >
          Batafsil
          <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Projects;
