"use client"

import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const navigate = useRouter();
  return (
    <Button
      onClick={() => navigate.back()}
      variant="ghost"
      size="icon"
      className="rounded-full"
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="sr-only">Back</span>
    </Button>
  );
};

export default BackButton;
