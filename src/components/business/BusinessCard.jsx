import React from 'react';
import { Star } from 'lucide-react';

const BusinessCard = ({ business, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
      onClick={() => onClick(business)}
    >
      <img 
        src={business.image} 
        alt={business.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{business.name}</h3>
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-medium">{business.rating}</span>
          <span className="text-gray-500 ml-2">({business.reviewCount} reviews)</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>{business.category}</span>
          <span>{business.location}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;