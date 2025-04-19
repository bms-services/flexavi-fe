
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
import { Plus, File, Download } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { formatCurrency } from "@/utils/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

  const addExpense = () => {
    if (!newExpense.description || newExpense.amount <= 0) {
      toast.error("Vul alle verplichte velden in");
      return;
    }

    const expense: ProjectExpense = {
      id: `exp-${Date.now()}`,
      projectId: project.id,
      description: newExpense.description,
      amount: newExpense.amount,
      date: newExpense.date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setExpenses([...expenses, expense]);
    setIsAddExpenseOpen(false);
    setNewExpense({
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kosten toevoegen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Beschrijving</Label>
              <Textarea 
                id="description" 
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                placeholder="Omschrijf de kosten"
              />
            </div>
            <div>
              <Label htmlFor="amount">Bedrag</Label>
              <Input 
                id="amount" 
                type="number" 
                min="0" 
                step="0.01" 
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="date">Datum</Label>
              <Input 
                id="date" 
                type="date" 
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="receipt">Bonnetje uploaden (optioneel)</Label>
              <Input 
                id="receipt" 
                type="file" 
                accept="image/*,.pdf" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addExpense}>Toevoegen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
