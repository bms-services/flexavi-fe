
import React, { createContext, useState, useContext, useEffect } from "react";
import { DriveFile, FileType } from "@/types/drive";
import { 
  mockDriveFiles, 
  createNewDocument, 
  createNewSpreadsheet, 
  createNewFolder 
} from "@/data/mockDriveFiles";

interface DriveContextType {
  files: DriveFile[];
  currentDirectory: string | null;
  breadcrumbs: { id: string | null; name: string }[];
  navigateToDirectory: (directoryId: string | null) => void;
  navigateUp: () => void;
  createFile: (name: string, type: FileType) => DriveFile;
  getFile: (id: string) => DriveFile | undefined;
  updateFile: (file: DriveFile) => void;
  deleteFile: (id: string) => void;
  renameFile: (id: string, newName: string) => void;
  moveFile: (id: string, newParentId: string | null) => void;
  getFilesByParentId: (parentId: string | null) => DriveFile[];
  searchFiles: (query: string) => DriveFile[];
  starFile: (id: string, starred: boolean) => void;
}

const DriveContext = createContext<DriveContextType | undefined>(undefined);

export const DriveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<DriveFile[]>(mockDriveFiles);
  const [currentDirectory, setCurrentDirectory] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string | null; name: string }[]>([
    { id: null, name: "Mijn Drive" }
  ]);

  // Navigate to a directory
  const navigateToDirectory = (directoryId: string | null) => {
    setCurrentDirectory(directoryId);
    
    // Update breadcrumbs
    if (directoryId === null) {
      setBreadcrumbs([{ id: null, name: "Mijn Drive" }]);
    } else {
      const newBreadcrumbs = [{ id: null, name: "Mijn Drive" }];
      let currentId: string | null = directoryId;
      
      // Build the breadcrumb path
      while (currentId !== null) {
        const directory = files.find(file => file.id === currentId);
        if (directory) {
          newBreadcrumbs.unshift({ id: directory.id, name: directory.name });
          currentId = directory.parentId;
        } else {
          break;
        }
      }
      
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  // Navigate up one directory
  const navigateUp = () => {
    if (currentDirectory === null) return;
    
    const currentFolder = files.find(file => file.id === currentDirectory);
    if (currentFolder) {
      navigateToDirectory(currentFolder.parentId);
    }
  };

  // Create a new file
  const createFile = (name: string, type: FileType): DriveFile => {
    let newFile: DriveFile;
    
    switch (type) {
      case "document":
        newFile = createNewDocument(name, currentDirectory);
        break;
      case "spreadsheet":
        newFile = createNewSpreadsheet(name, currentDirectory);
        break;
      case "folder":
        newFile = createNewFolder(name, currentDirectory);
        break;
      default:
        throw new Error(`Unknown file type: ${type}`);
    }
    
    setFiles(prevFiles => [...prevFiles, newFile]);
    return newFile;
  };

  // Get a file by ID
  const getFile = (id: string): DriveFile | undefined => {
    return files.find(file => file.id === id);
  };

  // Update a file
  const updateFile = (updatedFile: DriveFile) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === updatedFile.id 
          ? { ...updatedFile, updatedAt: new Date().toISOString() } 
          : file
      )
    );
  };

  // Delete a file
  const deleteFile = (id: string) => {
    // Get all child files recursively
    const getChildIds = (parentId: string): string[] => {
      const directChildren = files.filter(file => file.parentId === parentId);
      const childIds = directChildren.map(child => child.id);
      
      directChildren.forEach(child => {
        if (child.type === "folder") {
          childIds.push(...getChildIds(child.id));
        }
      });
      
      return childIds;
    };
    
    const idsToDelete = [id, ...getChildIds(id)];
    setFiles(prevFiles => prevFiles.filter(file => !idsToDelete.includes(file.id)));
    
    // Navigate to parent if current directory is deleted
    if (currentDirectory && idsToDelete.includes(currentDirectory)) {
      const currentFile = files.find(file => file.id === currentDirectory);
      if (currentFile) {
        navigateToDirectory(currentFile.parentId);
      }
    }
  };

  // Rename a file
  const renameFile = (id: string, newName: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === id 
          ? { ...file, name: newName, updatedAt: new Date().toISOString() } 
          : file
      )
    );
  };

  // Move a file to a new directory
  const moveFile = (id: string, newParentId: string | null) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === id 
          ? { ...file, parentId: newParentId, updatedAt: new Date().toISOString() } 
          : file
      )
    );
  };

  // Get files in the current directory
  const getFilesByParentId = (parentId: string | null) => {
    return files.filter(file => file.parentId === parentId);
  };

  // Search files by name
  const searchFiles = (query: string) => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return files.filter(file => file.name.toLowerCase().includes(lowerQuery));
  };

  // Star/unstar a file
  const starFile = (id: string, starred: boolean) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === id 
          ? { ...file, starred, updatedAt: new Date().toISOString() } 
          : file
      )
    );
  };

  return (
    <DriveContext.Provider
      value={{
        files,
        currentDirectory,
        breadcrumbs,
        navigateToDirectory,
        navigateUp,
        createFile,
        getFile,
        updateFile,
        deleteFile,
        renameFile,
        moveFile,
        getFilesByParentId,
        searchFiles,
        starFile,
      }}
    >
      {children}
    </DriveContext.Provider>
  );
};

export const useDrive = () => {
  const context = useContext(DriveContext);
  if (context === undefined) {
    throw new Error("useDrive must be used within a DriveProvider");
  }
  return context;
};
