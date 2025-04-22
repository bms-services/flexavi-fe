
import React from "react";
import { DriveFile } from "@/types/drive";
import { FileIcon } from "./FileIcon";
import { Button } from "@/components/ui/button";
import { Star, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FileGridProps {
  files: DriveFile[];
  onOpenFile: (file: DriveFile) => void;
  onDeleteFile: (id: string) => void;
  onRenameFile: (id: string) => void;
  onStarFile: (id: string, starred: boolean) => void;
  onMoveFile?: (id: string) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({
  files,
  onOpenFile,
  onDeleteFile,
  onRenameFile,
  onStarFile,
  onMoveFile,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className={cn(
            "group flex flex-col items-center p-4 hover:bg-gray-50 rounded-md cursor-pointer border",
            file.type === "folder" ? "hover:bg-yellow-50" : "",
            file.type === "document" ? "hover:bg-blue-50" : "",
            file.type === "spreadsheet" ? "hover:bg-green-50" : ""
          )}
          onClick={() => onOpenFile(file)}
        >
          <div className="relative mb-2">
            <FileIcon type={file.type} className="h-12 w-12" />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100",
                file.starred ? "text-yellow-400 opacity-100" : "text-gray-400"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onStarFile(file.id, !file.starred);
              }}
            >
              <Star className="h-3 w-3" />
            </Button>
          </div>
          
          <p className="text-sm font-medium text-center text-gray-900 truncate w-full">{file.name}</p>
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Bestandsopties</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onRenameFile(file.id);
                }}>
                  Hernoemen
                </DropdownMenuItem>
                {onMoveFile && (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onMoveFile(file.id);
                  }}>
                    Verplaatsen
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFile(file.id);
                }} className="text-red-600">
                  Verwijderen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};
