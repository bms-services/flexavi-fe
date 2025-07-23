import { Input } from "@/components/ui/input";
import { InputCurrency } from "@/components/ui/input-currency";
import PostalCode from "@/components/ui/postal-code";
import { Textarea } from "@/components/ui/textarea";
import { ProjectReq } from "@/zustand/types/projectT";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const WizardInformation: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useFormContext<ProjectReq>();


  const startDate = watch("start_date");
  const endDate = watch("end_date");

  useEffect(() => {
    // ketika salah satu berubah, trigger validasi keduanya
    trigger(["start_date", "end_date"]);
  }, [startDate, endDate, trigger]);

  return (
    <div className="space-y-4 w-[600px]">
      <div>
        <h2 className="text-xl font-semibold">Projectinformatie</h2>
        <p className="text-muted-foreground">
          Vul de onderstaande informatie in om het project te creëren
        </p>
      </div>

      <div className="space-y-4">
        <Input
          name="name"
          label="Projectnaam"
          placeholder="Naam"
          rules={{
            register,
            name: "name",
            options: { required: "Naam is verplicht" },
            errors,
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="plannedStartDate"
            label="Geplande startdatum"
            type="date"
            rules={{
              register,
              name: "start_date",
              options: {
                required: t("project.error.required.startDate"),
                validate: (value) => {
                  const endDate = watch("end_date");
                  if (endDate && value && value > endDate) {
                    return "Startdatum mag niet na de einddatum liggen";
                  }
                  return true;
                },
              },
              errors,
            }}
          />
          <Input
            id="plannedStartDate"
            label="Geplande einddatum"
            type="date"
            rules={{
              register,
              name: "end_date",
              options: {
                required: t("project.error.required.endDate"),
                validate: (value) => {
                  const startDate = watch("start_date");
                  if (startDate && value && value < startDate) {
                    return "Einddatum mag niet vóór de startdatum liggen";
                  }
                  return true;
                },
              },
              errors,
            }}
          />
          <InputCurrency
            id="budget"
            label="Budget"
            rules={{
              control,
              name: "budget",
              options: { required: "Budget is verplicht" },
              errors,
            }}
          />
        </div>
        <Textarea
          name="description"
          label="Beschrijving"
          placeholder="Voeg een beschrijving toe"
          rules={{
            register,
            name: "description",
            options: {},
            errors,
          }}
        />

        <PostalCode
          register={register}
          fieldPrefix="address"
          errors={errors}
          control={control}
          watch={watch}
          setValue={setValue}
        />
      </div>
    </div>
  );
};
