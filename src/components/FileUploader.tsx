"use client";

import React, { useState, useRef } from "react";
import { FileIcon, Upload } from "lucide-react";
import UploadLoader from "./UploadLoader";
import { SIMULATEDUPLOADTIME } from "@/constants/constants";

interface FileUploaderProps {
  onFileSelect?: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = ".pdf",
  multiple = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(10);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setIsLoading(true);
    setProgress(0);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (onFileSelect) {
        onFileSelect(e.dataTransfer.files);
      }
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, SIMULATEDUPLOADTIME);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true);
      setProgress(0);
      if (onFileSelect) {
        onFileSelect(e.target.files);
      }

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, SIMULATEDUPLOADTIME);
    }
  };

  const handleSelectFilesClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative min-h-[5rem] w-full">
      {isLoading && (
        <div
          className="absolute top-0 left-1 h-1 rounded-xl  bg-blue-500"
          style={{ width: `${progress - 2}%` }}
        />
      )}
      <div
        className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer bg-white ${
          isDragging
            ? "border-pdf-blue bg-blue-50"
            : "border-gray-200 hover:border-pdf-blue hover:bg-blue-50/30"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleSelectFilesClick}
      >
        {isLoading ? (
          <UploadLoader />
        ) : (
          <>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept={accept}
              multiple={multiple}
              onChange={handleFileSelect}
            />

            <div className="mb-4 text-pdf-blue">
              <FileIcon
                size={56}
                className={`transition-transform ${
                  isDragging ? "scale-110" : "scale-100"
                }`}
              />
            </div>

            <button
              className="bg-pdf-blue text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition-all mb-4 flex items-center gap-2"
              disabled={isLoading}
            >
              <>
                <Upload size={18} />
                Select Files
              </>
            </button>

            <p className="text-sm text-gray-500">or drop files here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
