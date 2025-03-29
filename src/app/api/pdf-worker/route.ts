import { NextResponse } from "next/server";

// proxifying the worker CDN
export async function GET() {
  try {
    const workerUrl =
      "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
    const response = await fetch(workerUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch worker file");
    }

    const workerContent = await response.text();

    return new NextResponse(workerContent, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=31536000", 
      },
    });
  } catch (error) {
    console.error("Error serving PDF worker:", error);
    return new NextResponse("Error serving PDF worker", { status: 500 });
  }
}
