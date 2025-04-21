
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { QuoteLineItem } from "@/types";
import { ProductSearch } from "@/components/quotes/line-items/ProductSearch";
import { QuantityInput } from "@/components/quotes/line-items/QuantityInput";
import { UnitSelect } from "@/components/quotes/line-items/UnitSelect";
import { Product } from "@/types/product";

interface LineItemRowProps {
  item: QuoteLineItem;
  index: number;
  onRemove: () => void;
  onChange: (updatedItem: QuoteLineItem) => void;
  productSuggestions?: Product[];
  onProductSearch: (title: string) => void;
  disabled?: boolean;
}

const colClasses = [
  "px-2 py-1 text-center w-[70px]",   // aantal
  "px-2 py-1 text-center w-[90px]",   // eenheid
  "px-2 py-1 text-left  w-[210px]",   // product/dienst
  "px-2 py-1 text-left  w-[260px]",   // beschrijving
  "px-2 py-1 text-right w-[120px]",   // eenheidsprijs
  "px-2 py-1 text-right w-[130px]",   // regel totaal
  "px-2 py-1 text-center w-[46px]",   // verwijder
];

export const LineItemRow: React.FC<LineItemRowProps> = ({
  item,
  index,
  onRemove,
  onChange,
  productSuggestions,
  onProductSearch,
  disabled = false,
}) => {
  // Veld update handler
  const handleChange = (field: keyof QuoteLineItem, value: any) => {
    const updatedItem = { ...item, [field]: value };
    if (field === "pricePerUnit" || field === "quantity") {
      const price = field === "pricePerUnit" ? value : item.pricePerUnit;
      const quantity = field === "quantity" ? value : item.quantity;
      updatedItem.total = price * quantity;
    }
    onChange(updatedItem);
  };

  return (
    <tr className="border-b hover:bg-muted transition-colors">
      {/* Aantal */}
      <td className={colClasses[0]}>
        <QuantityInput
          value={item.quantity}
          onChange={(value) => handleChange("quantity", value)}
          disabled={disabled}
        />
      </td>

      {/* Eenheid */}
      <td className={colClasses[1]}>
        <UnitSelect
          value={item.unit}
          onChange={(value) => handleChange("unit", value)}
          disabled={disabled}
        />
      </td>

      {/* Product/Dienst */}
      <td className={colClasses[2]}>
        <ProductSearch
          value={item.description}
          onChange={(value) => handleChange("description", value)}
          onSearch={onProductSearch}
          suggestions={productSuggestions || []}
          disabled={disabled}
          label="" // geen label nodig in tabel
        />
      </td>

      {/* Uitgebreide beschrijving */}
      <td className={colClasses[3]}>
        <Textarea
          id={`detailedDescription-${index}`}
          placeholder="Extra toelichting (optioneel)"
          value={item.detailedDescription || ""}
          onChange={(e) => handleChange("detailedDescription", e.target.value)}
          rows={2}
          className="resize-none min-h-[38px] max-h-[58px] text-sm"
          disabled={disabled}
        />
      </td>

      {/* Eenheidsprijs */}
      <td className={colClasses[4]}>
        <Input
          id={`price-${index}`}
          type="number"
          min="0"
          step="0.01"
          value={item.pricePerUnit}
          onChange={(e) => handleChange("pricePerUnit", parseFloat(e.target.value) || 0)}
          className="text-right"
          disabled={disabled}
        />
      </td>

      {/* Regel totaal */}
      <td className={colClasses[5]}>
        <Input
          id={`total-${index}`}
          type="number"
          value={item.total}
          readOnly
          className="bg-muted text-right"
          disabled={disabled}
        />
      </td>

      {/* Verwijderknop */}
      <td className={colClasses[6]}>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8"
          disabled={disabled}
          tabIndex={-1}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
};

export default LineItemRow;
