"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import Header from "./components/Header";
import AnnotationToolbar, {
  AnnotationTool,
} from "./components/AnnotationToolbar";
import PDFViewer, { Annotation } from "./components/PdfViewer";
import { PDFDocument } from "pdf-lib";
import { useFileStore } from "@/store/fileStore";
import { useRouter } from "next/navigation";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [currentTool, setCurrentTool] = useState<AnnotationTool>(null);
  const [currentColor, setCurrentColor] = useState<string>("#FFEB3B");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const pdfViewerRef = useRef<any>(null);

  const { data } = useFileStore();
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    if (!data) {
      router.push("/"); // Redirect if no file is selected
    } else {
      setFile(data);
      // handleFileSelect(data)
    }
  }, [data, router]);

  // const handleFileSelect = (selectedFile: File) => {
  //   setFile(selectedFile);
  // };

  const handlePageChange = (page: number, total: number) => {
    setCurrentPage(page);
    setTotalPages(total);
  };

  const handleChangePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleClearAnnotations = () => {
    if (pdfViewerRef.current) {
      pdfViewerRef.current.clearAnnotations();
    }
  };

  const handleExportPDF = async () => {
    if (!file) {
      toast.error("No document to export");
      return;
    }

    try {
      toast.info("Preparing PDF for export...");

      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `annotated-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onExport={handleExportPDF} />

      <main className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="flex flex-col h-full gap-4">
          <AnnotationToolbar
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            onClearAnnotations={handleClearAnnotations}
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />

          <div className="flex-1 overflow-hidden border border-gray-200 rounded-lg bg-white">
            <PDFViewer
              ref={pdfViewerRef}
              file={file}
              currentTool={currentTool}
              currentColor={currentColor}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
