
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { DriveFile } from "@/types/drive";
import { FileIcon } from "./FileIcon";
import { useDrive } from "@/contexts/DriveContext";
import { useNavigate } from "react-router-dom";

export const SearchFiles: React.FC = () => {
  const { searchFiles } = useDrive();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DriveFile[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const foundFiles = searchFiles(query);
      setResults(foundFiles);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query, searchFiles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  const handleFileClick = (file: DriveFile) => {
    setShowResults(false);
    
    if (file.type === "folder") {
      navigate(`/drive?folder=${file.id}`);
    } else if (file.type === "document") {
      navigate(`/drive/docs/${file.id}`);
    } else if (file.type === "spreadsheet") {
      navigate(`/drive/sheets/${file.id}`);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Zoeken in Drive..."
          className="pl-8 pr-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim() && results.length > 0) {
              setShowResults(true);
            }
          }}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-0"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-80 overflow-auto rounded-md border bg-white shadow-lg">
          <div className="p-2">
            <h3 className="text-xs font-semibold text-gray-500 mb-2">Zoekresultaten</h3>
            <div className="space-y-1">
              {results.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleFileClick(file)}
                >
                  <FileIcon type={file.type} starred={file.starred} />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {file.type === "document" 
                        ? "Document" 
                        : file.type === "spreadsheet" 
                          ? "Rekenblad" 
                          : "Map"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
