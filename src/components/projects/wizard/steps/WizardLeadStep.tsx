import { SelectList } from "@/components/ui/select-list";
import { useGetLeads } from "@/zustand/hooks/useLead";
import { ParamGlobal } from "@/zustand/types/apiT";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const WizardLeadStep: React.FC = () => {
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

  const leadsZ = useGetLeads(params);

  return (
    <div className="space-y-4 w-[600px]">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een bestaande lead</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande lead of maak een nieuwe aan voor dit project
        </p>
      </div>

      <SelectList
        name="leads"
        rules={{ required: "Selecteer een lead" }}
        placeholder="Zoek bestaande leads..."
        items={leadsZ.data?.result.data ?? []}
        selectedIdsField="leads"
        onSearchChange={setSearchInput}
        onLoadMore={() => {
          if ((params.page ?? 1) < (leadsZ.data?.result.meta.last_page || 1)) {
            setParams(prev => ({ ...prev, page: (prev.page ?? 1) + 1 }));
          }
        }}
        renderItem={(lead, selected) => (
          <div
            className={`p-2 rounded-md transition-colors border shadow-sm ${selected
              ? "bg-primary text-white border-primary"
              : "bg-white hover:bg-blue-50 hover:border-blue-200"
              }`}
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm md:text-base">{lead.name}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{lead.phone}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{lead.email}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
};
