import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { QuoteLineItem } from "@/types";
import { Product } from "@/types/product";
import { UnitSelect } from "@/components/quotes/line-items/UnitSelect";

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
  // State to manage suggestion visibility
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("description", e.target.value);
    onProductSearch(e.target.value);
    setShowSuggestions(true); // Show suggestions when typing
  };

  const handleProductSelect = (product: Product) => {
    // Update all fields with product data
    const updatedItem = {
      ...item,
      description: product.title,
      unit: product.unit,
      pricePerUnit: product.pricePerUnit,
      vatRate: product.vat,
      detailedDescription: product.description || item.detailedDescription,
    };

    // Recalculate the total
    const totalExVat = updatedItem.pricePerUnit * updatedItem.quantity;
    updatedItem.total = Math.round((totalExVat + (totalExVat * (updatedItem.vatRate/100))) * 100) / 100;

    // Update the entire item with one call
    onChange(updatedItem);
    
    // Hide suggestions after selection
    setShowSuggestions(false);
  };

  // Kolom classes & stylings
  const colClasses = [
    "px-2 py-2 text-center align-middle w-[60px] border-r border-[#E1E3E6]",     // aantal
    "px-2 py-2 text-center align-middle w-[90px] border-r border-[#E1E3E6]",     // eenheid
    "px-2 py-2 text-left align-middle w-[220px] border-r border-[#E1E3E6]",      // product/dienst
    "px-2 py-2 text-right align-middle w-[110px] border-r border-[#E1E3E6]",     // eenheidsprijs
    "px-2 py-2 text-center align-middle w-[70px] border-r border-[#E1E3E6]",     // btw
    "px-2 py-2 text-right align-middle w-[120px] border-r border-[#E1E3E6]",     // regel totaal
    "px-2 py-2 text-center align-middle w-[40px]",     // verwijder
  ];

  // True inline inputs with transparent background and no borders
  const inlineInputStyle = "w-full bg-transparent border-none outline-none focus:ring-0 focus:outline-none p-0 h-auto";

  return (
    <>
      <tr className="border-b border-[#E1E3E6] hover:bg-muted/70 transition-colors">
        {/* Aantal */}
        <td className={colClasses[0]}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={item.quantity}
            onChange={(e) => handleChange("quantity", parseFloat(e.target.value) || 0)}
            className={`${inlineInputStyle} text-center`}
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
          <div className="relative">
            <input
              type="text"
              value={item.description}
              onChange={handleProductChange}
              className={`${inlineInputStyle} text-left`}
              disabled={disabled}
              autoComplete="off"
              onFocus={() => productSuggestions && productSuggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Small delay to allow click on suggestion
            />
            {productSuggestions && productSuggestions.length > 0 && showSuggestions && !disabled && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto left-0 right-0">
                {productSuggestions.map((product, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProductSelect(product)}
                  >
                    <div>{product.title}</div>
                    <div className="text-xs text-gray-500">{product.pricePerUnit} EUR</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </td>
        {/* Eenheidsprijs */}
        <td className={colClasses[3]}>
          <input
            id={`price-${index}`}
            type="number"
            min="0"
            step="0.01"
            value={item.pricePerUnit}
            onChange={(e) => handleChange("pricePerUnit", parseFloat(e.target.value) || 0)}
            className={`${inlineInputStyle} text-right`}
            disabled={disabled}
          />
        </td>
        {/* BTW tarief */}
        <td className={colClasses[4]}>
          <select
            value={item.vatRate ?? 21}
            onChange={e => handleChange("vatRate", parseFloat(e.target.value))}
            className={`${inlineInputStyle} text-center`}
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
          <input
            id={`total-${index}`}
            type="number"
            value={item.total}
            readOnly
            className={`${inlineInputStyle} text-right font-medium`}
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
