import { Input } from "@/components/ui/input";
import { InputCurrency } from "@/components/ui/input-currency";
import PostalCode from "@/components/ui/postal-code";
import { Textarea } from "@/components/ui/textarea";
import { ProjectReq } from "@/zustand/types/projectT";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const WizardInformation: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<ProjectReq>();

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
                required: t('project.error.required.startDate'),
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
