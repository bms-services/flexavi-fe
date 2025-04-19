
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface InvoiceDetailsProps {
  invoice: {
    createdAt: string;
    dueDate: string;
  };
}

export const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Factuur details</h3>
      <div className="bg-gray-50 p-4 rounded-md space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Factuurdatum: {format(new Date(invoice.createdAt), "d MMMM yyyy", {
            locale: nl,
          })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Vervaldatum: {format(new Date(invoice.dueDate), "d MMMM yyyy", {
            locale: nl,
          })}</span>
        </div>
      </div>
    </div>
  );
};
