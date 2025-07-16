import { SelectList } from "@/components/ui/select-list";
import { useGetWorkAgreements } from "@/zustand/hooks/useWorkAgreement";
import { ParamGlobal } from "@/zustand/types/apiT";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const WizardWorkAgreementStep: React.FC = () => {
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

  const workAgreementsZ = useGetWorkAgreements(params);

  return (
    <div className="space-y-4 w-[600px]">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een bestaande werkovereenkomst</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande werkovereenkomst of maak een nieuwe aan voor dit project
        </p>
      </div>

      <SelectList
        name="agreements"
        placeholder="Zoek bestaande werkovereenkomsten..."
        items={workAgreementsZ.data?.result.data ?? []}
        selectedIdsField="agreements"
        onSearchChange={setSearchInput}
        onLoadMore={() => {
          if ((params.page ?? 1) < (workAgreementsZ.data?.result.meta.last_page || 1)) {
            setParams(prev => ({ ...prev, page: (prev.page ?? 1) + 1 }));
          }
        }}
        renderItem={(agreement, selected) => (
          <div
            className={`p-2 rounded-md transition-colors border shadow-sm ${selected
              ? "bg-primary text-white border-primary"
              : "bg-white hover:bg-blue-50 hover:border-blue-200"
              }`}
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm md:text-base">{agreement.description_work}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{agreement.start_date}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{agreement.status}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
};
