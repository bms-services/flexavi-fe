
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DriveProvider, useDrive } from "@/contexts/DriveContext";
import { DocumentEditor } from "@/components/drive/docs/DocumentEditor";
import { ChevronLeft, Save, Star } from "lucide-react";
import { toast } from "sonner";
import { DocumentContent } from "@/types/drive";

const DocsEditorContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewDocument = id === "new";
  
  const { 
    getFile, 
    createFile,
    updateFile,
    starFile
  } = useDrive();

  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("<p>Begin hier met typen...</p>");
  const [initialLoad, setInitialLoad] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveInterval, setAutoSaveInterval] = useState<NodeJS.Timeout | null>(null);

  // Load document
  useEffect(() => {
    if (isNewDocument) {
      setFileName("Nieuw document");
      setContent("<p>Begin hier met typen...</p>");
    } else if (id) {
      const document = getFile(id);
      if (document && document.type === "document") {
        setFileName(document.name);
        if (document.content && (document.content as DocumentContent).text) {
          setContent((document.content as DocumentContent).text);
        }
      } else {
        // Document not found
        navigate("/drive");
        toast.error("Document niet gevonden");
      }
    }
    setInitialLoad(false);
  }, [id, getFile, navigate, isNewDocument]);

  // Set up auto-save
  useEffect(() => {
    // Don't auto-save during initial load
    if (initialLoad) return;

    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
    }

    const interval = setInterval(() => {
      handleSave(false);
    }, 30000); // Auto-save every 30 seconds

    setAutoSaveInterval(interval);

    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [fileName, content, initialLoad]);

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  // Handle save
  const handleSave = (showToast = true) => {
    if (isNewDocument) {
      const newDocument = createFile(fileName, "document");
      updateFile({
        ...newDocument,
        content: {
          text: content,
        },
      });
      navigate(`/drive/docs/${newDocument.id}`, { replace: true });
      if (showToast) toast.success("Document aangemaakt");
    } else if (id) {
      const document = getFile(id);
      if (document) {
        updateFile({
          ...document,
          name: fileName,
          content: {
            text: content,
            ...(document.content as DocumentContent),
          },
        });
        if (showToast) toast.success("Document opgeslagen");
      }
    }
    setLastSaved(new Date());
  };

  // Handle star toggle
  const handleToggleStar = () => {
    if (!isNewDocument && id) {
      const document = getFile(id);
      if (document) {
        starFile(document.id, !document.starred);
        toast.success(document.starred ? "Verwijderd uit favorieten" : "Toegevoegd aan favorieten");
      }
    }
  };

  // Get document for star status
  const currentDocument = !isNewDocument && id ? getFile(id) : null;

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate("/drive")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="max-w-xs font-medium"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {lastSaved && (
              <span className="text-xs text-muted-foreground">
                Laatst opgeslagen: {lastSaved.toLocaleTimeString()}
              </span>
            )}
            
            {!isNewDocument && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleStar}
                className={currentDocument?.starred ? "text-yellow-400" : ""}
              >
                <Star className="h-4 w-4" />
              </Button>
            )}
            
            <Button onClick={() => handleSave()}>
              <Save className="mr-2 h-4 w-4" />
              Opslaan
            </Button>
          </div>
        </div>
        
        <DocumentEditor 
          content={content} 
          onChange={handleContentChange}
          autoFocus={true}
        />
      </div>
    </Layout>
  );
};

const DocsEditor: React.FC = () => {
  return (
    <DriveProvider>
      <DocsEditorContent />
    </DriveProvider>
  );
};

export default DocsEditor;
