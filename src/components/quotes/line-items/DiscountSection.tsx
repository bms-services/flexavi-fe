import { useFormContext, useWatch } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";
import * as Toggle from "@radix-ui/react-toggle";
import CurrencyInputCore from "react-currency-input-field";
import { Euro, Percent } from "lucide-react";
import { formatEuro, formatNormalizeCurrency } from "@/utils/format";

interface DiscountSectionProps {
  subtotal: number;
  className?: string;
}

export const DiscountSection: React.FC<DiscountSectionProps> = ({ subtotal, className }) => {
  const { control, setValue } = useFormContext<QuotationReq>();
  const discountType = useWatch({ control, name: "discount_type" });
  const discountValue = useWatch({ control, name: "discount_amount" });

  const calculateDiscount = () => {
    const valueNum = formatNormalizeCurrency(discountValue);
    return discountType === "percentage"
      ? (subtotal * valueNum) / 100
      : valueNum;
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-end gap-2">
        <Toggle.Root
          pressed={discountType === "percentage"}
          onPressedChange={(pressed) =>
            setValue("discount_type", pressed ? "percentage" : "fixed")
          }
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary data-[state=on]:text-white transition-colors"
          aria-label="Toggle discount type"
        >
          {discountType === "percentage" ? <Percent className="w-4 h-4" /> : <Euro className="w-4 h-4" />}
        </Toggle.Root>

        <div className="relative w-[120px]">
          <CurrencyInputCore
            value={discountValue}
            onValueChange={(value) =>
              setValue("discount_amount", value as unknown as number)
            }
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            allowNegativeValue={false}
            allowDecimals={true}
            suffix={discountType === "percentage" ? " %" : ""}
            prefix={discountType === "fixed" ? "€ " : ""}
            className="w-full text-right border rounded px-3 py-2 focus-visible:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-base border-t pt-2 mt-2">
        <span className="font-medium">
          Korting
        </span>
        <span className="font-bold text-red-500">
          {formatEuro(calculateDiscount())}
        </span>
      </div>
    </div>
  );
};