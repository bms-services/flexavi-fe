import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { UseQueryResult } from "@tanstack/react-query";
import { ApiError, ApiSuccessPaginated } from "@/zustand/types/apiT";
import { AgendaSettingReq, AgendaSettingRes } from "@/zustand/types/agenda";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateMyAgendaSettings } from "@/zustand/hooks/useSetting";
import { Skeleton } from "@/components/ui/skeleton";

interface TimeBlockSettingsProps {
  getMyAgendaSettingsZ: UseQueryResult<ApiSuccessPaginated<AgendaSettingRes>, ApiError>;
}

export const TimeBlockSettings: React.FC<TimeBlockSettingsProps> = ({ getMyAgendaSettingsZ }) => {
  const { t } = useTranslation();
  const updateMyAgendaZ = useUpdateMyAgendaSettings();

  const { data, isLoading } = getMyAgendaSettingsZ;

  const { control, handleSubmit, getValues } = useForm<{ blocks: AgendaSettingReq[] }>({
    defaultValues: { blocks: [] }
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "blocks"
  });

  useEffect(() => {
    if (data?.result.data) {
      const mapped = data.result.data.map((item) => ({
        id: item.id,
        title: item.title,
        start_time: item.start_time?.slice(0, 5),
        end_time: item.end_time?.slice(0, 5),
        sales_appointment: item.sales_appointment,
        executor_appointment: item.executor_appointment,
      }));
      replace(mapped);
    }
  }, [data, replace]);

  const onSubmit = (formData: { blocks: AgendaSettingReq[] }) => {
    updateMyAgendaZ.mutate(formData.blocks);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-4 border p-4 rounded-lg">
                <Skeleton className="h-5 w-1/2 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32 ml-auto" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Aantal afspraken per dagdeel</CardTitle>
          <CardDescription>Beheer het maximum aantal afspraken per dagdeel voor verschillende type teams.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 border p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Tijdblok {index + 1}</h3>
                  <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  <Controller
                    control={control}
                    name={`blocks.${index}.title`}
                    rules={{ required: t('settings.appointments.error.requiredTitle') }}
                    render={({ field, fieldState }) => (
                      <Input label="Titel" type="text" {...field} error={fieldState.error} />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name={`blocks.${index}.start_time`}
                      rules={{
                        required: t('settings.appointments.error.requiredStartTime'),
                        validate: (value) => {
                          const endTime = getValues(`blocks.${index}.end_time`);
                          if (endTime && value) {
                            const [startHour, startMinute] = value.split(':').map(Number);
                            const [endHour, endMinute] = endTime.split(':').map(Number);
                            if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
                              return t('settings.appointments.error.startTimeBeforeEndTime');
                            }
                          }
                          return true;
                        }
                      }}
                      render={({ field, fieldState }) => (
                        <Input label="Start tijd" type="time" {...field} error={fieldState.error} />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`blocks.${index}.end_time`}
                      rules={{
                        required: t('settings.appointments.error.requiredEndTime'),
                        validate: (value) => {
                          const startTime = getValues(`blocks.${index}.start_time`);
                          if (startTime && value) {
                            const [startHour, startMinute] = startTime.split(':').map(Number);
                            const [endHour, endMinute] = value.split(':').map(Number);
                            if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
                              return t('settings.appointments.error.endTimeAfterStartTime');
                            }
                          }
                          return true;
                        }
                      }}
                      render={({ field, fieldState }) => (
                        <Input label="Eind tijd" type="time" {...field} error={fieldState.error} />
                      )}
                    />
                  </div>

                  <Controller
                    control={control}
                    name={`blocks.${index}.sales_appointment`}
                    rules={{ required: t('settings.appointments.error.requiredSalesAppointment') }}
                    render={({ field, fieldState }) => (
                      <Input label="Verkoop afspraken" type="number" min="0" max="10" {...field} error={fieldState.error} />
                    )}
                  />

                  <Controller
                    control={control}
                    name={`blocks.${index}.executor_appointment`}
                    rules={{ required: t('settings.appointments.error.requiredExecutorAppointment') }}
                    render={({ field, fieldState }) => (
                      <Input label="Uitvoering afspraken" type="number" min="0" max="10" {...field} error={fieldState.error} />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => append({
              title: "",
              start_time: "09:00",
              end_time: "17:00",
              sales_appointment: 0,
              executor_appointment: 0
            })}
          >
            <Plus className="h-4 w-4 mr-2" /> Voeg tijdblok toe
          </Button>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="ml-auto">Instellingen opslaan</Button>
        </CardFooter>
      </Card>
    </form>
  );
};