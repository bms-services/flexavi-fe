import React, { useEffect } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { TeamReq, TeamRes, TeamTypeEnum } from "@/zustand/types/teamT";
import { useGetMyTeams } from "@/zustand/hooks/useSetting";

const teamSchema = z.object({
  name: z.string().min(1, "Team naam is verplicht"),
  description: z.string().optional(),
  color: z.string().default("#3b82f6"),
  type: z.nativeEnum(TeamTypeEnum).default(TeamTypeEnum.SALES),
});

const defaultTeam: TeamReq = {
  name: "",
  description: "",
  color: "#3b82f6",
  type: TeamTypeEnum.SALES,
};

interface AddTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStore: (values: TeamReq) => void;
  onUpdate: (id: string, values: TeamReq) => void;
  teamId?: string;
  team: TeamRes | null;
}

export const AddTeamDialog: React.FC<AddTeamDialogProps> = ({
  open,
  onOpenChange,
  onStore,
  onUpdate,
  teamId,
  team
}) => {
  const { t } = useTranslation("dashboard");
  // const getMyTeamsZ = useGetMyTeams();

  const form = useForm<TeamReq>({
    resolver: zodResolver(teamSchema),
    defaultValues: defaultTeam,
  });

  useEffect(() => {
    if (!open) return;

    if (teamId) {
      if (team) {
        form.reset({
          name: team.name,
          description: team.description || "",
          color: team.color || "#3b82f6",
          type: (Object.values(TeamTypeEnum) as string[]).includes(team.type as string)
            ? team.type as TeamTypeEnum
            : TeamTypeEnum.SALES,
        });
      } else {
        form.reset(defaultTeam);
      }
    } else {
      form.reset(defaultTeam);
    }
  }, [open, teamId, team, form]);

  const handleSubmit = async (data: TeamReq) => {
    if (teamId) {
      onUpdate(teamId, data);
    } else {
      onStore(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {teamId ? t('settings.team.edit') : t('settings.team.create')}
          </DialogTitle>
          <DialogDescription>
            {teamId
              ? t('settings.team.description.edit')
              : t('settings.team.description.create')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

            <Input
              label={t('settings.team.label.name')}
              placeholder={t('settings.team.placeholder.name')}
              id="name"
              type="text"
              rules={{
                register: form.register,
                name: "name",
                options: {
                  required: t('settings.team.error.required.name'),
                },
                errors: form.formState.errors,
              }}
            />

            <Textarea
              label={t('settings.team.label.description')}
              placeholder={t('settings.team.placeholder.description')}
              id="description"
              maxLength={250}
              rules={{
                register: form.register,
                name: "description",
                options: { maxLength: 250 },
                errors: form.formState.errors,
              }}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.team.label.color')}</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input type="color" {...field} className="w-12 h-10 p-1" />
                      <span className="text-sm text-muted-foreground">
                        {field.value}
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {t('settings.team.description.color')}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.team.label.type')}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={TeamTypeEnum.SALES}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('settings.team.placeholder.type')} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(TeamTypeEnum).map((type) => (
                          <SelectItem key={type} value={type}>
                            {t(`settings.team.type.${type.toLowerCase()}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                {t('settings.team.button.submit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};