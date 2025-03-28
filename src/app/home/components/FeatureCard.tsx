
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-blue-50 text-pdf-blue">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-3">{title}</h3>
      <p className="text-gray-600 text-center text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
