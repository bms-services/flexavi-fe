
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon } from "@/components/drive/FileIcon";
import { FileListItem } from "@/components/drive/FileListItem";
import { FileGrid } from "@/components/drive/FileGrid";
import { Breadcrumb } from "@/components/drive/Breadcrumb";
import { SearchFiles } from "@/components/drive/SearchFiles";
import { CreateFileDialog } from "@/components/drive/CreateFileDialog";
import { RenameFileDialog } from "@/components/drive/RenameFileDialog";
import { DeleteFileDialog } from "@/components/drive/DeleteFileDialog";
import { MoveFileDialog } from "@/components/drive/MoveFileDialog";
import { useDrive, DriveProvider } from "@/contexts/DriveContext";
import { DriveFile, FileType } from "@/types/drive";
import { Plus, LayoutGrid, List, ChevronUp, Star } from "lucide-react";

const DriveContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DriveFile | undefined>(undefined);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const { 
    files, 
    currentDirectory, 
    breadcrumbs,
    navigateToDirectory, 
    navigateUp,
    createFile,
    getFilesByParentId,
    renameFile,
    deleteFile,
    moveFile,
    starFile,
  } = useDrive();

  // Parse folder ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const folderId = params.get("folder");
    if (folderId) {
      navigateToDirectory(folderId);
    }
  }, [location.search, navigateToDirectory]);

  // Get files for the current view
  const getDisplayFiles = () => {
    let displayFiles = getFilesByParentId(currentDirectory);
    
    if (activeTab === "starred") {
      displayFiles = files.filter(file => file.starred);
    }
    
    return displayFiles;
  };

  const displayFiles = getDisplayFiles();

  // Handle file opening
  const handleOpenFile = (file: DriveFile) => {
    if (file.type === "folder") {
      navigateToDirectory(file.id);
      // Update URL
      navigate(`/drive?folder=${file.id}`);
    } else if (file.type === "document") {
      navigate(`/drive/docs/${file.id}`);
    } else if (file.type === "spreadsheet") {
      navigate(`/drive/sheets/${file.id}`);
    }
  };

  // Handle file creation
  const handleFileCreate = (name: string, type: FileType) => {
    const newFile = createFile(name, type);
    
    // Navigate to new file if it's a document or spreadsheet
    if (type === "document") {
      navigate(`/drive/docs/${newFile.id}`);
    } else if (type === "spreadsheet") {
      navigate(`/drive/sheets/${newFile.id}`);
    }
  };

  // Handle rename dialog
  const handleOpenRenameDialog = (id: string) => {
    const file = files.find(f => f.id === id);
    setSelectedFile(file);
    setIsRenameDialogOpen(true);
  };

  // Handle file rename
  const handleRenameFile = (newName: string) => {
    if (selectedFile) {
      renameFile(selectedFile.id, newName);
    }
  };

  // Handle delete dialog
  const handleOpenDeleteDialog = (id: string) => {
    const file = files.find(f => f.id === id);
    setSelectedFile(file);
    setIsDeleteDialogOpen(true);
  };

  // Handle file deletion
  const handleDeleteFile = () => {
    if (selectedFile) {
      deleteFile(selectedFile.id);
    }
  };

  // Handle move dialog
  const handleOpenMoveDialog = (id: string) => {
    const file = files.find(f => f.id === id);
    setSelectedFile(file);
    setIsMoveDialogOpen(true);
  };

  // Handle file move
  const handleMoveFile = (newParentId: string | null) => {
    if (selectedFile) {
      moveFile(selectedFile.id, newParentId);
    }
  };

  // Handle star toggle
  const handleStarFile = (id: string, isStarred: boolean) => {
    starFile(id, isStarred);
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Drive</h1>
          
          <div className="flex items-center gap-3">
            <SearchFiles />
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nieuw
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">Alle bestanden</TabsTrigger>
              <TabsTrigger value="starred" className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                Favorieten
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              {currentDirectory !== null && (
                <Button variant="outline" size="icon" onClick={navigateUp}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-6">
            <div className="mb-4">
              <Breadcrumb items={breadcrumbs} onNavigate={navigateToDirectory} />
            </div>
            
            {displayFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-md">
                <p className="text-muted-foreground mb-3">Geen bestanden gevonden in deze map</p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nieuw bestand
                </Button>
              </div>
            ) : (
              <>
                {view === "grid" ? (
                  <FileGrid
                    files={displayFiles}
                    onOpenFile={handleOpenFile}
                    onDeleteFile={handleOpenDeleteDialog}
                    onRenameFile={handleOpenRenameDialog}
                    onStarFile={handleStarFile}
                    onMoveFile={handleOpenMoveDialog}
                  />
                ) : (
                  <div className="border rounded-md divide-y">
                    {displayFiles.map((file) => (
                      <FileListItem
                        key={file.id}
                        file={file}
                        onOpenFile={handleOpenFile}
                        onDeleteFile={handleOpenDeleteDialog}
                        onRenameFile={handleOpenRenameDialog}
                        onStarFile={handleStarFile}
                        onMoveFile={handleOpenMoveDialog}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="starred" className="mt-6">
            {displayFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-md">
                <p className="text-muted-foreground">Geen favoriete bestanden gevonden</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Klik op het ster-icoon om bestanden toe te voegen aan favorieten
                </p>
              </div>
            ) : (
              <>
                {view === "grid" ? (
                  <FileGrid
                    files={displayFiles}
                    onOpenFile={handleOpenFile}
                    onDeleteFile={handleOpenDeleteDialog}
                    onRenameFile={handleOpenRenameDialog}
                    onStarFile={handleStarFile}
                    onMoveFile={handleOpenMoveDialog}
                  />
                ) : (
                  <div className="border rounded-md divide-y">
                    {displayFiles.map((file) => (
                      <FileListItem
                        key={file.id}
                        file={file}
                        onOpenFile={handleOpenFile}
                        onDeleteFile={handleOpenDeleteDialog}
                        onRenameFile={handleOpenRenameDialog}
                        onStarFile={handleStarFile}
                        onMoveFile={handleOpenMoveDialog}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialogs */}
      <CreateFileDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleFileCreate}
      />
      
      <RenameFileDialog
        open={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
        onRename={handleRenameFile}
        file={selectedFile}
      />
      
      <DeleteFileDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteFile}
        file={selectedFile}
      />
      
      <MoveFileDialog
        open={isMoveDialogOpen}
        onClose={() => setIsMoveDialogOpen(false)}
        onMove={handleMoveFile}
        fileToMove={selectedFile}
      />
    </Layout>
  );
};

const Drive: React.FC = () => {
  return (
    <DriveProvider>
      <DriveContent />
    </DriveProvider>
  );
};

export default Drive;
