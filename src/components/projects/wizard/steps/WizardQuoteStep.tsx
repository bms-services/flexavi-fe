import { SelectList } from "@/components/ui/select-list";
import { useGetQuotations } from "@/zustand/hooks/useQuotation";
import { ParamGlobal } from "@/zustand/types/apiT";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const WizardQuoteStep: React.FC = () => {
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

  const quotesZ = useGetQuotations(params);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een bestaande quote</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande quote of maak een nieuwe aan voor dit project
        </p>
      </div>

      <SelectList
        name="quotes"
        placeholder="Zoek bestaande quotes..."
        items={quotesZ.data?.result.data ?? []}
        selectedIdsField="quotes"
        onSearchChange={setSearchInput}
        onLoadMore={() => {
          if ((params.page ?? 1) < (quotesZ.data?.result.meta.last_page || 1)) {
            setParams(prev => ({ ...prev, page: (prev.page ?? 1) + 1 }));
          }
        }}
        renderItem={(quote, selected) => (
          <div
            className={`p-2 rounded-md transition-colors border shadow-sm ${selected
              ? "bg-primary text-white border-primary"
              : "bg-white hover:bg-blue-50 hover:border-blue-200"
              }`}
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm md:text-base">{quote.quote_number}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{quote.description}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{quote.subtotal}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
};
