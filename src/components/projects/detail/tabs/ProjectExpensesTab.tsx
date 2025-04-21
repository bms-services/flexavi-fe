
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project, ProjectExpense } from "@/types/project";
import { Plus, File, Download, Upload, Check, Edit } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { formatCurrency } from "@/utils/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ReceiptUploadArea } from "@/components/layout/quick-actions/receipt-upload/ReceiptUploadArea";
import { ReceiptFilePreview } from "@/components/layout/quick-actions/receipt-upload/ReceiptFilePreview";
import { ReceiptFormFields } from "@/components/layout/quick-actions/receipt-upload/ReceiptFormFields";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";

interface ProjectExpensesTabProps {
  project: Project;
}

export const ProjectExpensesTab: React.FC<ProjectExpensesTabProps> = ({ project }) => {
  const [expenses, setExpenses] = useState<ProjectExpense[]>(project.expenses);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<Partial<ProjectExpense>>({
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
  });
  
  // Receipt scanning states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    company: '',
    description: '',
    subtotal: '',
    vat: '',
    vatPaid: '',
    total: '',
    project: project.id,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsProcessing(true);
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);

          // Simulate AI processing
          setTimeout(() => {
            setReceiptData({
              company: 'Bouwmarkt Nederland',
              description: 'Aanschaf bouwmaterialen',
              subtotal: '245.50',
              vat: '21',
              vatPaid: '51.56',
              total: '297.06',
              project: project.id,
            });
            
            // Update the new expense with AI recognized data
            setNewExpense({
              description: 'Aanschaf bouwmaterialen - Bouwmarkt Nederland',
              amount: 297.06,
              date: new Date().toISOString().split("T")[0],
              type: 'material',
            });
            
            setIsProcessing(false);
          }, 2000);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount") {
      setNewExpense({ ...newExpense, amount: parseFloat(value) });
    } else {
      setNewExpense({ ...newExpense, [name]: value });
    }
  };

  const handleReceiptDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReceiptData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Update expense data based on receipt data changes
    if (name === "description") {
      setNewExpense(prev => ({ ...prev, description: value }));
    } else if (name === "total") {
      setNewExpense(prev => ({ ...prev, amount: parseFloat(value) || 0 }));
    }
  };

  const handleClearFile = () => {
    setUploadedImage(null);
    setIsProcessing(false);
    setReceiptData({
      company: '',
      description: '',
      subtotal: '',
      vat: '',
      vatPaid: '',
      total: '',
      project: project.id,
    });
  };

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || newExpense.amount <= 0) {
      toast.error("Vul alle verplichte velden in");
      return;
    }

    const expense: ProjectExpense = {
      id: `exp-${Date.now()}`,
      projectId: project.id,
      description: newExpense.description || "",
      amount: newExpense.amount || 0,
      date: newExpense.date || new Date().toISOString(),
      type: newExpense.type,
      receiptUrl: uploadedImage || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setExpenses([...expenses, expense]);
    setIsAddExpenseOpen(false);
    
    // Reset states
    setNewExpense({
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    });
    setUploadedImage(null);
    setReceiptData({
      company: '',
      description: '',
      subtotal: '',
      vat: '',
      vatPaid: '',
      total: '',
      project: project.id,
    });
    
    toast.success("Kosten toegevoegd");
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Kosten
          <span className="ml-2 text-muted-foreground">
            Totaal: {formatCurrency(totalExpenses)}
          </span>
        </h2>
        <Button onClick={() => setIsAddExpenseOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Kosten toevoegen
        </Button>
      </div>

      {expenses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {expenses.map((expense) => (
            <Card key={expense.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{expense.description}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(expense.date), "d MMMM yyyy", { locale: nl })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {expense.receiptUrl && (
                      <Button variant="outline" size="sm">
                        <File className="h-4 w-4 mr-2" />
                        <span className="hidden md:inline">Bekijk bon</span>
                      </Button>
                    )}
                    <p className="text-lg font-bold">{formatCurrency(expense.amount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Er zijn nog geen kosten toegevoegd aan dit project.
            </p>
            <Button className="mt-4" onClick={() => setIsAddExpenseOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Kosten toevoegen
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Kosten toevoegen</DialogTitle>
            <DialogDescription>
              Upload een bonnetje om automatisch de gegevens uit te lezen met AI
            </DialogDescription>
          </DialogHeader>
          
          {!uploadedImage ? (
            <ReceiptUploadArea onFileUpload={handleFileUpload} />
          ) : (
            <div className="space-y-4">
              <ReceiptFilePreview imageSrc={uploadedImage} onClear={handleClearFile} />
              
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-sm text-center text-muted-foreground">
                    Bon wordt geanalyseerd met AI...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted/40 p-3 rounded-md border">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" /> AI heeft de volgende gegevens herkend:
                    </h3>
                    <ReceiptFormFields
                      receiptData={receiptData}
                      onInputChange={handleReceiptDataChange}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Beschrijving voor project</Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        value={newExpense.description}
                        onChange={handleInputChange}
                        placeholder="Omschrijf de kosten"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Bedrag</Label>
                      <Input 
                        id="amount" 
                        name="amount"
                        type="number" 
                        min="0" 
                        step="0.01" 
                        value={newExpense.amount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Datum</Label>
                      <Input 
                        id="date" 
                        name="date"
                        type="date" 
                        value={newExpense.date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>Annuleren</Button>
            <Button onClick={addExpense} disabled={isProcessing || !newExpense.description || !newExpense.amount}>Toevoegen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
