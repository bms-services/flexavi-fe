
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkAgreementReq, WorkAgreementStatusMap } from "@/zustand/types/workAgreementT";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { useGetQuotations } from "@/zustand/hooks/useQuotation";
import { ParamGlobal } from "@/zustand/types/apiT";
import { useDebounce } from "use-debounce";


export const WorkAgreementDetailsForm: React.FC = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<WorkAgreementReq>();
  const { t } = useTranslation();
  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);

  const getQuotationsZ = useGetQuotations(params);

  useEffect(() => {
    setParams(prev => ({
      ...prev,
      search: debouncedSearch
    }));
  }, [debouncedSearch]);
  const handleSelectQuotation = (quotationId: string) => {
    const currentQuotes = watch("quotes") || [];
    if (currentQuotes.includes(quotationId)) {
      setValue("quotes", currentQuotes.filter((id) => id !== quotationId));
    } else {
      setValue("quotes", [...currentQuotes, quotationId]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          label="Zoek geaccepteerde offertes"
          placeholder="Zoek geaccepteerde offertes..."
          id="searchQuotation"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}

        />
        <div className="h-96 overflow-y-auto space-y-2 p-2 bg-muted rounded-md border">
          {getQuotationsZ.data?.result.data.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Geen geaccepteerde offertes gevonden
            </div>
          ) : (
            getQuotationsZ.data?.result.data.map((quote) => {
              const selected = watch("quotes")?.includes(quote.id);
              return (
                <div
                  key={quote.id}
                  className={`p-4 rounded-md transition-colors border cursor-pointer shadow-sm
                    ${selected
                      ? "bg-primary text-white border-primary"
                      : "bg-white hover:bg-blue-50 hover:border-blue-200"}
          `}
                  onClick={() => handleSelectQuotation(quote.id)}
                >
                  <div className="font-semibold text-sm md:text-base">
                    {quote.quote_number} - {quote.leads?.[0]?.name || "Onbekend"}
                  </div>
                  {quote.description && (
                    <div className={`text-sm md:text-base text-muted-foreground mt-1 ${selected ? "text-white" : ""}`}>
                      {quote.description}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Omschrijving"
          id="description"
          placeholder="Bijv. Dakrenovatie en isolatie - Werkovereenkomst"
          rules={{
            register,
            name: "description",
            options: {
              required: t('workAgreement.error.required.description'),
            },
            errors,
          }}
        />
        <Textarea
          label="Beschrijving werkzaamheden"
          id="workDescription"
          placeholder="Beschrijf de uit te voeren werkzaamheden"
          rows={4}
          rules={{
            register,
            name: "description_work",
            options: {
              required: t('workAgreement.error.required.workDescription'),
            },
            errors,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Garantie (jaren)"
            id="warranty"
            type="number"
            min="0"
            max="30"
            rules={{
              register,
              name: "warranty",
              options: {
                required: t('workAgreement.error.required.warranty'),
              },
              errors,
            }}
          />

          <Input
            label="Startdatum"
            id="startDate"
            type="date"
            rules={{
              register,
              name: "start_date",
              options: {
                required: t('workAgreement.error.required.plannedStartDate'),
              },
              errors,
            }}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Controller
          control={control}
          name="status"
          rules={{ required: t('workAgreement.error.required.status') }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een status" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(WorkAgreementStatusMap).map(([value, option]) => (
                  <SelectItem key={value} value={value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.status && (
          <p className="text-red-500 text-sm mt-1">
            {errors.status.message}
          </p>
        )}
      </div>
    </div>
  );
};
