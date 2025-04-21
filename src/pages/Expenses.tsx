
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ExpensesHeader } from "@/components/expenses/ExpensesHeader";
import { ExpensesFilters } from "@/components/expenses/ExpensesFilters";
import { ExpensesTable } from "@/components/expenses/ExpensesTable";
import { mockExpenses } from "@/data/mockData";
import { ExpenseFilters } from "@/types/expenses";

const Expenses = () => {
  const [filters, setFilters] = useState<ExpenseFilters>({});

  const handleFiltersChange = (newFilters: ExpenseFilters) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <ExpensesHeader onFiltersChange={handleFiltersChange} />
        <ExpensesFilters onFiltersChange={handleFiltersChange} />
        <ExpensesTable expenses={mockExpenses} filters={filters} />
      </div>
    </Layout>
  );
};

export default Expenses;
