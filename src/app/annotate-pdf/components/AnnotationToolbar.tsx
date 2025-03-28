import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Highlighter, 
  Underline, 
  MessageSquare, 
  Edit, 
  Hand, 
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import ColorPicker from "./ColorPicker";

export type AnnotationTool = "highlight" | "underline" | "comment" | "signature" | "pan" | null;

interface AnnotationToolbarProps {
  currentTool: AnnotationTool;
  setCurrentTool: (tool: AnnotationTool) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  onClearAnnotations: () => void;
  currentPage: number;
  totalPages: number;
  onChangePage: (newPage: number) => void;
}

const AnnotationToolbar: React.FC<AnnotationToolbarProps> = ({
  currentTool,
  setCurrentTool,
  currentColor,
  setCurrentColor,
  onClearAnnotations,
  currentPage,
  totalPages,
  onChangePage
}) => {
  const tools = [
    { name: "highlight", icon: Highlighter, tooltip: "Highlight Text", color: "tool-highlight" },
    { name: "underline", icon: Underline, tooltip: "Underline Text", color: "tool-underline" },
    { name: "comment", icon: MessageSquare, tooltip: "Add Comment", color: "tool-comment" },
    { name: "signature", icon: Edit, tooltip: "Add Signature", color: "tool-signature" },
    { name: "pan", icon: Hand, tooltip: "Pan Document", color: "" },
  ];

  const handleToolClick = (tool: AnnotationTool) => {
    setCurrentTool(currentTool === tool ? null : tool);
  };

  const isToolActive = (tool: AnnotationTool) => currentTool === tool;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex items-center justify-between">
      <div className="flex items-center space-x-1">
        <TooltipProvider>
          {tools.map((tool) => (
            <Tooltip key={tool.name}>
              <TooltipTrigger asChild>
                <Button
                  variant={isToolActive(tool.name as AnnotationTool) ? "default" : "ghost"}
                  size="icon"
                  onClick={() => handleToolClick(tool.name as AnnotationTool)}
                  className={`h-9 w-9 ${isToolActive(tool.name as AnnotationTool) ? "" : "text-gray-600"}`}
                >
                  <tool.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearAnnotations}
                className="h-9 w-9 text-gray-600"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear Annotations</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {(currentTool === "highlight" || currentTool === "underline") && (
          <ColorPicker currentColor={currentColor} onColorChange={setCurrentColor} />
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm text-gray-600">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-9 w-9"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AnnotationToolbar;
