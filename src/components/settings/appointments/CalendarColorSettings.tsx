import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetMyAgendaColorSettings, useUpdateMyAgendaColorSettings } from "@/zustand/hooks/useSetting";
import { AgendaSettingColorReq } from "@/zustand/types/agendaT";


export const CalendarColorSettings: React.FC = () => {
  const { t } = useTranslation();

  const getMyAgendaColorSettingsZ = useGetMyAgendaColorSettings({
    page: 1,
    per_page: 10,
    search: "",
  });

  const updateMyAgendaColorSettingsZ = useUpdateMyAgendaColorSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgendaSettingColorReq>();

  const onSubmit = async (data: AgendaSettingColorReq) => {
    const payload = Object.entries(data.color).map(([id, color]) => ({
      id,
      color,
    }));
    await updateMyAgendaColorSettingsZ.mutateAsync(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Agenda weergave</CardTitle>
          <CardDescription>
            Pas de kleuren aan voor verschillende agenda statussen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {getMyAgendaColorSettingsZ.isSuccess &&
              getMyAgendaColorSettingsZ.data.result.data.map((colorSetting) => (
                <div key={colorSetting.id} className="space-y-2">
                  <Label>Status kleur</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      defaultValue={colorSetting.color}
                      rules={{
                        register,
                        name: `color[${colorSetting.id}]`,
                        options: {
                          required: "Kleur is verplicht",
                        },
                        errors,
                      }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {colorSetting.color}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Kleuren opslaan
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};