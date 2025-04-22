
export type FileType = 'document' | 'spreadsheet' | 'folder';

export interface DriveFile {
  id: string;
  name: string;
  type: FileType;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  parentId: string | null; // null means it's in the root directory
  content?: DocumentContent | SpreadsheetContent;
  starred?: boolean;
  isShared?: boolean;
}

// Document content type
export interface DocumentContent {
  text: string;
  versions?: { 
    id: string;
    timestamp: string;
    content: string;
  }[];
}

// Spreadsheet content type
export interface SpreadsheetContent {
  sheets: Sheet[];
  activeSheet: number;
}

export interface Sheet {
  id: string;
  name: string;
  cells: Record<string, Cell>;
  columns: number;
  rows: number;
}

export interface Cell {
  value: string;
  formula?: string;
  style?: CellStyle;
}

export interface CellStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
  fontColor?: string;
  bgColor?: string;
  horizontalAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

export interface SortSettings {
  column: string;
  direction: 'asc' | 'desc';
}

export interface FilterSettings {
  column: string;
  value: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
}
