import { useState } from "react";

const WorkSteps = ({ data, style }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`${style && style}`}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div
        className={`w-16 h-16 lg:w-20 lg:h-20 ${
          hover ? "bg-blue-600" : "bg-blue-50"
        } flex items-center justify-center rounded-2xl transition-all duration-300 mb-6`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 lg:w-10 lg:h-10"
        >
          <path d={data?.svgPath} fill={`${hover ? "#FFFFFF" : "#2563eb"}`} />
        </svg>
      </div>
      <div>
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {data?.id}. {data?.title}
        </h3>
        <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default WorkSteps;
