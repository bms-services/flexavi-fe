import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SpreadsheetContent, Sheet, Cell } from "@/types/drive";
import { Bold, Italic, Underline, Plus, Trash2, ArrowUpDown, ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpreadsheetEditorProps {
  content: SpreadsheetContent;
  onChange: (content: SpreadsheetContent) => void;
}

export const SpreadsheetEditor: React.FC<SpreadsheetEditorProps> = ({ content, onChange }) => {
  const [activeSheet, setActiveSheet] = useState(content.activeSheet);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const getColumnLabel = (columnIndex: number) => {
    // Convert column index to letter (A, B, C, etc.)
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let label = "";
    
    if (columnIndex < 26) {
      label = alphabet[columnIndex];
    } else {
      // For columns beyond Z (AA, AB, etc.)
      const firstChar = alphabet[Math.floor(columnIndex / 26) - 1];
      const secondChar = alphabet[columnIndex % 26];
      label = firstChar + secondChar;
    }
    
    return label;
  };

  const getCellValue = (sheet: Sheet, cellId: string) => {
    return sheet.cells[cellId]?.value || "";
  };

  const getCellStyle = (sheet: Sheet, cellId: string) => {
    return sheet.cells[cellId]?.style || {};
  };

  const handleSheetChange = (index: number) => {
    setActiveSheet(index);
    onChange({
      ...content,
      activeSheet: index,
    });
  };

  const handleCellClick = (cellId: string) => {
    const currentSheet = content.sheets[activeSheet];
    setEditingCell(cellId);
    const cellValue = currentSheet.cells[cellId]?.value || "";
    setEditingValue(cellValue);
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleCellBlur = () => {
    if (editingCell) {
      const updatedSheets = [...content.sheets];
      const currentSheet = { ...updatedSheets[activeSheet] };
      
      // Create or update cell
      currentSheet.cells = {
        ...currentSheet.cells,
        [editingCell]: {
          ...currentSheet.cells[editingCell],
          value: editingValue,
        },
      };
      
      updatedSheets[activeSheet] = currentSheet;
      
      onChange({
        ...content,
        sheets: updatedSheets,
      });
      
      setEditingCell(null);
      setEditingValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCellBlur();
    }
  };

  const handleAddSheet = () => {
    const newSheet: Sheet = {
      id: `sheet-tab-${Date.now()}`,
      name: `Blad ${content.sheets.length + 1}`,
      cells: {},
      columns: 10,
      rows: 20,
    };
    
    onChange({
      ...content,
      sheets: [...content.sheets, newSheet],
      activeSheet: content.sheets.length,
    });
  };

  const handleRemoveSheet = (index: number) => {
    if (content.sheets.length <= 1) return;
    
    const updatedSheets = content.sheets.filter((_, i) => i !== index);
    const newActiveSheet = activeSheet >= index && activeSheet > 0 ? activeSheet - 1 : activeSheet;
    
    onChange({
      ...content,
      sheets: updatedSheets,
      activeSheet: newActiveSheet,
    });
    
    setActiveSheet(newActiveSheet);
  };

  const handleRenameSheet = (index: number, newName: string) => {
    const updatedSheets = [...content.sheets];
    updatedSheets[index] = {
      ...updatedSheets[index],
      name: newName,
    };
    
    onChange({
      ...content,
      sheets: updatedSheets,
    });
  };

  const applyFormatting = (style: string) => {
    if (!editingCell) return;
    
    const updatedSheets = [...content.sheets];
    const currentSheet = { ...updatedSheets[activeSheet] };
    const currentCell = currentSheet.cells[editingCell] || { value: "" };
    
    // Toggle formatting
    const currentStyle = currentCell.style || {};
    let updatedStyle;
    
    switch (style) {
      case "bold":
        updatedStyle = { ...currentStyle, bold: !currentStyle.bold };
        break;
      case "italic":
        updatedStyle = { ...currentStyle, italic: !currentStyle.italic };
        break;
      case "underline":
        updatedStyle = { ...currentStyle, underline: !currentStyle.underline };
        break;
      default:
        updatedStyle = currentStyle;
    }
    
    // Update cell
    currentSheet.cells = {
      ...currentSheet.cells,
      [editingCell]: {
        ...currentCell,
        style: updatedStyle,
      },
    };
    
    updatedSheets[activeSheet] = currentSheet;
    
    onChange({
      ...content,
      sheets: updatedSheets,
    });
  };

  const handleSort = (columnLabel: string) => {
    const column = columnLabel;
    
    // Toggle direction if column is already sorted
    let direction: "asc" | "desc" = "asc";
    if (sortColumn === column) {
      direction = sortDirection === "asc" ? "desc" : "asc";
    }
    
    setSortColumn(column);
    setSortDirection(direction);
    
    const currentSheet = content.sheets[activeSheet];
    const rowsToSort: { rowIndex: number; value: string }[] = [];
    
    // Find all cells in the column
    for (let i = 1; i < currentSheet.rows; i++) {
      const cellId = `${column}${i}`;
      const cellValue = currentSheet.cells[cellId]?.value || "";
      rowsToSort.push({ rowIndex: i, value: cellValue });
    }
    
    // Sort rows
    rowsToSort.sort((a, b) => {
      if (direction === "asc") {
        return a.value.localeCompare(b.value);
      } else {
        return b.value.localeCompare(a.value);
      }
    });
    
    // Create new sheet with sorted values
    const updatedSheet = { ...currentSheet };
    const updatedCells: Record<string, Cell> = {};
    
    // Keep header row
    for (let col = 0; col < currentSheet.columns; col++) {
      const colLabel = getColumnLabel(col);
      const headerCellId = `${colLabel}0`;
      if (currentSheet.cells[headerCellId]) {
        updatedCells[headerCellId] = { ...currentSheet.cells[headerCellId] };
      }
    }
    
    // Rearrange data rows
    for (let col = 0; col < currentSheet.columns; col++) {
      const colLabel = getColumnLabel(col);
      
      rowsToSort.forEach((row, index) => {
        const oldCellId = `${colLabel}${row.rowIndex}`;
        const newCellId = `${colLabel}${index + 1}`;
        
        if (currentSheet.cells[oldCellId]) {
          updatedCells[newCellId] = { ...currentSheet.cells[oldCellId] };
        }
      });
    }
    
    updatedSheet.cells = updatedCells;
    
    const updatedSheets = [...content.sheets];
    updatedSheets[activeSheet] = updatedSheet;
    
    onChange({
      ...content,
      sheets: updatedSheets,
    });
  };

  const renderCell = (rowIndex: number, colIndex: number) => {
    const currentSheet = content.sheets[activeSheet];
    const colLabel = getColumnLabel(colIndex);
    const cellId = `${colLabel}${rowIndex}`;
    const isHeader = rowIndex === 0;
    const cellValue = getCellValue(currentSheet, cellId);
    const cellStyle = getCellStyle(currentSheet, cellId);
    
    // Apply styling
    const cellClasses = cn(
      "relative border border-gray-200 min-w-[80px] max-w-[200px] h-8 px-2 py-1 text-sm overflow-hidden text-ellipsis whitespace-nowrap",
      isHeader ? "bg-gray-100 font-medium" : "bg-white",
      cellStyle.bold && "font-bold",
      cellStyle.italic && "italic",
      cellStyle.underline && "underline",
      editingCell === cellId && "bg-blue-50 outline outline-2 outline-blue-500 z-10"
    );
    
    return (
      <td 
        key={cellId} 
        className={cellClasses}
        onClick={() => handleCellClick(cellId)}
      >
        {editingCell === cellId ? (
          <Input
            ref={inputRef}
            value={editingValue}
            onChange={handleCellChange}
            onBlur={handleCellBlur}
            onKeyDown={handleKeyDown}
            className="absolute top-0 left-0 w-full h-full border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-1"
          />
        ) : cellValue}
        
        {isHeader && (
          <div className="absolute top-0 right-0 h-full flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 opacity-0 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                handleSort(colLabel);
              }}
            >
              {sortColumn === colLabel ? (
                sortDirection === "asc" ? (
                  <ArrowDownAZ className="h-3 w-3" />
                ) : (
                  <ArrowDownZA className="h-3 w-3" />
                )
              ) : (
                <ArrowUpDown className="h-3 w-3" />
              )}
            </Button>
          </div>
        )}
      </td>
    );
  };

  const renderSheet = (sheet: Sheet, index: number) => {
    const rows = [];
    
    // Render sheet header
    rows.push(
      <tr key="header">
        <td className="w-10 bg-gray-100 border border-gray-200">&nbsp;</td>
        {Array.from({ length: sheet.columns }).map((_, colIndex) => (
          <th key={colIndex} className="min-w-[80px] bg-gray-100 border border-gray-200 px-2 py-1 text-sm font-medium">
            {getColumnLabel(colIndex)}
          </th>
        ))}
      </tr>
    );
    
    // Render rows
    for (let rowIndex = 0; rowIndex < sheet.rows; rowIndex++) {
      rows.push(
        <tr key={rowIndex}>
          <th className="w-10 bg-gray-100 border border-gray-200 px-2 py-1 text-sm font-medium text-center">
            {rowIndex}
          </th>
          {Array.from({ length: sheet.columns }).map((_, colIndex) => 
            renderCell(rowIndex, colIndex)
          )}
        </tr>
      );
    }
    
    return (
      <TabsContent key={index} value={index.toString()} className="relative overflow-auto">
        <div className="absolute top-2 right-2 flex gap-1 bg-white border rounded-md p-1 shadow-sm">
          <Button
            variant="outline"
            size="icon"
            onClick={() => applyFormatting("bold")}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => applyFormatting("italic")}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => applyFormatting("underline")}
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-auto max-h-[70vh] mt-14">
          <table className="border-collapse">
            <tbody>{rows}</tbody>
          </table>
        </div>
      </TabsContent>
    );
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Tabs 
        value={activeSheet.toString()} 
        onValueChange={(value) => handleSheetChange(parseInt(value))}
        className="flex flex-col h-full"
      >
        <div className="flex items-center bg-gray-50 border-b px-2">
          <TabsList className="flex-grow">
            {content.sheets.map((sheet, index) => (
              <TabsTrigger
                key={sheet.id}
                value={index.toString()}
                className="flex items-center gap-2 relative group"
              >
                <span>{sheet.name}</span>
                {content.sheets.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSheet(index);
                    }}
                    className="h-4 w-4 opacity-0 group-hover:opacity-100 absolute -right-1 -top-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddSheet}
            className="ml-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {content.sheets.map((sheet, index) => renderSheet(sheet, index))}
      </Tabs>
    </div>
  );
};
