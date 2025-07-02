
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, FileText, FileImage, Download } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";

import { useNavigate } from "react-router-dom";
import { ExpenseFilters } from "@/types/expenses";

interface ExpensesHeaderProps {

  handleCreateExpense: () => void;
  handleOpenModalReceipt: () => void;
  handleExportExpenses: () => void;
}

export const ExpensesHeader: React.FC<ExpensesHeaderProps> = ({
  handleCreateExpense,
  handleOpenModalReceipt,
  handleExportExpenses,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kosten Administratie</h1>
          <p className="text-muted-foreground">
            Beheer al uw uitgaven en bonnen op één plek
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleOpenModalReceipt}>
            <Upload className="mr-2 h-4 w-4" />
            Bon uploaden
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExpenses}>
            <Download className="mr-2 h-4 w-4" />
            Exporteren
          </Button>
          <Button size="sm" onClick={handleCreateExpense}>
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe uitgave
          </Button>
        </div>
      </div>
    </div>
  );
};
