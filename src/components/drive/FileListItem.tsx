
import React from "react";
import { DriveFile } from "@/types/drive";
import { FileIcon } from "./FileIcon";
import { Button } from "@/components/ui/button";
import { Star, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FileListItemProps {
  file: DriveFile;
  onOpenFile: (file: DriveFile) => void;
  onDeleteFile: (id: string) => void;
  onRenameFile: (id: string) => void;
  onStarFile: (id: string, starred: boolean) => void;
  onMoveFile?: (id: string) => void;
}

export const FileListItem: React.FC<FileListItemProps> = ({
  file,
  onOpenFile,
  onDeleteFile,
  onRenameFile,
  onStarFile,
  onMoveFile,
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMM yyyy", { locale: nl });
    } catch (error) {
      return "Ongeldige datum";
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer",
        file.type === "folder" ? "hover:bg-yellow-50" : "",
        file.type === "document" ? "hover:bg-blue-50" : "",
        file.type === "spreadsheet" ? "hover:bg-green-50" : ""
      )}
      onClick={() => onOpenFile(file)}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <FileIcon type={file.type} starred={file.starred} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-xs text-gray-500">
            {formatDate(file.updatedAt)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onStarFile(file.id, !file.starred);
          }}
          className={cn(file.starred ? "text-yellow-400" : "text-gray-400")}
        >
          <Star className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
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
  );
};
