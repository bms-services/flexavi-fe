import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ProjectReq } from '@/zustand/types/projectT';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import CurrencyInputCore from 'react-currency-input-field';
import { cn, formatEuro } from '@/utils/format';

export const WizardTransportStep: React.FC = () => {
  const { control, getValues } = useFormContext<ProjectReq>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'transports',
  });

  const [temp, setTemp] = useState<{ description: string; amount: string }>({
    description: '',
    amount: '',
  });

  const [errors, setErrors] = useState<{ description?: string; amount?: string }>({});

  const handleAddTransport = () => {
    const newErrors: typeof errors = {};

    if (!temp.description.trim()) {
      newErrors.description = 'Beschrijving is verplicht';
    }

    const rawAmount = temp.amount.replace(/\./g, '').replace(',', '.');
    const parsedAmount = parseFloat(rawAmount);

    if (!rawAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = 'Bedrag moet groter zijn dan 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    append({
      description: temp.description,
      amount: parsedAmount,
    });

    setTemp({ description: '', amount: '' });
    setErrors({});
  };

  return (
    <div className="space-y-4 w-[600px]">
      <div>
        <h2 className="text-xl font-semibold">Transport (optioneel)</h2>
        <p className="text-muted-foreground">Voeg transportkosten toe aan het project</p>
      </div>

      <div className="grid gap-4">
        <div>
          <Textarea
            label="Beschrijving"
            id="transport-description"
            placeholder="Bijv. Vrachtwagen transport van materialen"
            value={temp.description}
            onChange={(e) => {
              setTemp({ ...temp, description: e.target.value });
              if (errors.description) {
                setErrors(prev => ({ ...prev, description: undefined }));
              }
            }}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        <div>
          <Label className="block mb-2">Bedrag</Label>
          <CurrencyInputCore
            id="transport-amount"
            value={temp.amount}
            onValueChange={(value) => {
              setTemp({ ...temp, amount: value || '' });
              if (errors.amount) {
                setErrors(prev => ({ ...prev, amount: undefined }));
              }
            }}
            prefix="€ "
            decimalsLimit={2}
            allowNegativeValue={false}
            allowDecimals={true}
            groupSeparator="."
            decimalSeparator=","
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'pl-4',
            )}
          />
          {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
        </div>

        <Button type="button" onClick={handleAddTransport} className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Toevoegen
        </Button>
      </div>

      {fields.length > 0 ? (
        <div className="h-96 overflow-y-auto space-y-2 p-2 rounded-md border">
          {fields.map((field, index) => (
            <Card key={field.id} className="p-4 relative border bg-muted">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h4 className="text-base font-semibold">
                    {getValues(`transports.${index}.description`) || 'Onbekende Transport'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Bedrag: {formatEuro(getValues(`transports.${index}.amount`))}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  type="button"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">Nog geen transport toegevoegd</p>
      )}
    </div>
  );
};