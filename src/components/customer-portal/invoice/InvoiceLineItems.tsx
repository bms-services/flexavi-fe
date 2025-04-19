
interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  vatRate: number;
  total: number;
}

interface InvoiceLineItemsProps {
  lineItems: LineItem[];
  formatCurrency: (amount: number) => string;
}

export const InvoiceLineItems = ({ lineItems, formatCurrency }: InvoiceLineItemsProps) => {
  return (
    <>
      <h3 className="text-sm font-medium text-gray-500 pb-2 border-b">Factuurregels</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Beschrijving</th>
              <th className="text-center py-2">Aantal</th>
              <th className="text-center py-2">Eenheid</th>
              <th className="text-right py-2">Prijs per eenheid</th>
              <th className="text-right py-2">BTW%</th>
              <th className="text-right py-2">Totaal</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.description}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-center py-2">{item.unit}</td>
                <td className="text-right py-2">{formatCurrency(item.pricePerUnit)}</td>
                <td className="text-right py-2">{item.vatRate}%</td>
                <td className="text-right py-2">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
