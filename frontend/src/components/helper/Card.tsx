import React from "react";
import defaultImage from "../../assets/card.jpg";
import { useNavigate } from "react-router-dom";

// Define prop types
interface CardProps {
  id: string;
  title: string;
  location: string;
  description: string;
  price?: number | string;
  image?: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  title,
  location,
  description,
  price,
  image,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-[280px] h-[320px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Section */}
      <div className="h-[170px] w-full overflow-hidden">
        <img
          src={image || defaultImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-between p-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-gray-900">{title}</p>
          <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
            {location}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-700">
            From{" "}
            <span className="font-bold text-lg text-black">
              ₹{price || "999"}
            </span>
          </p>
          <button
            onClick={() => navigate(`/view/${id}`)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm px-4 py-2 rounded-md transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
