import { NextResponse } from "next/server";

// export async function GET() {
//   // Redirect to the CDN URL
//   return NextResponse.redirect(
//     "https://unpkg.com/pdfjs-dist@2.0.489/build/pdf.worker.min.js"
//   );
// }

// Alternatively, if you want to serve from your own endpoint:
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
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
      },
    });
  } catch (error) {
    console.error("Error serving PDF worker:", error);
    return new NextResponse("Error serving PDF worker", { status: 500 });
  }
}
