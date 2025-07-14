import { SelectList } from "@/components/ui/select-list";
import { useGetMyEmployees } from "@/zustand/hooks/useSetting";
import { ParamGlobal } from "@/zustand/types/apiT";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const WizardEmployeeStep: React.FC = () => {
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

  const employeesZ = useGetMyEmployees(params);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een bestaande medewerker</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande medewerker of maak een nieuwe aan voor dit project
        </p>
      </div>

      <SelectList
        name="staffs"
        placeholder="Zoek bestaande medewerkers..."
        items={employeesZ.data?.result.data ?? []}
        selectedIdsField="staffs"
        onSearchChange={setSearchInput}
        onLoadMore={() => {
          if ((params.page ?? 1) < (employeesZ.data?.result.meta.last_page || 1)) {
            setParams(prev => ({ ...prev, page: (prev.page ?? 1) + 1 }));
          }
        }}
        renderItem={(employee, selected) => (
          <div
            className={`p-2 rounded-md transition-colors border shadow-sm ${selected
              ? "bg-primary text-white border-primary"
              : "bg-white hover:bg-blue-50 hover:border-blue-200"
              }`}
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm md:text-base">{employee.user.name}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{employee.user.phone}</p>
              <p className={`${selected ? "text-white" : "text-muted-foreground"}`}>{employee.user.email}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
};
