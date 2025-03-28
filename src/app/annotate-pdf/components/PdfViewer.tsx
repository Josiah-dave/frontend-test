'use client'
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Loader2 } from "lucide-react";
import { AnnotationTool } from "./AnnotationToolbar";
import SignatureCanvas from "./SignatureCanvas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Set the worker source for pdfjs with https to avoid CORS issues
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
  currentTool: AnnotationTool;
  currentColor: string;
  onPageChange: (page: number, totalPages: number) => void;
}

export interface Annotation {
  id: string;
  type: "highlight" | "underline" | "comment" | "signature";
  pageNumber: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  content?: string;
  signatureData?: string;
}

// Using forwardRef to properly handle the ref from the parent component
const PDFViewer = forwardRef<{ clearAnnotations: () => void }, PDFViewerProps>(
  ({ file, currentTool, currentColor, onPageChange }, ref) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageWidth, setPageWidth] = useState<number>(0);
    const [pageHeight, setPageHeight] = useState<number>(0);
    const [scale, setScale] = useState<number>(1.0);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [showSignatureCanvas, setShowSignatureCanvas] = useState<boolean>(false);
    const [signaturePosition, setSignaturePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>("");
    const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);

    // Exposing the clearAnnotations method to the parent component through the ref
    useImperativeHandle(ref, () => ({
      clearAnnotations: () => {
        setAnnotations([]);
        toast.success("All annotations cleared");
      }
    }));

    useEffect(() => {
      if (numPages !== null) {
        onPageChange(pageNumber, numPages);
      }
    }, [pageNumber, numPages, onPageChange]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setPageNumber(1);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      if (!currentTool || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (currentTool === "signature") {
        setSignaturePosition({ x, y });
        setShowSignatureCanvas(true);
        return;
      }

      setIsDrawing(true);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
      if (!currentTool || !isDrawing || !containerRef.current) {
        setIsDrawing(false);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (currentTool === "highlight" || currentTool === "underline") {
        // Creating a simple annotation for now - in a real app this would
        // need to be more sophisticated to actually map to text positions
        const newAnnotation: Annotation = {
          id: `annotation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: currentTool,
          pageNumber,
          x: Math.min(x, signaturePosition.x),
          y: Math.min(y, signaturePosition.y),
          width: Math.abs(x - signaturePosition.x),
          height: currentTool === "highlight" ? 20 : 2,
          color: currentColor,
        };

        setAnnotations([...annotations, newAnnotation]);
        toast.success(`${currentTool === "highlight" ? "Highlight" : "Underline"} added`);
      } else if (currentTool === "comment") {
        const commentAnnotation: Annotation = {
          id: `annotation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: "comment",
          pageNumber,
          x,
          y,
          color: "#2196F3",
          content: "Add your comment here",
        };

        setAnnotations([...annotations, commentAnnotation]);
        setSelectedAnnotation(commentAnnotation.id);
        toast.success("Comment added");
      }

      setIsDrawing(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDrawing || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSignaturePosition({ x, y });
    };

    const handleSignatureSave = (signatureData: string) => {
      if (!signatureData) {
        setShowSignatureCanvas(false);
        return;
      }

      const newSignature: Annotation = {
        id: `signature-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "signature",
        pageNumber,
        x: signaturePosition.x,
        y: signaturePosition.y,
        signatureData,
      };

      setAnnotations([...annotations, newSignature]);
      setShowSignatureCanvas(false);
      toast.success("Signature added");
    };

    const renderAnnotations = () => {
      return annotations
        .filter((annotation) => annotation.pageNumber === pageNumber)
        .map((annotation) => {
          switch (annotation.type) {
            case "highlight":
              return (
                <div
                  key={annotation.id}
                  className="annotation annotation-highlight"
                  style={{
                    left: `${annotation.x}px`,
                    top: `${annotation.y}px`,
                    width: `${annotation.width}px`,
                    height: `${annotation.height}px`,
                    backgroundColor: annotation.color,
                  }}
                />
              );
            case "underline":
              return (
                <div
                  key={annotation.id}
                  className="annotation annotation-underline"
                  style={{
                    left: `${annotation.x}px`,
                    top: `${annotation.y + 18}px`,
                    width: `${annotation.width}px`,
                    backgroundColor: annotation.color,
                  }}
                />
              );
            case "comment":
              return (
                <div
                  key={annotation.id}
                  className="annotation annotation-comment"
                  style={{
                    left: `${annotation.x}px`,
                    top: `${annotation.y}px`,
                    backgroundColor: annotation.color,
                  }}
                  onClick={() => setSelectedAnnotation(annotation.id)}
                >
                  <span className="text-white text-xs">?</span>
                </div>
              );
            case "signature":
              return (
                <img
                  key={annotation.id}
                  className="annotation"
                  src={annotation.signatureData}
                  alt="Signature"
                  style={{
                    left: `${annotation.x}px`,
                    top: `${annotation.y}px`,
                    maxWidth: "200px",
                  }}
                />
              );
            default:
              return null;
          }
        });
    };

    const handleCommentChange = (id: string, content: string) => {
      setAnnotations(
        annotations.map((annotation) =>
          annotation.id === id ? { ...annotation, content } : annotation
        )
      );
    };

    return (
      <div className="flex flex-col h-full">
        {file ? (
          <div className="flex-1 relative overflow-hidden">
            <div
              ref={containerRef}
              className="pdf-container h-full"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-lg">Loading PDF...</span>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  onLoadSuccess={(page) => {
                    setPageWidth(page.width * scale);
                    setPageHeight(page.height * scale);
                  }}
                  className="pdf-page"
                  renderMode="canvas"
                />
                {renderAnnotations()}
              </Document>
            </div>

            {showSignatureCanvas && (
              <SignatureCanvas
                onSave={handleSignatureSave}
                onCancel={() => setShowSignatureCanvas(false)}
              />
            )}

            {selectedAnnotation && (
              <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-64">
                <h3 className="font-semibold mb-2">Comment</h3>
                <textarea
                  className="w-full border rounded p-2"
                  value={
                    annotations.find((a) => a.id === selectedAnnotation)?.content || ""
                  }
                  onChange={(e) =>
                    handleCommentChange(selectedAnnotation, e.target.value)
                  }
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAnnotation(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">No document loaded</p>
          </div>
        )}
      </div>
    );
  }
);

PDFViewer.displayName = "PDFViewer";

export default PDFViewer;
