
export const SIMULATEDUPLOADTIME = 2000


import {
    Zap,
    FileText,
    Users,
    Shield,
    Clock,
    ShieldCheck,
  } from "lucide-react";

export const features:Feature[] = [
    {
      title: "Annotate PDF for Free",
      description:
        "Annotate PDF for free by uploading a PDF file, select the region for color and mark the content at will.",
      icon: Zap,
    },
    {
      title: "Easy and User-friendly",
      description:
        "The online PDF editor can work without any effort. When it comes to smoothing interface, you can easily touch and slide.",
      icon: Users,
    },
    {
      title: "Support All Systems",
      description:
        "You can edit and annotate PDF on Windows, Mac, Android as well as iOS devices.",
      icon: FileText,
    },
    {
      title: "Quick PDF Annotation",
      description:
        "It only takes a few seconds to complete PDF annotation, and the function is cloud based.",
      icon: Clock,
    },
    {
      title: "Safely Annotate Files",
      description:
        "All uploaded files are processed automatically by our system. They are 100% secure and no one can access to them.",
      icon: Shield,
    },
    {
      title: "No Ads & No Virus",
      description: "The website ensures great user experience so it doesn't add any annoying ads to distract your work.",
      icon: ShieldCheck,
    }
  ];



  export const steps:Step[] = [
    {
      number: 1,
      title: "Upload files to the online Tool.",
    },
    {
      number: 2,
      title: "Add annotation to your PDF files.",
    },
    {
      number: 3,
      title: "Click 'Download' to save the files.",
    },
  ];



  export const resources:Resource[] = [
    {
      title: "Add a Tiled Watermark to a PDF File for Free",
      imageUrl:
        "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=2001",
      link: "#",
    },
    {
      title: "How to Remove Watermark from PDF",
      imageUrl:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070",
      link: "#",
    },
    {
      title: "How to Insert Picture into PDF Online",
      imageUrl:
        "https://images.unsplash.com/photo-1499083097717-a156f85f0516?q=80&w=2031",
      link: "#",
    },
  ];