import { SelectList } from "@/components/ui/select-list";
import { useGetInvoices } from "@/zustand/hooks/useInvoice"; // Ganti hook
import { ParamGlobal } from "@/zustand/types/apiT";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const WizardInvoiceStep: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  useEffect(() => {
    setParams(prev => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  const invoicesZ = useGetInvoices(params);
  return (
    <div className="space-y-4 w-[600px]">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een bestaande factuur</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande factuur of maak een nieuwe aan voor dit project
        </p>
      </div>

      <SelectList
        name="invoices"
        placeholder="Zoek bestaande facturen..."
        items={invoicesZ.data?.result.data ?? []}
        selectedIdsField="invoices"
        onSearchChange={setSearchInput}
        onLoadMore={() => {
          if ((params.page ?? 1) < (invoicesZ.data?.result.meta.last_page || 1)) {
            setParams(prev => ({ ...prev, page: (prev.page ?? 1) + 1 }));
          }
        }}
        renderItem={(invoice, selected) => (
          <div
            className={`p-2 rounded-md transition-colors border shadow-sm ${selected
              ? "bg-primary text-white border-primary"
              : "bg-white hover:bg-blue-50 hover:border-blue-200"
              }`}
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm md:text-base">{invoice.invoice_number}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{invoice.expiration_date}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{invoice.status}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
};
