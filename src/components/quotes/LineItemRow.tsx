import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import { LineProductCell } from "@/components/quotes/line-items/LineProductCell";
import { DetailedDescriptionRow } from "@/components/quotes/line-items/DetailedDescriptionRow";
import { COLUMN_CLASSES, INLINE_INPUT_STYLE } from "@/components/quotes/line-items/constants";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";
import CurrencyInputCore from "react-currency-input-field";
import { ProductRes } from "@/zustand/types/productT";
import { formatEuro } from "@/utils/format";

interface LineItemRowProps {
  index: number;
  onRemove: () => void;
  disabled?: boolean;
}

export const LineItemRow: React.FC<LineItemRowProps> = ({ index, onRemove, disabled = false }) => {
  const { register, control, setValue } = useFormContext<QuotationReq>();

  const productId = useWatch({ control, name: `items.${index}.product_id` });
  const productTitle = useWatch({ control, name: `items.${index}.product_title` });
  const quantity = useWatch({ control, name: `items.${index}.quantity` });
  const pricePerUnit = useWatch({ control, name: `items.${index}.unit_price` });
  const vatRate = useWatch({ control, name: `items.${index}.vat_amount` });

  const total = ((quantity || 0) * (pricePerUnit || 0));

  useEffect(() => {
    setValue(`items.${index}.total`, parseFloat(total.toFixed(2)));
  }, [quantity, pricePerUnit, vatRate, total, index, setValue]);

  const handleProductSelect = (product: ProductRes) => {
    setValue(`items.${index}.product_id`, product.id);
    setValue(`items.${index}.product_title`, product.title);
    setValue(`items.${index}.title`, product.title);
    setValue(`items.${index}.description`, product.description || "");
    setValue(`items.${index}.unit`, product.unit);
    setValue(`items.${index}.unit_price`, parseFloat(product.price));
    setValue(`items.${index}.vat_amount`, parseFloat(product.btw_percentage));
  };

  const handleUnlinkProduct = () => {
    setValue(`items.${index}.product_id`, "");
  };

  return (
    <>
      <tr className="border-b border-[#E1E3E6] hover:bg-muted/70 transition-colors">

        {/* Quantity */}
        <td className={COLUMN_CLASSES[0]}>
          <input type="number" min="0" className={`${INLINE_INPUT_STYLE} text-center`}
            {...register(`items.${index}.quantity`, { valueAsNumber: true })} disabled={disabled} />
        </td>

        {/* Unit */}
        <td className={`${COLUMN_CLASSES[1]} ${productId ? "bg-gray-300" : ""}`}>
          <input type="text" className={`${INLINE_INPUT_STYLE} text-center`}
            {...register(`items.${index}.unit`)} disabled={disabled || !!productId} />
        </td>

        {/* Title + Product search */}
        <td className={COLUMN_CLASSES[2]}>
          <Controller
            control={control}
            name={`items.${index}.title`}
            render={({ field }) => (
              <LineProductCell
                value={field.value}
                onChange={field.onChange}
                onProductSelect={handleProductSelect}
                disabled={disabled}
              />
            )}
          />
          {productId && (
            <div className="flex justify-between items-center gap-2 mt-1">
              <div className="font-normal text-[14px]">
                <span>Linked Product{" "}</span>
                <span className="text-primary">
                  "{productTitle}"
                </span>
              </div>
              <X className="w-4 h-4 inline-block hover:text-red-500" onClick={handleUnlinkProduct} role="button" />
            </div>
          )}
        </td>

        {/* Unit Price */}
        <td className={COLUMN_CLASSES[3]}>
          <Controller
            control={control}
            name={`items.${index}.unit_price`}
            render={({ field }) => (
              <CurrencyInputCore
                value={field.value}
                onValueChange={(value) => field.onChange(parseFloat(value || "0"))}
                prefix="€ "
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                disabled={disabled}
                className={`${INLINE_INPUT_STYLE} text-center`}
              />
            )}
          />
        </td>

        {/* VAT */}
        <td className={`${COLUMN_CLASSES[4]} ${productId ? "bg-gray-300" : ""}`}>
          <Controller
            control={control}
            name={`items.${index}.vat_amount`}
            render={({ field }) => (
              <CurrencyInputCore
                value={field.value}
                onValueChange={(value) => field.onChange(parseFloat(value || "0"))}
                suffix=" %"
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                disabled={disabled || !!productId}
                className={`${INLINE_INPUT_STYLE} text-center`}
              />
            )}
          />
        </td>

        {/* Total */}
        <td className={COLUMN_CLASSES[5]}>
          <span className="text-center">
            {formatEuro(total)}
          </span>
        </td>

        {/* Remove button */}
        <td className={COLUMN_CLASSES[6]}>
          <Button type="button" variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8" disabled={disabled}>
            <Trash className="w-4 h-4" />
          </Button>
        </td>
      </tr>

      <Controller
        control={control}
        name={`items.${index}.description`}
        render={({ field }) => (
          <DetailedDescriptionRow value={field.value} onChange={field.onChange} index={index} disabled={disabled} />
        )}
      />
    </>
  );
};

export default LineItemRow;