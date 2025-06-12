
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CompanyTeamTypeEnum } from "@/types/company";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeamReq } from "@/zustand/types/teamT";

const teamSchema = z.object({
  name: z.string().min(1, "Team naam is verplicht"),
  description: z.string().optional(),
  color: z.string().default("#3b82f6"),
  type: z.nativeEnum(CompanyTeamTypeEnum).default(CompanyTeamTypeEnum.SALES),
});

interface AddTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TeamReq) => void;
}

export const AddTeamDialog: React.FC<AddTeamDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const { t } = useTranslation("dashboard");

  const form = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
      type: CompanyTeamTypeEnum.SALES,
    },
  });

  const settingTeamStoreRedux = useSelector((state: RootState) => state.setting.team.store);

  useEffect(() => {
    if (settingTeamStoreRedux.success) {
      onOpenChange(false);
      form.reset();
    }
  }, [settingTeamStoreRedux, onOpenChange, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Nieuw team
          </DialogTitle>
          <DialogDescription>
            Voeg een nieuw team toe en wijs gebruikers toe aan dit team.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={t('dashboard:settings.team.label.name')}
              placeholder={t('dashboard:settings.team.placeholder.name')}
              id="name"
              type="text"
              rules={{
                register: form.register,
                name: "name",
                options: {
                  required: t('dashboard:settings.team.error.required.name'),
                },
                errors: form.formState.errors,
              }}
            />

            <Textarea
              label={t('dashboard:settings.team.label.description')}
              placeholder={t('dashboard:settings.team.placeholder.description')}
              id="description"
              maxLength={250}
              rules={{
                register: form.register,
                name: "description",
                options: {
                  maxLength: 250,
                },
                errors: form.formState.errors,
              }}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dashboard:settings.team.label.color')}</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input type="color" {...field} className="w-12 h-10 p-1" />
                      <span className="text-sm text-muted-foreground">
                        {field.value}
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Kies een kleur om dit team te identificeren in de agenda
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dashboard:settings.team.label.type')}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={CompanyTeamTypeEnum.SALES}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('dashboard:settings.team.placeholder.type')} />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.values(CompanyTeamTypeEnum).map((type) => (
                          <SelectItem key={type} value={type}>
                            {t(`dashboard:settings.team.type.${type.toLowerCase() as keyof typeof CompanyTeamTypeEnum}`)}
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
                {t('dashboard:settings.team.button.submit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
