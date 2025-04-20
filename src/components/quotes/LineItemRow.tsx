
import React, { useState, useRef, useEffect } from "react";
import { QuoteLineItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { UnitSelect } from "./line-items/UnitSelect";
import { ProductSearch } from "./line-items/ProductSearch";
import { QuantityInput } from "./line-items/QuantityInput";

interface LineItemRowProps {
  item: QuoteLineItem;
  onLineItemChange: (item: QuoteLineItem) => void;
  onRemove: () => void;
  productSuggestions: any[];
  onProductSearch: (title: string) => void;
  disabled?: boolean;
}

export const LineItemRow: React.FC<LineItemRowProps> = ({
  item,
  onLineItemChange,
  onRemove,
  productSuggestions,
  onProductSearch,
  disabled = false
}) => {
  const [localPricePerUnit, setLocalPricePerUnit] = useState<string>(
    item.pricePerUnit?.toString() || "0"
  );
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const price = parseFloat(localPricePerUnit);
    if (!isNaN(price)) {
      const total = price * item.quantity;
      onLineItemChange({
        ...item,
        pricePerUnit: price,
        total
      });
    }
  }, [localPricePerUnit]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPricePerUnit(e.target.value);
  };

  const handleQuantityChange = (quantity: number) => {
    const price = parseFloat(localPricePerUnit);
    const total = isNaN(price) ? 0 : price * quantity;
    onLineItemChange({
      ...item,
      quantity,
      total
    });
  };

  const handleDescriptionChange = (description: string) => {
    onLineItemChange({
      ...item,
      description
    });
  };

  const handleUnitChange = (unit: string) => {
    onLineItemChange({
      ...item,
      unit
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-5">
        <ProductSearch
          value={item.description}
          onChange={handleDescriptionChange}
          suggestions={productSuggestions}
          onSearch={onProductSearch}
          disabled={disabled}
        />
      </div>
      
      <div className="col-span-2">
        <QuantityInput
          value={item.quantity}
          onChange={handleQuantityChange}
          disabled={disabled}
        />
      </div>
      
      <div className="col-span-2">
        <UnitSelect
          value={item.unit}
          onChange={handleUnitChange}
          disabled={disabled}
        />
      </div>
      
      <div className="col-span-2">
        <Input
          type="number"
          step="0.01"
          value={localPricePerUnit}
          onChange={handlePriceChange}
          className="text-right"
          disabled={disabled}
        />
      </div>
      
      <div className="col-span-1 flex items-center justify-between">
        <span className="text-sm font-medium">
          {formatCurrency(item.total || 0)}
        </span>
        {!disabled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0 ml-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
