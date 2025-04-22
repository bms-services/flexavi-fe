import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KnowledgeBaseEntry } from "@/types/knowledge-base";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KnowledgeBaseEntryType } from "@/types/knowledge-base";

interface KnowledgeBaseTableProps {
  entries: KnowledgeBaseEntry[];
  categories: { id: string; name: string }[];
  onEdit: (entry: KnowledgeBaseEntry) => void;
  onDelete: (entry: KnowledgeBaseEntry) => void;
}

export function KnowledgeBaseTable({ entries, categories, onEdit, onDelete }: KnowledgeBaseTableProps) {
  const columns: ColumnDef<KnowledgeBaseEntry>[] = [
    {
      accessorKey: "question",
      header: "Vraag",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as KnowledgeBaseEntryType;
        let badgeText = "";
        let badgeVariant = "default";

        switch (type) {
          case "text":
            badgeText = "Tekst";
            break;
          case "image":
            badgeText = "Afbeelding";
            badgeVariant = "secondary";
            break;
          case "video":
            badgeText = "Video";
            badgeVariant = "outline";
            break;
          default:
            badgeText = "Onbekend";
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>;
      },
    },
    {
      accessorKey: "categoryId",
      header: "Categorie",
      cell: ({ row }) => {
        const categoryId = row.getValue("categoryId") as string;
        const category = categories.find((cat) => cat.id === categoryId);
        return <span>{category?.name || "Geen categorie"}</span>;
      },
    },
    {
      accessorKey: "published",
      header: "Status",
      cell: ({ row }) => {
        const published = row.getValue("published") as boolean;
        return (
          <Badge variant={published ? "success" : "destructive"}>
            {published ? "Gepubliceerd" : "Concept"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Acties",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: entries,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Geen resultaten gevonden.
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
