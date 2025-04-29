
import React from "react";
import { COLUMN_CLASSES } from "./line-items/constants";

export const LineItemsTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-muted">
        <th className="text-center py-1 px-2 font-medium border-b border-r border-[#E1E3E6] w-[60px]">Aantal</th>
        <th className="text-center py-1 px-2 font-medium border-b border-r border-[#E1E3E6] w-[90px]">Eenheid</th>
        <th className="text-left py-1 px-2 font-medium border-b border-r border-[#E1E3E6] w-[220px]">Product/Dienst</th>
        <th className="text-right py-1 px-2 font-medium border-b border-r border-[#E1E3E6] w-[110px]">Eenheidsprijs</th>
        <th className="text-center py-1 px-2 font-medium border-b border-r border-[#E1E3E6] w-[70px]">BTW %</th>
        <th className="text-right py-1 px-2 font-medium border-b border-r border-[#E1E3E6] w-[120px]">Regel totaal</th>
        <th className="text-center py-1 px-2 font-medium border-b border-[#E1E3E6] w-[40px]"></th>
      </tr>
    </thead>
  );
};
