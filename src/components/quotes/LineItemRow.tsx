
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

const vatOptions = [
  { value: 21, label: "21%" },
  { value: 9, label: "9%" },
  { value: 0, label: "0%" },
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
  // Handler
  const handleChange = (field: keyof QuoteLineItem, value: any) => {
    const updatedItem = { ...item, [field]: value };
    if (field === "pricePerUnit" || field === "quantity" || field === "vatRate") {
      const price = field === "pricePerUnit" ? value : item.pricePerUnit;
      const quantity = field === "quantity" ? value : item.quantity;
      const vat = field === "vatRate" ? value : item.vatRate ?? 21;
      const totalExVat = price * quantity;
      updatedItem.total = Math.round((totalExVat + (totalExVat * (vat/100))) * 100) / 100;
    }
    onChange(updatedItem);
  };

  // Kolom classes & stylings
  const colClasses = [
    "px-2 py-2 text-center align-middle w-[60px]",     // aantal
    "px-2 py-2 text-center align-middle w-[90px]",     // eenheid
    "px-2 py-2 text-left align-middle w-[220px]",      // product/dienst
    "px-2 py-2 text-right align-middle w-[110px]",     // eenheidsprijs
    "px-2 py-2 text-center align-middle w-[70px]",     // btw
    "px-2 py-2 text-right align-middle w-[120px]",     // regel totaal
    "px-2 py-2 text-center align-middle w-[40px]",     // verwijder
  ];

  return (
    <>
      <tr className="border-b border-[#E1E3E6] hover:bg-muted/70 transition-colors">
        {/* Aantal */}
        <td className={colClasses[0]}>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={item.quantity}
            onChange={(e) => handleChange("quantity", parseFloat(e.target.value) || 0)}
            className="text-center"
            disabled={disabled}
          />
        </td>
        {/* Eenheid */}
        <td className={colClasses[1]}>
          <Input
            type="text"
            value={item.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
            className="text-center"
            disabled={disabled}
          />
        </td>
        {/* Product/Dienst */}
        <td className={colClasses[2]}>
          <Input
            type="text"
            value={item.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="text-left"
            disabled={disabled}
          />
        </td>
        {/* Eenheidsprijs */}
        <td className={colClasses[3]}>
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
        {/* BTW tarief */}
        <td className={colClasses[4]}>
          <select
            value={item.vatRate ?? 21}
            onChange={e => handleChange("vatRate", parseFloat(e.target.value))}
            className="w-full text-center bg-transparent border-none outline-none"
            disabled={disabled}
            style={{ minWidth: 45 }}
          >
            {vatOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
      {/* Beschrijving onderaan, onder de eerste 3 kolommen */}
      <tr className="border-b border-[#E1E3E6] bg-gray-50">
        <td className="pt-1 pb-2 px-2" colSpan={3}>
          <Textarea
            id={`detailedDescription-${index}`}
            placeholder="Uitgebreide beschrijving (optioneel)"
            value={item.detailedDescription || ""}
            onChange={(e) => handleChange("detailedDescription", e.target.value)}
            rows={2}
            className="resize-none min-h-[34px] max-h-[68px] text-sm w-full bg-gray-50 border-none outline-none text-left"
            disabled={disabled}
          />
        </td>
        {/* 3 lege cellen zodat de rest netjes blijft */}
        <td colSpan={3}></td>
        {/* Lege cel voor verwijderknop hieronder */}
        <td></td>
      </tr>
    </>
  );
};

export default LineItemRow;

