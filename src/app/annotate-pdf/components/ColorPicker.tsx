import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onColorChange }) => {
  const colors = [
    "#FFEB3B",
    "#4CAF50", 
    "#2196F3", 
    "#F44336", 
    "#9C27B0", 
    "#FF9800", 
    "#607D8B", 
    "#000000", 
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: currentColor }}>
            <Palette className="h-5 w-5 text-white mix-blend-difference" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-12 h-12 rounded-md transition-all hover:scale-110 ${
                currentColor === color ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
