import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SpreadsheetContent, Sheet, Cell, SortSettings, FilterSettings } from "@/types/drive";
import { 
  Bold, 
  Italic, 
  Underline, 
  Plus, 
  Trash2, 
  ArrowUpDown, 
  ArrowDownAZ, 
  ArrowDownZA,
  Filter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  Lock,
  Copy,
  Clipboard,
  Table
} from "lucide-react";
import { Label } from "@/components/ui/label";
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
  const [filterSettings, setFilterSettings] = useState<FilterSettings | null>(null);
  const [showFilterAlert, setShowFilterAlert] = useState(false);
  const [clipboard, setClipboard] = useState<{cellId: string, value: string, style?: any} | null>(null);
  const [selectedRange, setSelectedRange] = useState<{start: string, end: string} | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

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

  const getCellFormula = (sheet: Sheet, cellId: string) => {
    return sheet.cells[cellId]?.formula || "";
  };

  const handleSheetChange = (index: number) => {
    setActiveSheet(index);
    onChange({
      ...content,
      activeSheet: index,
    });
    // Reset editing state when changing sheets
    setEditingCell(null);
    setEditingValue("");
  };

  const handleCellClick = (cellId: string) => {
    const currentSheet = content.sheets[activeSheet];
    const cellValue = getCellFormula(currentSheet, cellId) || getCellValue(currentSheet, cellId);
    
    setEditingCell(cellId);
    setEditingValue(cellValue);
    setSelectedRange(null);
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleCellBlur = () => {
    if (editingCell) {
      updateCellValue(editingCell, editingValue);
      setEditingCell(null);
      setEditingValue("");
    }
  };

  const updateCellValue = (cellId: string, value: string) => {
    const updatedSheets = [...content.sheets];
    const currentSheet = { ...updatedSheets[activeSheet] };
    
    // Determine if the value is a formula
    const isFormula = value.startsWith('=');
    
    // Create or update cell
    currentSheet.cells = {
      ...currentSheet.cells,
      [cellId]: {
        ...currentSheet.cells[cellId],
        value: isFormula ? calculateFormula(value.substring(1), currentSheet) : value,
        formula: isFormula ? value : undefined,
      },
    };
    
    updatedSheets[activeSheet] = currentSheet;
    
    onChange({
      ...content,
      sheets: updatedSheets,
    });
  };

  const calculateFormula = (formula: string, sheet: Sheet): string => {
    try {
      // Handle SUM function
      if (formula.toUpperCase().startsWith('SUM(')) {
        const range = formula.substring(4, formula.length - 1);
        return calculateSum(range, sheet);
      }
      
      // Handle AVERAGE function
      if (formula.toUpperCase().startsWith('AVERAGE(')) {
        const range = formula.substring(8, formula.length - 1);
        return calculateAverage(range, sheet);
      }
      
      // Handle simple arithmetic operations
      return eval(formula).toString();
    } catch (error) {
      console.error("Formula error:", error);
      return "#ERROR!";
    }
  };

  const calculateSum = (range: string, sheet: Sheet): string => {
    const cells = getCellsFromRange(range, sheet);
    
    let sum = 0;
    cells.forEach(cellId => {
      const value = getCellValue(sheet, cellId);
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        sum += numValue;
      }
    });
    
    return sum.toString();
  };

  const calculateAverage = (range: string, sheet: Sheet): string => {
    const cells = getCellsFromRange(range, sheet);
    
    let sum = 0;
    let count = 0;
    
    cells.forEach(cellId => {
      const value = getCellValue(sheet, cellId);
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        sum += numValue;
        count++;
      }
    });
    
    return count > 0 ? (sum / count).toString() : "#DIV/0!";
  };

  const getCellsFromRange = (range: string, sheet: Sheet): string[] => {
    // Split the range (e.g., "A1:B3")
    const parts = range.split(':');
    if (parts.length !== 2) {
      return [range];
    }
    
    const startCell = parts[0];
    const endCell = parts[1];
    
    // Parse the column and row indices
    const startCol = startCell.match(/[A-Z]+/)?.[0] || "";
    const startRow = parseInt(startCell.match(/\d+/)?.[0] || "0");
    const endCol = endCell.match(/[A-Z]+/)?.[0] || "";
    const endRow = parseInt(endCell.match(/\d+/)?.[0] || "0");
    
    // Convert column letters to indices
    const startColIdx = columnLabelToIndex(startCol);
    const endColIdx = columnLabelToIndex(endCol);
    
    // Get all cells in the range
    const cells: string[] = [];
    for (let row = startRow; row <= endRow; row++) {
      for (let colIdx = startColIdx; colIdx <= endColIdx; colIdx++) {
        const colLabel = getColumnLabel(colIdx);
        cells.push(`${colLabel}${row}`);
      }
    }
    
    return cells;
  };

  const columnLabelToIndex = (label: string): number => {
    let index = 0;
    for (let i = 0; i < label.length; i++) {
      index = index * 26 + (label.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return index - 1;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCellBlur();
    } else if (e.key === "Escape") {
      setEditingCell(null);
      setEditingValue("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (editingCell) {
        const colLabel = editingCell.match(/[A-Z]+/)?.[0] || "";
        const rowNum = parseInt(editingCell.match(/\d+/)?.[0] || "0");
        const colIdx = columnLabelToIndex(colLabel);
        
        // Move to next cell
        handleCellBlur();
        const nextColLabel = getColumnLabel(colIdx + 1);
        const nextCellId = `${nextColLabel}${rowNum}`;
        handleCellClick(nextCellId);
      }
    }
  };

  const handleAddSheet = () => {
    const newSheet: Sheet = {
      id: `sheet-tab-${Date.now()}`,
      name: `Blad ${content.sheets.length + 1}`,
      cells: {},
      columns: 20,
      rows: 50,
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
      case "align-left":
        updatedStyle = { ...currentStyle, horizontalAlign: "left" };
        break;
      case "align-center":
        updatedStyle = { ...currentStyle, horizontalAlign: "center" };
        break;
      case "align-right":
        updatedStyle = { ...currentStyle, horizontalAlign: "right" };
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
      // Handle numeric sorting
      const aNum = parseFloat(a.value);
      const bNum = parseFloat(b.value);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return direction === "asc" ? aNum - bNum : bNum - aNum;
      }
      
      // Fall back to string comparison
      if (direction === "asc") {
        return a.value.localeCompare(b.value);
      } else {
        return b.value.localeCompare(a.value);
      }
    });
    
    // Create new sheet with sorted values
    const updatedSheet = { ...currentSheet };
    const updatedCells: Record<string, Cell> = {};
    
    // Keep header row and any cells not in sorted rows
    Object.keys(currentSheet.cells).forEach(cellId => {
      const rowMatch = cellId.match(/\d+/);
      if (rowMatch) {
        const rowNum = parseInt(rowMatch[0]);
        if (rowNum === 0) {
          updatedCells[cellId] = { ...currentSheet.cells[cellId] };
        }
      }
    });
    
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

  const handleFilter = (columnLabel: string, value: string, operator: "equals" | "contains" | "startsWith" | "endsWith" | "greaterThan" | "lessThan") => {
    setFilterSettings({ column: columnLabel, value, operator });
    setShowFilterAlert(true);
    
    // Clear the filter after 3 seconds
    setTimeout(() => {
      setShowFilterAlert(false);
    }, 3000);
  };

  const handleCopy = () => {
    if (editingCell) {
      const currentSheet = content.sheets[activeSheet];
      const cellValue = getCellValue(currentSheet, editingCell);
      const cellStyle = getCellStyle(currentSheet, editingCell);
      
      setClipboard({
        cellId: editingCell,
        value: cellValue,
        style: cellStyle
      });
    }
  };

  const handlePaste = (targetCellId: string) => {
    if (clipboard) {
      const updatedSheets = [...content.sheets];
      const currentSheet = { ...updatedSheets[activeSheet] };
      
      // Paste value and styling to the target cell
      currentSheet.cells = {
        ...currentSheet.cells,
        [targetCellId]: {
          ...currentSheet.cells[targetCellId],
          value: clipboard.value,
          style: clipboard.style,
        },
      };
      
      updatedSheets[activeSheet] = currentSheet;
      
      onChange({
        ...content,
        sheets: updatedSheets,
      });
    }
  };

  const addRow = () => {
    const updatedSheets = [...content.sheets];
    const currentSheet = { ...updatedSheets[activeSheet] };
    
    // Increment the number of rows
    currentSheet.rows += 1;
    
    updatedSheets[activeSheet] = currentSheet;
    
    onChange({
      ...content,
      sheets: updatedSheets,
    });
  };

  const addColumn = () => {
    const updatedSheets = [...content.sheets];
    const currentSheet = { ...updatedSheets[activeSheet] };
    
    // Increment the number of columns
    currentSheet.columns += 1;
    
    updatedSheets[activeSheet] = currentSheet;
    
    onChange({
      ...content,
      sheets: updatedSheets,
    });
  };

  const clearCell = (cellId: string) => {
    const updatedSheets = [...content.sheets];
    const currentSheet = { ...updatedSheets[activeSheet] };
    
    // Clear the cell content but keep the cell object
    if (currentSheet.cells[cellId]) {
      currentSheet.cells = {
        ...currentSheet.cells,
        [cellId]: {
          ...currentSheet.cells[cellId],
          value: "",
          formula: undefined,
        },
      };
      
      updatedSheets[activeSheet] = currentSheet;
      
      onChange({
        ...content,
        sheets: updatedSheets,
      });
    }
  };

  const renderCell = (rowIndex: number, colIndex: number) => {
    const currentSheet = content.sheets[activeSheet];
    const colLabel = getColumnLabel(colIndex);
    const cellId = `${colLabel}${rowIndex}`;
    const isHeader = rowIndex === 0;
    const cellValue = getCellValue(currentSheet, cellId);
    const cellStyle = getCellStyle(currentSheet, cellId);
    const isEditing = editingCell === cellId;
    
    // Apply styling
    const cellClasses = cn(
      "relative border border-gray-200 min-w-[80px] max-w-[200px] h-8 px-2 py-1 text-sm",
      isHeader ? "bg-gray-100 font-medium" : "bg-white",
      cellStyle.bold && "font-bold",
      cellStyle.italic && "italic",
      cellStyle.underline && "underline",
      isEditing && "bg-blue-50 outline outline-2 outline-blue-500 z-10"
    );
    
    // Apply text alignment
    const alignmentClass = cellStyle.horizontalAlign 
      ? `text-${cellStyle.horizontalAlign}` 
      : "text-left";
    
    const handleCellContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      handleCellClick(cellId);
    };
    
    return (
      <td 
        key={cellId} 
        className={cn(cellClasses, alignmentClass)}
        onClick={() => handleCellClick(cellId)}
        onContextMenu={handleCellContextMenu}
      >
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editingValue}
            onChange={handleCellChange}
            onBlur={handleCellBlur}
            onKeyDown={handleKeyDown}
            className="absolute top-0 left-0 w-full h-full border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-1"
          />
        ) : (
          <div className="w-full h-full overflow-hidden text-ellipsis whitespace-nowrap">
            {cellValue}
          </div>
        )}
        
        {isHeader && (
          <div className="absolute top-0 right-0 h-full flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 opacity-0 hover:opacity-100"
                >
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="end">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleSort(colLabel)}
                  >
                    <ArrowDownAZ className="h-4 w-4 mr-2" />
                    Oplopend sorteren
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setSortDirection("desc");
                      handleSort(colLabel);
                    }}
                  >
                    <ArrowDownZA className="h-4 w-4 mr-2" />
                    Aflopend sorteren
                  </Button>
                  <hr className="my-2" />
                  <div className="px-2 text-sm font-medium">Filter op waarde</div>
                  <Input 
                    placeholder="Filter waarde..."
                    className="h-8 mb-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleFilter(colLabel, e.currentTarget.value, "contains");
                      }
                    }}
                  />
                  <div className="px-2 text-xs text-muted-foreground">
                    Druk op Enter om te filteren
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </td>
    );
  };

  const renderFormulaBar = () => {
    return (
      <div className="flex items-center px-2 py-1 bg-white border-b">
        <div className="w-10 text-center text-xs text-gray-500 mr-2">
          {editingCell || ""}
        </div>
        <Input
          value={editingValue}
          onChange={handleCellChange}
          onBlur={handleCellBlur}
          onKeyDown={handleKeyDown}
          placeholder="Voer een waarde of formule in (bijv. =SUM(A1:A5))"
          className="flex-1 h-8"
          disabled={!editingCell}
        />
      </div>
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
      <TabsContent key={index} value={index.toString()} className="relative overflow-hidden flex flex-col h-full">
        {showFilterAlert && (
          <Alert className="mb-2 bg-blue-50 text-blue-800 border-blue-200">
            <AlertDescription>
              Filter toegepast op kolom {filterSettings?.column}. Klik opnieuw op het filter-icoon om te wissen.
            </AlertDescription>
          </Alert>
        )}
        
        {renderFormulaBar()}
        
        <div className="flex items-center justify-between bg-white border-b p-1">
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => editingCell && applyFormatting("bold")}
              disabled={!editingCell}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => editingCell && applyFormatting("italic")}
              disabled={!editingCell}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => editingCell && applyFormatting("underline")}
              disabled={!editingCell}
            >
              <Underline className="h-4 w-4" />
            </Button>
            <span className="border-r h-6 mx-1" />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => editingCell && applyFormatting("align-left")}
              disabled={!editingCell}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => editingCell && applyFormatting("align-center")}
              disabled={!editingCell}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => editingCell && applyFormatting("align-right")}
              disabled={!editingCell}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <span className="border-r h-6 mx-1" />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopy}
              disabled={!editingCell}
              title="Kopiëren"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => editingCell && handlePaste(editingCell)}
              disabled={!editingCell || !clipboard}
              title="Plakken"
            >
              <Clipboard className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => editingCell && clearCell(editingCell)}
              disabled={!editingCell}
              title="Wissen"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={addRow}
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" />
              Rij
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={addColumn}
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" />
              Kolom
            </Button>
          </div>
        </div>
        
        <div className="overflow-auto flex-grow">
          <table ref={tableRef} className="border-collapse">
            <tbody>{rows}</tbody>
          </table>
        </div>
      </TabsContent>
    );
  };

  return (
    <div className="border rounded-md overflow-hidden h-full flex flex-col bg-white">
      <Tabs 
        value={activeSheet.toString()} 
        onValueChange={(value) => handleSheetChange(parseInt(value))}
        className="flex flex-col h-full"
      >
        <div className="flex items-center bg-gray-50 border-b px-2">
          <TabsList className="flex-grow h-9">
            {content.sheets.map((sheet, index) => (
              <TabsTrigger
                key={sheet.id}
                value={index.toString()}
                className="flex items-center gap-2 relative group h-8"
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
            className="ml-2 h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {content.sheets.map((sheet, index) => renderSheet(sheet, index))}
      </Tabs>
    </div>
  );
};
