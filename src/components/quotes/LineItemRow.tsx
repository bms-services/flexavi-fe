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
import { formatEuro, formatNormalizeCurrency } from "@/utils/format";

interface LineItemRowProps {
  index: number;
  onRemove: () => void;
  disabled?: boolean;
}

export const LineItemRow: React.FC<LineItemRowProps> = ({ index, onRemove, disabled = false }) => {
  const { register, control, setValue, formState: { errors } } = useFormContext<QuotationReq>();

  const productId = useWatch({ control, name: `items.${index}.product_id` });
  const productTitle = useWatch({ control, name: `items.${index}.product_title` });

  const quantityRaw = useWatch({ control, name: `items.${index}.quantity` });
  const priceRaw = useWatch({ control, name: `items.${index}.unit_price` });
  // const vatRateRaw = useWatch({ control, name: `items.${index}.vat_amount` });

  const quantity = formatNormalizeCurrency(quantityRaw);
  const price = formatNormalizeCurrency(priceRaw);
  // const vatRate = formatNormalizeCurrency(vatRateRaw);
  const total = quantity * price;

  useEffect(() => {
    setValue(`items.${index}.total`, total);
  }, [quantity, price, index, setValue]);

  const handleProductSelect = (product: ProductRes) => {
    setValue(`items.${index}.product_id`, product.id);
    setValue(`items.${index}.product_title`, product.title);
    setValue(`items.${index}.title`, product.title);
    setValue(`items.${index}.description`, product.description || "");
    setValue(`items.${index}.unit`, product.unit);
    setValue(`items.${index}.unit_price`, product.price);
    setValue(`items.${index}.vat_amount`, product.btw_percentage);
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
            {...register(`items.${index}.quantity`, {
              valueAsNumber: true,
              required: "Hoeveelheid is verplicht",
              validate: {
                positive: value => value > 0 || "Hoeveelheid moet groter zijn dan 0",
                integer: value => Number.isInteger(value) || "Hoeveelheid moet een  geheel getal zijn",
              },
            })}
            disabled={disabled} />
          {errors.items?.[index]?.quantity && (
            <span className="text-red-500 text-xs">
              {errors.items[index].quantity.message}
            </span>
          )}
        </td>

        {/* Unit */}
        <td className={`${COLUMN_CLASSES[1]} ${productId ? "bg-gray-300" : ""}`}>
          <input type="text" className={`${INLINE_INPUT_STYLE} text-center`}
            {...register(`items.${index}.unit`, {
              required: "Eenheid is verplicht",
              pattern: { value: /^[a-zA-Z]+$/, message: "Eenheid mag alleen letters bevatten" },
            })}
            disabled={disabled || !!productId}
          />
          {errors.items?.[index]?.unit && (
            <span className="text-red-500 text-xs">
              {errors.items[index].unit.message}
            </span>
          )}
        </td>

        {/* Title + Product search */}
        <td className={COLUMN_CLASSES[2]}>
          <Controller
            control={control}
            name={`items.${index}.title`}
            rules={{ required: "Titel is verplicht" }}
            render={({ field }) => (
              <LineProductCell
                value={field.value}
                onChange={field.onChange}
                onProductSelect={handleProductSelect}
                disabled={disabled}
              />
            )}
          />
          {errors.items?.[index]?.title && (
            <span className="text-red-500 text-xs">
              {errors.items[index].title.message}
            </span>
          )}
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
                onValueChange={(value) => field.onChange(value)}
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
                onValueChange={(value) => field.onChange(value)}
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