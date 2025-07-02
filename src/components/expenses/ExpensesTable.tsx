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
import { Checkbox } from "@/components/ui/checkbox";

import { TableActions } from "./table/TableActions";
import { DeleteDialog } from "./table/DeleteDialog";
import { ExpenseRow } from "./table/ExpenseRow";
import { ExpensesTablePagination } from "./table/ExpensesTablePagination";
import { ExpensesAdvancedFilters } from "./table/ExpensesAdvancedFilters";

interface ExpensesTableProps {
  expenses: Expense[];
  filters: ExpenseFilters;
}

export const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses, filters }) => {
  const navigate = useNavigate();
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [advancedFilters, setAdvancedFilters] = useState({
    minAmount: undefined,
    maxAmount: undefined,
    company: "",
    description: "",
    type: undefined,
    status: undefined,
  });

  const ITEMS_PER_PAGE = 10;

  const handleFilterChange = (name: string, value: any) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [name]: value === "all" ? undefined : value
    }));
    setCurrentPage(1);
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filters.status && expense.status !== filters.status) return false;
    if (filters.type && expense.type !== filters.type) return false;
    if (filters.projectId && expense.projectId !== filters.projectId) return false;
    if (filters.invoiceId && expense.invoiceId !== filters.invoiceId) return false;

    if (advancedFilters.company && !expense.company.toLowerCase().includes(advancedFilters.company.toLowerCase())) return false;
    if (advancedFilters.description && !expense.description.toLowerCase().includes(advancedFilters.description.toLowerCase())) return false;
    if (advancedFilters.type && expense.type !== advancedFilters.type) return false;
    if (advancedFilters.status && expense.status !== advancedFilters.status) return false;
    if (advancedFilters.minAmount && expense.amount < advancedFilters.minAmount) return false;
    if (advancedFilters.maxAmount && expense.amount > advancedFilters.maxAmount) return false;

    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const expenseDate = new Date(expense.date);
      const fromDate = filters.dateRange[0];
      const toDate = filters.dateRange[1];
      if (expenseDate < fromDate || expenseDate > toDate) return false;
    }

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

  const toggleSelectAll = () => {
    if (selectedExpenses.length === filteredExpenses.length) {
      setSelectedExpenses([]);
    } else {
      setSelectedExpenses(filteredExpenses.map(expense => expense.id));
    }
  };

  const handleDelete = () => {
    if (expenseToDelete) {

      setExpenseToDelete(null);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedExpenses.length === 0) return;



    setSelectedExpenses([]);
  };

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            {paginatedExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Geen resultaten gevonden.
                </TableCell>
              </TableRow>
            ) : (
              paginatedExpenses.map((expense) => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  isSelected={selectedExpenses.includes(expense.id)}
                  onSelect={(checked) => {
                    if (checked) {
                      setSelectedExpenses([...selectedExpenses, expense.id]);
                    } else {
                      setSelectedExpenses(selectedExpenses.filter(id => id !== expense.id));
                    }
                  }}
                  onDelete={setExpenseToDelete}
                  onNavigate={navigate}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ExpensesTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <TableActions
        selectedCount={selectedExpenses.length}
        onAction={handleBulkAction}
        onClearSelection={() => setSelectedExpenses([])}
      />

      <DeleteDialog
        expense={expenseToDelete}
        onClose={() => setExpenseToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};
