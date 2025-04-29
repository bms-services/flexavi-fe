
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface DetailedDescriptionRowProps {
  value: string;
  onChange: (value: string) => void;
  index: number;
  disabled?: boolean;
}

export const DetailedDescriptionRow: React.FC<DetailedDescriptionRowProps> = ({
  value,
  onChange,
  index,
  disabled = false,
}) => {
  return (
    <tr className="border-b border-[#E1E3E6] bg-gray-50">
      <td className="pt-1 pb-2 px-2" colSpan={3}>
        <Textarea
          id={`detailedDescription-${index}`}
          placeholder="Uitgebreide beschrijving (optioneel)"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
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
  );
};
