
import React from "react";

interface QuoteLineItemsProps {
  lineItems: any[];
  formatCurrency: (amount: number) => string;
}

const QuoteLineItems = ({ lineItems, formatCurrency }: QuoteLineItemsProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Beschrijving</th>
            <th className="text-center py-2">Aantal</th>
            <th className="text-center py-2">Eenheid</th>
            <th className="text-right py-2">Prijs per eenheid</th>
            <th className="text-right py-2">Totaal</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item: any) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.description}</td>
              <td className="text-center py-2">{item.quantity}</td>
              <td className="text-center py-2">{item.unit}</td>
              <td className="text-right py-2">{formatCurrency(item.pricePerUnit)}</td>
              <td className="text-right py-2">{formatCurrency(item.total)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="text-right py-4 font-medium">Totaal:</td>
            <td className="text-right py-4 font-bold">{formatCurrency(lineItems.reduce((sum, item) => sum + item.total, 0))}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuoteLineItems;
