import React from "react";
import Navbar from "@/app/home/components/Navbar";
import Hero from "@/app/home/components/Hero";
import FeatureCard from "@/app/home/components/FeatureCard";
import StepsGuide from "@/app/home/components/StepsGuide";
import ResourceCard from "@/app/home/components/ResourceCard";
import { features, resources, steps } from "@/constants/constants";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar
        message="LightPDF's New Flash Feature: Image Watermark Remover!"
        ctaText="Learn More"
        link="#"
      />

      <Hero
        title="Annotate PDF"
        subtitle="Annotate and Save PDF Files online"
        showAIBadge={true}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon; // ✅ Declare before returning JSX
              return (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={<Icon size={24} />}
                />
              );
            })}
          </div>
        </div>
      </section>

      <StepsGuide title="How to Annotate PDF for Free" steps={steps} />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            More Resources about PDF
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                imageUrl={resource.imageUrl}
                link={resource.link}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © 2023 PDF Annotator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
