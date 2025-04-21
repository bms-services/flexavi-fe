
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Check, Save, XCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { ExpenseType, ExpenseStatus, Expense } from "@/types/expenses";
import { getTypeLabel } from "./ExpenseTypeIcon";
import { mockProjects } from "@/data/mockData";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExpenseFormProps {
  expense?: Expense; // For editing existing expenses
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
    date: format(new Date(), "yyyy-MM-dd"),
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
    
    if (name === 'amount') {
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
    if (name === 'vatRate') {
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
        date: format(date, "yyyy-MM-dd"),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
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
          <div className="space-y-2">
            <Label htmlFor="company">
              Bedrijf <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Omschrijving <span className="text-red-500">*</span>
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">
                Bedrag (excl. BTW) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatRate">BTW percentage</Label>
              <Select
                value={formData.vatRate?.toString() || "21"}
                onValueChange={(value) => handleSelectChange("vatRate", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer BTW" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="9">9%</SelectItem>
                  <SelectItem value="21">21%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vatAmount">BTW bedrag</Label>
              <Input
                id="vatAmount"
                name="vatAmount"
                type="number"
                step="0.01"
                value={formData.vatAmount || ""}
                onChange={handleInputChange}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount">Totaalbedrag (incl. BTW)</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                step="0.01"
                value={formData.totalAmount || ""}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">
              Datum <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !formData.date ? "text-muted-foreground" : ""
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(new Date(formData.date), "P", { locale: nl })
                  ) : (
                    <span>Selecteer datum</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date ? new Date(formData.date) : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                  locale={nl}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type uitgave</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">{getTypeLabel("material")}</SelectItem>
                <SelectItem value="transport">{getTypeLabel("transport")}</SelectItem>
                <SelectItem value="equipment">{getTypeLabel("equipment")}</SelectItem>
                <SelectItem value="subcontractor">{getTypeLabel("subcontractor")}</SelectItem>
                <SelectItem value="other">{getTypeLabel("other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectId">Project (optioneel)</Label>
            <Select
              value={formData.projectId || ""}
              onValueChange={(value) => handleSelectChange("projectId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Koppel aan project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Geen project</SelectItem>
                {mockProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notities</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes || ""}
              onChange={handleInputChange}
              placeholder="Aanvullende notities voor deze uitgave..."
            />
          </div>
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
