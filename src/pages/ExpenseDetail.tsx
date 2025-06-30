
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { mockExpenses, getExpenseById } from "@/data/mockData";
import { ExpenseDetail } from "@/components/expenses/ExpenseDetail";
import NotFound from "./NotFound";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Expense } from "@/types/expenses";

const ExpenseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isEdit = searchParams.get("edit") === "true";
  const isNewExpense = id?.startsWith("exp-new-");

  // For new expenses, create a placeholder
  const placeholderExpense: Expense = {
    id: id || "",
    company: "",
    description: "",
    amount: 0,
    vatRate: 21,
    vatAmount: 0,
    totalAmount: 0,
    date: new Date().toISOString().split('T')[0],
    type: "material",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // For existing expenses, get from mock data
  const expense = isNewExpense
    ? placeholderExpense
    : getExpenseById(id || "");

  if (!expense && !isNewExpense) {
    return <NotFound />;
  }

  const handleSave = (expenseData: Partial<Expense>) => {
    // In a real app, we would make an API call to create/update the expense

    navigate("/expenses");
  };

  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        {isNewExpense || isEdit ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/expenses")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar overzicht
              </Button>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {isNewExpense ? "Nieuwe uitgave" : "Uitgave bewerken"}
            </h2>
            <ExpenseForm
              expense={!isNewExpense ? expense : undefined}
              onSave={handleSave}
              onCancel={() => navigate("/expenses")}
            />
          </div>
        ) : (
          <ExpenseDetail expense={expense as Expense} onEdit={isEdit} />
        )}
      </div>
    </Layout>
  );
};

export default ExpenseDetailPage;
