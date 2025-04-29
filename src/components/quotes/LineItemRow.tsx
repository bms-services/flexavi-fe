
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { QuoteLineItem } from "@/types";
import { Product } from "@/types/product";
import { UnitSelect } from "@/components/quotes/line-items/UnitSelect";
import { DescriptionCell } from "@/components/quotes/line-items/DescriptionCell";
import { DetailedDescriptionRow } from "@/components/quotes/line-items/DetailedDescriptionRow";
import { updateLineItem } from "@/components/quotes/line-items/lineItemUtils";
import { VAT_OPTIONS, COLUMN_CLASSES, INLINE_INPUT_STYLE } from "@/components/quotes/line-items/constants";

interface LineItemRowProps {
  item: QuoteLineItem;
  index: number;
  onRemove: () => void;
  onChange: (updatedItem: QuoteLineItem) => void;
  productSuggestions?: Product[];
  onProductSearch: (title: string) => void;
  disabled?: boolean;
}

export const LineItemRow: React.FC<LineItemRowProps> = ({
  item,
  index,
  onRemove,
  onChange,
  productSuggestions,
  onProductSearch,
  disabled = false,
}) => {
  // Handler for field changes
  const handleChange = (field: keyof QuoteLineItem, value: any) => {
    const updatedItem = updateLineItem(item, field, value);
    onChange(updatedItem);
  };

  // Handler for product selection
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
  };

  return (
    <>
      <tr className="border-b border-[#E1E3E6] hover:bg-muted/70 transition-colors">
        {/* Aantal */}
        <td className={COLUMN_CLASSES[0]}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={item.quantity}
            onChange={(e) => handleChange("quantity", parseFloat(e.target.value) || 0)}
            className={`${INLINE_INPUT_STYLE} text-center`}
            disabled={disabled}
          />
        </td>
        {/* Eenheid */}
        <td className={COLUMN_CLASSES[1]}>
          <UnitSelect 
            value={item.unit} 
            onChange={(value) => handleChange("unit", value)}
            disabled={disabled}
          />
        </td>
        {/* Product/Dienst */}
        <td className={COLUMN_CLASSES[2]}>
          <DescriptionCell
            value={item.description}
            onChange={(value) => handleChange("description", value)}
            onProductSearch={onProductSearch}
            productSuggestions={productSuggestions}
            onProductSelect={handleProductSelect}
            disabled={disabled}
          />
        </td>
        {/* Eenheidsprijs */}
        <td className={COLUMN_CLASSES[3]}>
          <input
            id={`price-${index}`}
            type="number"
            min="0"
            step="0.01"
            value={item.pricePerUnit}
            onChange={(e) => handleChange("pricePerUnit", parseFloat(e.target.value) || 0)}
            className={`${INLINE_INPUT_STYLE} text-right`}
            disabled={disabled}
          />
        </td>
        {/* BTW tarief */}
        <td className={COLUMN_CLASSES[4]}>
          <select
            value={item.vatRate ?? 21}
            onChange={e => handleChange("vatRate", parseFloat(e.target.value))}
            className={`${INLINE_INPUT_STYLE} text-center`}
            disabled={disabled}
            style={{ minWidth: 45 }}
          >
            {VAT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </td>
        {/* Regel totaal */}
        <td className={COLUMN_CLASSES[5]}>
          <input
            id={`total-${index}`}
            type="number"
            value={item.total}
            readOnly
            className={`${INLINE_INPUT_STYLE} text-right font-medium`}
            disabled={disabled}
          />
        </td>
        {/* Verwijderknop */}
        <td className={COLUMN_CLASSES[6]}>
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
      <DetailedDescriptionRow
        value={item.detailedDescription || ""}
        onChange={(value) => handleChange("detailedDescription", value)}
        index={index}
        disabled={disabled}
      />
    </>
  );
};

export default LineItemRow;
