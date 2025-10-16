import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects = ({ data, onDetailsClick }) => {
  return (
    <div className="max-w-80 rounded-xl bg-white hover:shadow-2xl duration-300 transition-all shadow-lg border border-gray-100 overflow-hidden group hover:-translate-y-2">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <img src={data?.image} alt={`${data?.title} image`} className="w-full h-40 object-contain p-6 group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 right-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            {data?.ranking}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full mb-2">
            {data?.category}
          </span>
          <h3 className="text-gray-900 text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors">
            {data?.title}
          </h3>
        </div>
        {/* Language Requirements */}
        <div className="mb-4">
          {data?.languageReq && (
            <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
              <i className="fas fa-language text-green-600 text-sm"></i>
              <span className="text-sm font-medium text-green-700">{data.languageReq}</span>
            </div>
          )}
        </div>
        

        <button
          onClick={onDetailsClick}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
        >
          Batafsil
          <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
        {/* </p> */}
      </div>
    </div>
  );
};

export default Projects;
