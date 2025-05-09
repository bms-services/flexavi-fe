
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExpenseStatusBadge } from "../ExpenseStatusBadge";
import { ExpenseTypeIcon, getTypeLabel } from "../ExpenseTypeIcon";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Expense } from "@/types/expenses";
import { Edit, Eye, Trash, Receipt, Link } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExpenseRowProps {
  expense: Expense;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onDelete: (expense: Expense) => void;
  onNavigate: (path: string) => void;
}

export const ExpenseRow: React.FC<ExpenseRowProps> = ({
  expense,
  isSelected,
  onSelect,
  onDelete,
  onNavigate,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onNavigate(`/expenses/${expense.id}`)}
    >
      <TableCell className="py-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
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
              onNavigate(`/expenses/${expense.id}`);
            }}>
              <Eye className="h-4 w-4 mr-2" />
              Bekijken
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onNavigate(`/expenses/${expense.id}?edit=true`);
            }}>
              <Edit className="h-4 w-4 mr-2" />
              Bewerken
            </DropdownMenuItem>
            {expense.projectId ? (
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                onNavigate(`/projects/${expense.projectId}`);
              }}>
                <Link className="h-4 w-4 mr-2" />
                Bekijk project
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
              
              }}>
                <Link className="h-4 w-4 mr-2" />
                Koppel aan project
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(expense);
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              Verwijderen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
