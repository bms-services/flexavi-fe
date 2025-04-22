
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
  lastOpened?: string;
  color?: string;
  description?: string;
}

// Document content type
export interface DocumentContent {
  text: string;
  versions?: { 
    id: string;
    timestamp: string;
    content: string;
    author?: string;
  }[];
  comments?: {
    id: string;
    content: string;
    author: string;
    timestamp: string;
    resolved?: boolean;
    position?: { x: number, y: number };
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
  frozenRows?: number;
  frozenColumns?: number;
  conditionalFormatting?: ConditionalFormatting[];
}

export interface Cell {
  value: string;
  formula?: string;
  style?: CellStyle;
  comment?: string;
  merged?: {
    rowspan: number;
    colspan: number;
  };
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
  border?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted';
  };
  textWrap?: 'wrap' | 'nowrap' | 'clip';
  numberFormat?: string;
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

export interface ConditionalFormatting {
  range: string;
  condition: {
    type: 'greaterThan' | 'lessThan' | 'equals' | 'between' | 'contains' | 'notContains';
    value: string | number;
    value2?: string | number; // For 'between' condition
  };
  style: Partial<CellStyle>;
}
