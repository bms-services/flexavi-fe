
import React from "react";
import { FileType } from "@/types/drive";
import { FileText, Table, Folder, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileIconProps {
  type: FileType;
  className?: string;
  starred?: boolean;
}

export const FileIcon: React.FC<FileIconProps> = ({ type, className, starred = false }) => {
  const renderIcon = () => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "spreadsheet":
        return <Table className="h-5 w-5 text-green-500" />;
      case "folder":
        return <Folder className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {renderIcon()}
      {starred && (
        <Star className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400" />
      )}
    </div>
  );
};
