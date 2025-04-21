
import React from "react";

interface QuoteLineItemsProps {
  lineItems: any[];
  formatCurrency: (amount: number) => string;
}

export const QuoteLineItems = ({ lineItems, formatCurrency }: QuoteLineItemsProps) => {
  return (
    <div className="w-full min-w-[600px]">
      <table className="w-full text-sm border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="text-center py-3 px-4 bg-primary/5 border-y rounded-l-md font-medium">Aantal</th>
            <th className="text-center py-3 px-4 bg-primary/5 border-y font-medium">Eenheid</th>
            <th className="text-left py-3 px-4 bg-primary/5 border-y font-medium">Product/Dienst</th>
            <th className="text-right py-3 px-4 bg-primary/5 border-y font-medium">Eenheidsprijs</th>
            <th className="text-right py-3 px-4 bg-primary/5 border-y rounded-r-md font-medium">Regel totaal</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item: any) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="text-center py-3 px-4 border-b">{item.quantity}</td>
              <td className="text-center py-3 px-4 border-b">{item.unit}</td>
              <td className="py-3 px-4 border-b">
                <div>
                  <div>{item.description}</div>
                  {item.detailedDescription && (
                    <div className="text-xs text-gray-500 mt-1">{item.detailedDescription}</div>
                  )}
                </div>
              </td>
              <td className="text-right py-3 px-4 border-b">{formatCurrency(item.pricePerUnit)}</td>
              <td className="text-right py-3 px-4 border-b font-medium">{formatCurrency(item.total)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="text-right py-4 px-4 font-medium">Totaal:</td>
            <td className="text-right py-4 px-4 font-bold text-primary">
              {formatCurrency(lineItems.reduce((sum, item) => sum + item.total, 0))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
