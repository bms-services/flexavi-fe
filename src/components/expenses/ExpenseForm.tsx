
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, XCircle } from "lucide-react";
import { ExpenseType, ExpenseStatus, Expense } from "@/types/expenses";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { FinancialSection } from "./form-sections/FinancialSection";
import { MetadataSection } from "./form-sections/MetadataSection";

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
      toast.error("Vul alle verplichte velden in", {
        description: "Bedrijf, omschrijving en bedrag zijn verplicht."
      });
      return;
    }
    
    onSave(formData);
  };
  
  const receiptOptions = [
    { id: "no-receipt", label: "Geen bon" },
    { id: "upload-receipt", label: "Bon uploaden" },
    { id: "later-receipt", label: "Bon later uploaden" },
  ];

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

      {!isEditing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Label>Bon toevoegen</Label>
              <RadioGroup
                defaultValue="no-receipt"
                className="flex flex-col space-y-2"
              >
                {receiptOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 border rounded-md p-3"
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="cursor-pointer flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

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
