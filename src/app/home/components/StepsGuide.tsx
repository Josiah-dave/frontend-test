
import React from "react";

interface Step {
  number: number;
  title: string;
}

interface StepsGuideProps {
  title: string;
  steps: Step[];
}

const StepsGuide: React.FC<StepsGuideProps> = ({ title, steps }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">{title}</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-pdf-blue text-white flex items-center justify-center text-xl font-bold mb-4 z-10">
                    {step.number}
                  </div>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-6 left-[calc(50%+24px)] w-[calc(100%-24px)] h-0.5 bg-blue-200 hidden md:block"></div>
                  )}
                  
                  <h3 className="text-lg font-medium text-center">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsGuide;
