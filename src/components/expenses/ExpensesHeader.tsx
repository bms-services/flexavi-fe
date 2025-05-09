
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, FileText, FileImage, Download } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";

import { useNavigate } from "react-router-dom";
import { ExpenseFilters } from "@/types/expenses";

interface ExpensesHeaderProps {
  onFiltersChange: (filters: ExpenseFilters) => void;
}

export const ExpensesHeader: React.FC<ExpensesHeaderProps> = ({ onFiltersChange }) => {
  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);
  const navigate = useNavigate();

  const handleUploadResult = (data: any) => {
   
    
    // Refresh the expenses list after a successful upload
    // In a real app, you'd add the new expense to the state
  };

  const handleCreateExpense = () => {
    // In a real app, we would navigate to a new expense form
    // For demo purposes, we'll just create a draft expense and navigate to it
    const newId = `exp-new-${Date.now()}`;
    navigate(`/expenses/${newId}`);
  };

  const handleExportExpenses = () => {
   
    // In a real app, this would trigger an API call to export expenses to Excel
  };

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
          <Button variant="outline" size="sm" onClick={() => setOpenUploadDialog(true)}>
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

      <ReceiptUploadDialog 
        open={openUploadDialog} 
        onOpenChange={setOpenUploadDialog}
        onResult={handleUploadResult}
      />
    </div>
  );
};
