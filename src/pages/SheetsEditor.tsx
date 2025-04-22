
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DriveProvider, useDrive } from "@/contexts/DriveContext";
import { SpreadsheetEditor } from "@/components/drive/sheets/SpreadsheetEditor";
import { ChevronLeft, Save, Star } from "lucide-react";
import { toast } from "sonner";
import { SpreadsheetContent } from "@/types/drive";

const SheetsEditorContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewSpreadsheet = id === "new";
  
  const { 
    getFile, 
    createFile,
    updateFile,
    starFile
  } = useDrive();

  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState<SpreadsheetContent>({
    sheets: [
      {
        id: `sheet-tab-${Date.now()}`,
        name: "Blad 1",
        cells: {},
        columns: 10,
        rows: 20,
      }
    ],
    activeSheet: 0,
  });
  const [initialLoad, setInitialLoad] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveInterval, setAutoSaveInterval] = useState<NodeJS.Timeout | null>(null);

  // Load spreadsheet
  useEffect(() => {
    if (isNewSpreadsheet) {
      setFileName("Nieuw rekenblad");
      setContent({
        sheets: [
          {
            id: `sheet-tab-${Date.now()}`,
            name: "Blad 1",
            cells: {},
            columns: 10,
            rows: 20,
          }
        ],
        activeSheet: 0,
      });
    } else if (id) {
      const spreadsheet = getFile(id);
      if (spreadsheet && spreadsheet.type === "spreadsheet") {
        setFileName(spreadsheet.name);
        if (spreadsheet.content) {
          setContent(spreadsheet.content as SpreadsheetContent);
        }
      } else {
        // Spreadsheet not found
        navigate("/drive");
        toast.error("Rekenblad niet gevonden");
      }
    }
    setInitialLoad(false);
  }, [id, getFile, navigate, isNewSpreadsheet]);

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
  const handleContentChange = (newContent: SpreadsheetContent) => {
    setContent(newContent);
  };

  // Handle save
  const handleSave = (showToast = true) => {
    if (isNewSpreadsheet) {
      const newSpreadsheet = createFile(fileName, "spreadsheet");
      updateFile({
        ...newSpreadsheet,
        content: content,
      });
      navigate(`/drive/sheets/${newSpreadsheet.id}`, { replace: true });
      if (showToast) toast.success("Rekenblad aangemaakt");
    } else if (id) {
      const spreadsheet = getFile(id);
      if (spreadsheet) {
        updateFile({
          ...spreadsheet,
          name: fileName,
          content: content,
        });
        if (showToast) toast.success("Rekenblad opgeslagen");
      }
    }
    setLastSaved(new Date());
  };

  // Handle star toggle
  const handleToggleStar = () => {
    if (!isNewSpreadsheet && id) {
      const spreadsheet = getFile(id);
      if (spreadsheet) {
        starFile(spreadsheet.id, !spreadsheet.starred);
        toast.success(spreadsheet.starred ? "Verwijderd uit favorieten" : "Toegevoegd aan favorieten");
      }
    }
  };

  // Get spreadsheet for star status
  const currentSpreadsheet = !isNewSpreadsheet && id ? getFile(id) : null;

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
            
            {!isNewSpreadsheet && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleStar}
                className={currentSpreadsheet?.starred ? "text-yellow-400" : ""}
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
        
        <SpreadsheetEditor 
          content={content} 
          onChange={handleContentChange}
        />
      </div>
    </Layout>
  );
};

const SheetsEditor: React.FC = () => {
  return (
    <DriveProvider>
      <SheetsEditorContent />
    </DriveProvider>
  );
};

export default SheetsEditor;
