
import React from "react";
import { KnowledgeBaseEntry, KnowledgeBaseCategory } from "@/types/knowledge-base";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, FileText, Image, Video } from "lucide-react";
import { format } from "date-fns";

interface KnowledgeBaseTableProps {
  entries: KnowledgeBaseEntry[];
  categories: KnowledgeBaseCategory[];
  onEdit: (entry: KnowledgeBaseEntry) => void;
  onDelete: (entry: KnowledgeBaseEntry) => void;
}

export function KnowledgeBaseTable({ 
  entries, 
  categories, 
  onEdit, 
  onDelete 
}: KnowledgeBaseTableProps) {
  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "Geen categorie";
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "Onbekend";
  };
  
  const getTypeIcon = (type: KnowledgeBaseEntryType) => {
    switch (type) {
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vraag</TableHead>
            <TableHead>Categorie</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Laatste update</TableHead>
            <TableHead className="w-[100px]">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                Geen kennisbank items gevonden. Maak een nieuwe aan.
              </TableCell>
            </TableRow>
          ) : (
            entries.map(entry => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.question}</TableCell>
                <TableCell>{getCategoryName(entry.categoryId)}</TableCell>
                <TableCell className="flex items-center gap-1">
                  {getTypeIcon(entry.type)}
                  <span className="capitalize">{entry.type}</span>
                </TableCell>
                <TableCell>
                  {entry.published ? (
                    <Badge variant="default" className="bg-green-500">Gepubliceerd</Badge>
                  ) : (
                    <Badge variant="outline">Concept</Badge>
                  )}
                </TableCell>
                <TableCell>{format(new Date(entry.updatedAt), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onEdit(entry)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onDelete(entry)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
