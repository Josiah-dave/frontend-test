"use client";
import React from "react";
import FileUploader from "../../../components/FileUploader";
import { useRouter } from "next/navigation";
import { useFileStore } from "@/store/fileStore";
import { SIMULATEDUPLOADTIME } from "@/constants/constants";

interface HeroProps {
  title: string;
  subtitle: string;
  showAIBadge?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  showAIBadge = false,
}) => {
  const { setData } = useFileStore();
  const navigation = useRouter();

  const handleFileSelect = (files: FileList) => {
    if (files?.length) {
      const selectedFile = files[0];
      setData(selectedFile);

      setTimeout(() => {
        navigation.push("annotate-pdf");
      }, SIMULATEDUPLOADTIME * 5);
    }
  };

  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      {/* My Background patterns */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="dot-pattern absolute inset-0 opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 relative">
              {title}
              {showAIBadge && (
                <span className="ml-2 inline-flex absolute top-0 -right-10 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 animate-pulse-soft">
                  + AI
                </span>
              )}
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">{subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <FileUploader onFileSelect={handleFileSelect} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
