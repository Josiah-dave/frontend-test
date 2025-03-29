# PDF Annotation Tool

## Overview
The **PDF Annotation Tool** is a web application built using Next.js that allows users to view and annotate PDF documents. It leverages `@react-pdf-viewer/core` for rendering PDFs and includes various UI enhancements for a smooth user experience.

---

## Setup & Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18+ recommended)
- **npm** or **yarn**

### Steps to Run the Project
1. **Clone the repository**:
   ```sh
   git clone https://github.com/Josiah-dave/frontend-test.git
   cd pdf-annotation-tool
   ```
2. **Install dependencies**:
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Run the development server**:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open `http://localhost:3000` in your browser to view the application.

5. **Build for production**:
   ```sh
   npm run build
   npm start
   ```

---

## Dependencies & Tools Used
### Core Libraries
- **Next.js** (15.2.4) – Framework for server-side rendering and static site generation
- **React** (19.0.0) – Frontend library for building UI components
- **Tailwind CSS** – For styling the application
- **Zustand** – State management
- **React Hook Form** – Form handling and validation
- **PDF.js (`pdfjs-dist`)** – PDF rendering engine
- **@react-pdf-viewer/core** – PDF viewing and annotation UI
- **react-pdf** – Alternative PDF rendering library

### Additional Tools
- **JSPDF** – PDF manipulation library
- **Lucide-react** – Icon set
- **React Signature Canvas** – Signature input for PDFs
- **Radix UI** – Accessible UI components

---

## Challenges Faced & Solutions
### 1. **PDF.js Worker Version Mismatch**
**Issue:**
```
The API version "2.16.105" does not match the Worker version "3.10.111".
```
**Solution:**
- Downgraded `pdfjs-dist` to match the worker version required by `@react-pdf-viewer/core`.
- Explicitly set the worker source:
  ```js
  import { pdfjs } from "react-pdf";
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;
  ```

### 2. **PDF Re-rendering on Tool Click**
**Issue:** The PDF viewer re-renders every time a tool (e.g comment, highlight) is clicked.

**Possible Causes & Fixes:**
- Ensured the document state is memoized using `useMemo()`.
- Used Zustand for state management to persist tool settings without forcing re-renders.
- Investigating further optimizations using React `useCallback()`.

### 3. **CORS Issues with External PDF Workers**
**Issue:** Some PDF.js worker URLs were blocked due to CORS policies.

**Solution:**
- Used the officially recommended worker CDN: `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`
- Considered proxifying worker file for full control.

---

## Future Enhancements
If given more time, the following features would be added:
1. **Offline PDF Support** – Allow users to upload and annotate PDFs without an internet connection.
2. **Cloud Storage Integration** – Save annotated PDFs to Google Drive or Dropbox.
4. **Advanced Annotations** – Add text highlighting, sticky notes, and drawing tools.
5. **Export Options** – Support exporting PDFs with embedded annotations.

---

## Contribution Guidelines
If you’d like to contribute:
- Fork the repository
- Create a feature branch
- Submit a pull request with a detailed description

---
This project has been a challenging yet rewarding experience. It has taught me the importance of version control,
dependency management, and debugging in a real-world application. I hope this documentation serves as a valuable resource
for anyone looking to build a similar PDF viewer application. Thank you for your time, and I look
forward to your feedback!

