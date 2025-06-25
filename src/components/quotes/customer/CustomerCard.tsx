import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SelectSearchAsyncCreatable, Option } from "@/components/ui/react-select/select-search-async-creatable";
import { LeadRes } from "@/zustand/types/leadT";
import { getLeadsService } from "@/zustand/services/leadService"; // pastikan endpoint service kamu
import { useFormContext } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";

interface CustomerCardProps {
  disabled?: boolean;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  disabled = false
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<QuotationReq>();

  const [defaultOptions, setDefaultOptions] = useState<Option[]>([]);

  useEffect(() => {
    loadOptions("").then(setDefaultOptions);
  }, []);

  const loadOptions = async (search: string): Promise<Option[]> => {
    const response = await getLeadsService({
      page: 1,
      per_page: 20,
      search,
      filters: {},
      sorts: {},
    });

    return response.result.data.map((lead: LeadRes) => ({
      label: `${lead.name} (${lead.email})`,
      value: lead.id,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Klant</CardTitle>
        <CardDescription>Selecteer meerdere klanten</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Klant selecteren</Label>

          <SelectSearchAsyncCreatable
            isMulti
            isClearable
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
            // value={selectedOptions}
            // onChange={(value) => handleChange(value as Option[])}
            isDisabled={disabled}
            rules={{
              name: "leads",
              control,
              options: {
                required: "Selecteer ten minste één klant",
              },
              errors
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};