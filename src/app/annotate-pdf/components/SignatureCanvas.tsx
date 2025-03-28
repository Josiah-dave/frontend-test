'use client'
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SignatureCanvasProps {
  onSave: (signatureData: string) => void;
  onCancel: () => void;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ onSave, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "black";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL("image/png");
    onSave(signatureData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
        <div className="p-4 bg-gray-50 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Your Signature</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            className="signature-canvas w-full border border-gray-300 rounded"
          />
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={clearSignature}>
              Clear
            </Button>
            <div className="space-x-2">
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={saveSignature}>Save Signature</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureCanvas;