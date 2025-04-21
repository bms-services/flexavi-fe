
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense, ExpenseFilters } from "@/types/expenses";
import { ExpenseStatusBadge } from "./ExpenseStatusBadge";
import { ExpenseTypeIcon, getTypeLabel } from "./ExpenseTypeIcon";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash, Receipt, Link } from "lucide-react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ExpensesTableProps {
  expenses: Expense[];
  filters: ExpenseFilters;
}

export const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses, filters }) => {
  const navigate = useNavigate();
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const filteredExpenses = expenses.filter((expense) => {
    // Apply filters
    if (filters.status && expense.status !== filters.status) return false;
    if (filters.type && expense.type !== filters.type) return false;
    if (filters.projectId && expense.projectId !== filters.projectId) return false;
    if (filters.invoiceId && expense.invoiceId !== filters.invoiceId) return false;
    
    // Apply date range filter
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const expenseDate = new Date(expense.date);
      const fromDate = filters.dateRange[0];
      const toDate = filters.dateRange[1];
      
      if (expenseDate < fromDate || expenseDate > toDate) {
        return false;
      }
    }
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        expense.company.toLowerCase().includes(searchTerm) ||
        expense.description.toLowerCase().includes(searchTerm) ||
        (expense.notes && expense.notes.toLowerCase().includes(searchTerm))
      );
    }
    
    return true;
  });

  const handleRowClick = (id: string) => {
    navigate(`/expenses/${id}`);
  };

  const toggleSelectAll = () => {
    if (selectedExpenses.length === filteredExpenses.length) {
      setSelectedExpenses([]);
    } else {
      setSelectedExpenses(filteredExpenses.map(expense => expense.id));
    }
  };

  const toggleSelectExpense = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (selectedExpenses.includes(id)) {
      setSelectedExpenses(selectedExpenses.filter(expId => expId !== id));
    } else {
      setSelectedExpenses([...selectedExpenses, id]);
    }
  };

  const confirmDelete = (expense: Expense, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpenseToDelete(expense);
  };

  const handleDelete = () => {
    if (expenseToDelete) {
      // In a real app, here we would call an API to delete the expense
      toast.success("Uitgave verwijderd", {
        description: `${expenseToDelete.description} is verwijderd.`
      });
      setExpenseToDelete(null);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedExpenses.length === 0) return;
    
    toast.success(`${action} uitgevoerd`, {
      description: `Actie uitgevoerd op ${selectedExpenses.length} uitgaven.`
    });
    
    // Reset selection after action
    setSelectedExpenses([]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedExpenses.length === filteredExpenses.length && filteredExpenses.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[120px]">Datum</TableHead>
              <TableHead className="w-[180px]">Bedrijf</TableHead>
              <TableHead>Omschrijving</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead className="w-[120px]">Bedrag</TableHead>
              <TableHead className="w-[120px]">Incl. BTW</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[100px] text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Geen resultaten gevonden.
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((expense) => (
                <TableRow 
                  key={expense.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(expense.id)}
                >
                  <TableCell className="py-2">
                    <Checkbox
                      checked={selectedExpenses.includes(expense.id)}
                      onCheckedChange={(e) => toggleSelectExpense(expense.id, e as React.MouseEvent)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="py-2">
                    {format(new Date(expense.date), 'dd MMM yyyy', { locale: nl })}
                  </TableCell>
                  <TableCell className="py-2 font-medium">{expense.company}</TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center">
                      {expense.receiptUrl && (
                        <Receipt className="h-4 w-4 mr-2 text-blue-500" />
                      )}
                      {expense.description}
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center">
                      <ExpenseTypeIcon type={expense.type} className="mr-2" />
                      <span>{getTypeLabel(expense.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">{formatCurrency(expense.amount)}</TableCell>
                  <TableCell className="py-2">{formatCurrency(expense.totalAmount)}</TableCell>
                  <TableCell className="py-2">
                    <ExpenseStatusBadge status={expense.status} />
                  </TableCell>
                  <TableCell className="py-2 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acties</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/expenses/${expense.id}`);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          Bekijken
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/expenses/${expense.id}?edit=true`);
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Bewerken
                        </DropdownMenuItem>
                        {expense.projectId ? (
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${expense.projectId}`);
                          }}>
                            <Link className="h-4 w-4 mr-2" />
                            Bekijk project
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            toast.success("Project koppelen", {
                              description: "Projectkoppeling functie geopend."
                            });
                          }}>
                            <Link className="h-4 w-4 mr-2" />
                            Koppel aan project
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600" 
                          onClick={(e) => confirmDelete(expense, e)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Verwijderen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedExpenses.length > 0 && (
        <div className="bg-muted p-2 rounded-md mt-2 flex items-center justify-between">
          <span>{selectedExpenses.length} uitgaven geselecteerd</span>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleBulkAction('Goedkeuren')}
            >
              Goedkeuren
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleBulkAction('Exporteren')}
            >
              Exporteren
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => setSelectedExpenses([])}
            >
              Selectie wissen
            </Button>
          </div>
        </div>
      )}

      <Dialog open={!!expenseToDelete} onOpenChange={(open) => !open && setExpenseToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uitgave verwijderen</DialogTitle>
            <DialogDescription>
              Weet u zeker dat u deze uitgave wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
            </DialogDescription>
          </DialogHeader>
          {expenseToDelete && (
            <div className="py-4">
              <p><strong>Bedrijf:</strong> {expenseToDelete.company}</p>
              <p><strong>Omschrijving:</strong> {expenseToDelete.description}</p>
              <p><strong>Bedrag:</strong> {formatCurrency(expenseToDelete.totalAmount)}</p>
              <p><strong>Datum:</strong> {format(new Date(expenseToDelete.date), 'dd MMMM yyyy', { locale: nl })}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setExpenseToDelete(null)}>
              Annuleren
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Verwijderen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
