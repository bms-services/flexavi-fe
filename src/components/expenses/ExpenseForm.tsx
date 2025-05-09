import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, XCircle } from "lucide-react";
import { ExpenseType, ExpenseStatus, Expense } from "@/types/expenses";

import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { FinancialSection } from "./form-sections/FinancialSection";
import { MetadataSection } from "./form-sections/MetadataSection";
import { ReceiptSection } from "./form-sections/ReceiptSection";

interface ExpenseFormProps {
  expense?: Expense;
  onSave: (expense: Partial<Expense>) => void;
  onCancel: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
  onSave,
  onCancel,
}) => {
  const isEditing = !!expense;
  
  const [formData, setFormData] = useState<Partial<Expense>>({
    company: "",
    description: "",
    amount: 0,
    vatRate: 21,
    vatAmount: 0,
    totalAmount: 0,
    date: new Date().toISOString().split("T")[0],
    type: "material" as ExpenseType,
    status: "draft" as ExpenseStatus,
    notes: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        ...expense,
      });
    }
  }, [expense]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "amount") {
      const amount = parseFloat(value) || 0;
      const vatAmount = Math.round((amount * (formData.vatRate || 21)) / 100 * 100) / 100;
      const totalAmount = amount + vatAmount;
      
      setFormData({
        ...formData,
        amount,
        vatAmount,
        totalAmount,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "vatRate") {
      const vatRate = parseInt(value) || 0;
      const amount = formData.amount || 0;
      const vatAmount = Math.round((amount * vatRate) / 100 * 100) / 100;
      const totalAmount = amount + vatAmount;
      
      setFormData({
        ...formData,
        vatRate,
        vatAmount,
        totalAmount,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        date: date.toISOString().split("T")[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.description || !formData.amount) {
      
      return;
    }
    
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <BasicInfoSection
            company={formData.company || ""}
            description={formData.description || ""}
            onInputChange={handleInputChange}
          />
          <FinancialSection
            amount={formData.amount || 0}
            vatRate={formData.vatRate || 21}
            vatAmount={formData.vatAmount || 0}
            totalAmount={formData.totalAmount || 0}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
        </div>

        <div className="space-y-4">
          <MetadataSection
            date={formData.date || ""}
            type={formData.type || "material"}
            projectId={formData.projectId}
            notes={formData.notes}
            onDateSelect={handleDateSelect}
            onSelectChange={handleSelectChange}
            onInputChange={handleInputChange}
          />
        </div>
      </div>

      <ReceiptSection isEditing={isEditing} />

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          <XCircle className="h-4 w-4 mr-2" />
          Annuleren
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? "Wijzigingen opslaan" : "Uitgave toevoegen"}
        </Button>
      </div>
    </form>
  );
};
