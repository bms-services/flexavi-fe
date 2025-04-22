
import React, { useState, useEffect } from "react";
import { DriveFile } from "@/types/drive";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileIcon } from "./FileIcon";
import { useDrive } from "@/contexts/DriveContext";
import { cn } from "@/lib/utils";

interface MoveFileDialogProps {
  open: boolean;
  onClose: () => void;
  onMove: (newParentId: string | null) => void;
  fileToMove?: DriveFile;
}

export const MoveFileDialog: React.FC<MoveFileDialogProps> = ({
  open,
  onClose,
  onMove,
  fileToMove,
}) => {
  const { files } = useDrive();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setCurrentFolderId(null);
      setSelectedFolderId(null);
    }
  }, [open]);

  // Get all folders, excluding the file to move and its children
  const getAllFolders = () => {
    // Get all child folder IDs to prevent circular references
    const getChildFolderIds = (parentId: string): string[] => {
      const directChildren = files.filter(file => file.parentId === parentId && file.type === "folder");
      const childIds = directChildren.map(child => child.id);
      
      directChildren.forEach(child => {
        childIds.push(...getChildFolderIds(child.id));
      });
      
      return childIds;
    };
    
    const excludedIds = fileToMove ? [fileToMove.id, ...getChildFolderIds(fileToMove.id)] : [];
    
    return files.filter(file => 
      file.type === "folder" && 
      !excludedIds.includes(file.id) &&
      file.parentId === currentFolderId
    );
  };

  const folders = getAllFolders();

  const handleMove = () => {
    onMove(selectedFolderId);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Verplaatsen naar</DialogTitle>
        </DialogHeader>
        
        <div className="min-h-[250px] max-h-[400px] overflow-y-auto border rounded-md p-2">
          <div className="mb-4">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 w-full justify-start"
              onClick={() => setCurrentFolderId(null)}
            >
              <FileIcon type="folder" className="h-5 w-5" />
              <span>Mijn Drive</span>
            </Button>
            
            <div className="ml-6 space-y-1 mt-2">
              {folders.map(folder => (
                <div key={folder.id} className="flex items-center">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 w-full justify-start"
                    onClick={() => setCurrentFolderId(folder.id)}
                  >
                    <FileIcon type="folder" className="h-5 w-5" />
                    <span>{folder.name}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <Button 
            variant={selectedFolderId === null ? "secondary" : "outline"}
            onClick={() => setSelectedFolderId(null)}
            className={cn(
              "flex flex-col items-center p-3 h-auto",
              selectedFolderId === null ? "border-2 border-blue-500" : ""
            )}
          >
            <FileIcon type="folder" className="h-8 w-8 mb-1" />
            <span className="text-xs">Mijn Drive</span>
          </Button>
          
          {folders.map(folder => (
            <Button 
              key={folder.id}
              variant={selectedFolderId === folder.id ? "secondary" : "outline"}
              onClick={() => setSelectedFolderId(folder.id)}
              className={cn(
                "flex flex-col items-center p-3 h-auto",
                selectedFolderId === folder.id ? "border-2 border-blue-500" : ""
              )}
            >
              <FileIcon type="folder" className="h-8 w-8 mb-1" />
              <span className="text-xs truncate w-full">{folder.name}</span>
            </Button>
          ))}
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuleren
          </Button>
          <Button type="button" onClick={handleMove}>
            Verplaatsen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
