"use client"
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface TopBarProps {
  message: string;
  ctaText: string;
  link: string;
}

const Navbar: React.FC<TopBarProps> = ({ message, ctaText, link }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="relative z-50">
          <div className="bg-indigo-700 text-white py-3 px-4 text-center animate-fade-in">
            <div className="container mx-auto flex items-center justify-center gap-1 md:gap-2">
              <p className="text-sm md:text-base">{message}</p>
              <a
                href={link}
                className="group inline-flex items-center text-sm md:text-base font-medium hover:underline ml-1"
              >
                {ctaText}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
