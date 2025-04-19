
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type PaymentInstallment = {
  percentage: number;
  description: string;
  dueType: "upfront" | "start" | "during" | "completion";
};

interface PaymentInstallmentItemProps {
  installment: PaymentInstallment;
  onRemove: () => void;
  onChange: (field: keyof PaymentInstallment, value: string | number) => void;
}

export const PaymentInstallmentItem: React.FC<PaymentInstallmentItemProps> = ({
  installment,
  onRemove,
  onChange,
}) => {
  return (
    <Card className="mb-2">
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <Label>Omschrijving</Label>
            <div className="flex items-center gap-2">
              <Input
                value={installment.description}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="Omschrijving"
              />
            </div>
          </div>
          
          <div>
            <Label>Percentage (%)</Label>
            <Input
              type="number"
              value={installment.percentage}
              onChange={(e) => onChange('percentage', e.target.value)}
              placeholder="Percentage"
            />
          </div>

          <div>
            <Label>Type</Label>
            <Select 
              value={installment.dueType} 
              onValueChange={(value) => onChange('dueType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upfront">Vooraf</SelectItem>
                <SelectItem value="start">Bij aanvang</SelectItem>
                <SelectItem value="during">Tussentijds</SelectItem>
                <SelectItem value="completion">Bij oplevering</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
