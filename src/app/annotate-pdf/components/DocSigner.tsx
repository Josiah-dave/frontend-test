
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import FileUpload from './FileUpload';
import PdfRenderer from './PdfRenderer';
import AnnotationTools, { Tool } from './AnnotationTools';
import SignaturePad from './SignaturePad';
import CommentDialog from './CommentDialog';
import AnnotationDisplay from '@/components/AnnotationToolbar';
import { Annotation, AnnotationType, Position, initPdfFromFile, exportPdf } from '@/lib/pdfService';
import PdfViewer from './PdfViewer';

const DocSigner: React.FC = () => {
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [activeColor, setActiveColor] = useState<string>('#FFC107');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [pendingPosition, setPendingPosition] = useState<Position | null>(null);
  const [editingAnnotation, setEditingAnnotation] = useState<Annotation | null>(null);
  const { toast } = useToast();

  // Handle file upload
  const handleFileSelected = async (file: File) => {
    try {
      const data = await initPdfFromFile(file);
      setPdfData(data);
      setFileName(file.name);
      setAnnotations([]);
      toast({
        title: "Document loaded",
        description: `${file.name} has been successfully loaded.`,
      });
    } catch (error) {
      console.error('Error loading PDF:', error);
      toast({
        title: "Error loading document",
        description: "Failed to load the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle click on the PDF
  const handlePdfClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pdfData || activeTool === 'select') return;
    
    // Get the position relative to the container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const position: Position = {
      x,
      y,
      page: 1, // In a real implementation, we would get the current page number
      width: 100, // Default width for highlights and underlines
      height: 20, // Default height for highlights
    };
    
    // Handle different types of annotations
    switch (activeTool) {
      case 'highlight':
      case 'underline':
        addAnnotation(activeTool, position, activeColor);
        break;
      case 'comment':
        setPendingPosition(position);
        setIsCommentDialogOpen(true);
        break;
      case 'signature':
        setPendingPosition(position);
        setIsSignaturePadOpen(true);
        break;
    }
  };

  // Add a new annotation
  const addAnnotation = (
    type: AnnotationType, 
    position: Position, 
    color?: string, 
    content?: string
  ) => {
    const newAnnotation: Annotation = {
      id: uuidv4(),
      type,
      position,
      color,
      content,
      createdAt: new Date(),
    };
    
    setAnnotations((prev) => [...prev, newAnnotation]);
    
    let description;
    switch (type) {
      case 'highlight':
        description = 'Text highlighted';
        break;
      case 'underline':
        description = 'Text underlined';
        break;
      case 'comment':
        description = 'Comment added';
        break;
      case 'signature':
        description = 'Signature added';
        break;
    }
    
    toast({
      title: "Annotation added",
      description,
    });
  };

  // Remove annotation
  const removeAnnotation = (id: string) => {
    setAnnotations((prev) => prev.filter((annotation) => annotation.id !== id));
    toast({
      title: "Annotation removed",
      description: "The annotation has been removed.",
    });
  };

  // Edit annotation
  const editAnnotation = (annotation: Annotation) => {
    setEditingAnnotation(annotation);
    if (annotation.type === 'comment') {
      setIsCommentDialogOpen(true);
    }
  };

  // Handle signature save
  const handleSignatureSave = (signatureData: string) => {
    if (pendingPosition) {
      addAnnotation('signature', pendingPosition, undefined, signatureData);
      setPendingPosition(null);
      setIsSignaturePadOpen(false);
    }
  };

  // Handle comment save
  const handleCommentSave = (comment: string) => {
    if (editingAnnotation) {
      // Update existing comment
      setAnnotations((prev) =>
        prev.map((annotation) =>
          annotation.id === editingAnnotation.id
            ? { ...annotation, content: comment }
            : annotation
        )
      );
      setEditingAnnotation(null);
    } else if (pendingPosition) {
      // Add new comment
      addAnnotation('comment', pendingPosition, undefined, comment);
      setPendingPosition(null);
    }
    setIsCommentDialogOpen(false);
  };

  // Export PDF with annotations
  const handleExportPdf = async () => {
    if (!pdfData) return;
    
    try {
      toast({
        title: "Exporting PDF",
        description: "Please wait while we prepare your document...",
      });
      
      const exportedPdf = await exportPdf(pdfData, annotations);
      
      // Create download link
      const url = URL.createObjectURL(exportedPdf);
      const link = document.createElement('a');
      link.href = url;
      link.download = `annotated_${fileName || 'document.pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Your annotated document has been downloaded.",
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your document.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!pdfData ? (
        <FileUpload onFileSelected={handleFileSelected} />
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:order-1">
            <AnnotationTools
              activeTool={activeTool}
              activeColor={activeColor}
              onSelectTool={setActiveTool}
              onSelectColor={setActiveColor}
              onExport={handleExportPdf}
            />
          </div>
          
          <div className="flex-1 md:order-2" onClick={handlePdfClick}>
            <PdfViewer pdfData={pdfData} className="h-[80vh]">
              {annotations.map((annotation) => (
                <AnnotationDisplay
                  key={annotation.id}
                  annotation={annotation}
                  onRemove={removeAnnotation}
                  onEdit={editAnnotation}
                />
              ))}
            </PdfViewer>
          </div>
        </div>
      )}
      
      <SignaturePad
        isOpen={isSignaturePadOpen}
        onClose={() => setIsSignaturePadOpen(false)}
        onSave={handleSignatureSave}
      />
      
      <CommentDialog
        isOpen={isCommentDialogOpen}
        onClose={() => {
          setIsCommentDialogOpen(false);
          setEditingAnnotation(null);
        }}
        onSave={handleCommentSave}
        initialComment={editingAnnotation?.content || ''}
      />
    </div>
  );
};

export default DocSigner;
