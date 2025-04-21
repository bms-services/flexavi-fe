
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Employee } from "@/types/employee-management";

interface TeamSelectionFormProps {
  form: UseFormReturn<Employee>;
}

export const TeamSelectionForm = ({ form }: TeamSelectionFormProps) => {
  const teams = [
    { id: "sales", label: "Verkoop team" },
    { id: "installation", label: "Uitvoerend team" },
    { id: "management", label: "Management team" },
    { id: "administration", label: "Administratie team" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Teams</h3>
      <div className="space-y-2">
        {teams.map((team) => {
          const teamIds = form.watch("teamIds") || [];
          const isSelected = teamIds.includes(team.id);
          
          return (
            <div key={team.id} className="flex items-center space-x-2">
              <Checkbox 
                checked={isSelected}
                onCheckedChange={(checked) => {
                  const currentTeams = [...teamIds];
                  if (checked) {
                    if (!currentTeams.includes(team.id)) {
                      form.setValue("teamIds", [...currentTeams, team.id]);
                    }
                  } else {
                    form.setValue(
                      "teamIds", 
                      currentTeams.filter(id => id !== team.id)
                    );
                  }
                }}
              />
              <span className="text-sm">{team.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
