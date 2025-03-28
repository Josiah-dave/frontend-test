
import React from "react";
import { motion } from "framer-motion";

interface ResourceCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, imageUrl, link }) => {
  return (
    <a href={link} className="block group">
      <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-md h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-medium text-gray-900 group-hover:text-pdf-blue transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
