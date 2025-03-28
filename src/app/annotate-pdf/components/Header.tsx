import React from "react";
import { Download, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";


interface HeaderProps {
  onExport: () => void;
}


const Header: React.FC<HeaderProps> = ({ onExport }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4 container mx-auto md:px-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <span className="text-sm font-medium">
            Language Assessment Results
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button    onClick={onExport} variant="ghost" size="sm" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
          >
            <Download className="h-5 w-5" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Maximize className="h-5 w-5" />
            <span className="sr-only">Fullscreen</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 ml-2">
            Log in/Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
