import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { EmployeeReq, EmployeeRole, EmployeeRoleMap } from "@/zustand/types/employeeT";
import { UserIcon, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import PhoneNumber from "@/components/ui/phone-number";
import {
  useGetCompanyRoles,
  useGetMyWorkDays,
} from "@/zustand/hooks/useSetting";
import { ApiError } from "@/zustand/types/apiT";
import { InputCurrency } from "@/components/ui/input-currency";

interface InviteEmployeeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (employee: EmployeeReq) => void;
  methods: UseFormReturn<EmployeeReq, ApiError, EmployeeReq>

}


export const InviteEmployee: React.FC<InviteEmployeeProps> = ({
  open,
  onOpenChange,
  onSubmit,
  methods,
}) => {
  const { t } = useTranslation("dashboard");

  const getCompanyRolesZ = useGetCompanyRoles({ page: 1, per_page: 100 });
  const getMyWorkDaysZ = useGetMyWorkDays({ page: 1, per_page: 100 });

  const watchStart = methods.watch("start_time");
  const watchEnd = methods.watch("end_time");

  const handleRoleName = (role: EmployeeRole) => {
    if (EmployeeRoleMap[role]) {
      return t(`settings.employee.role.${EmployeeRoleMap[role].value}`);
    }
    return role;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nieuwe medewerker toevoegen</DialogTitle>
          <DialogDescription>
            Vul de gegevens van de nieuwe medewerker in.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={t("settings.teamMember.label.name")}
              placeholder={t("settings.teamMember.placeholder.name")}
              id="name"
              type="text"
              icon={<UserIcon className="h-5 w-5" />}
              rules={{
                register: methods.register,
                name: "name",
                options: {
                  required: t("settings.teamMember.error.required.name"),
                },
                errors: methods.formState.errors,
              }}
            />

            <Input
              label={t("settings.teamMember.label.email")}
              placeholder={t("settings.teamMember.placeholder.email")}
              id="email"
              type="email"
              icon={<Mail className="h-5 w-5" />}
              rules={{
                register: methods.register,
                name: "email",
                options: {
                  required: t("settings.teamMember.error.required.email"),
                },
                errors: methods.formState.errors,
              }}
            />

            <PhoneNumber
              label={t("settings.teamMember.label.phone")}
              rules={{
                control: methods.control,
                name: "phone",
                options: {
                  required: t("settings.teamMember.error.required.phone"),
                },
                errors: methods.formState.errors,
              }}
            />

            <FormField
              control={methods.control}
              name="company_user_role_id"
              rules={{
                required: t("settings.teamMember.error.required.role"),
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {getCompanyRolesZ.isSuccess &&
                        getCompanyRolesZ.data.result.data.map((role) => (
                          <FormItem
                            key={role.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={role.id} />
                            </FormControl>
                            <FormLabel className="text-[14px] !font-normal">
                              {handleRoleName(role.name)}
                            </FormLabel>
                          </FormItem>
                        ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="work_days"
              rules={{
                required: t("settings.teamMember.error.required.workingDays"),
                validate: (value) =>
                  (Array.isArray(value) && value.length > 0) ||
                  t("settings.teamMember.error.required.workingDays"),
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("settings.teamMember.label.workingDays")}
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {getMyWorkDaysZ.isSuccess &&
                      getMyWorkDaysZ.data.result.data.map((day) => {
                        const checked = field.value?.includes(day.id);
                        return (
                          <FormItem
                            key={day.id}
                            className="flex items-center space-x-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...(field.value || []), day.id]);
                                  } else {
                                    field.onChange(
                                      (field.value || []).filter((id) => id !== day.id)
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-[14px] !font-normal !mt-0">{day.name}</FormLabel>
                          </FormItem>
                        );
                      })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <InputCurrency
              rules={{
                name: "day_rate",
                control: methods.control,
                options: {
                  required: t("settings.teamMember.error.required.dayRate"),
                },
                errors: methods.formState.errors,
              }}
              label={t("settings.teamMember.label.dayRate")}
              placeholder={t("settings.teamMember.placeholder.dayRate")}
              id="day_rate"
              type="text"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={methods.control}
                name="start_time"
                rules={{
                  required: t("settings.teamMember.error.required.startTime"),
                  validate: (value) =>
                    value < watchEnd ||
                    t("settings.teamMember.error.startTimeLessThanEndTime"),
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("settings.teamMember.label.startTime")}</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="end_time"
                rules={{
                  required: t("settings.teamMember.error.required.endTime"),
                  validate: (value) =>
                    value > watchStart ||
                    t("settings.teamMember.error.endTimeGreaterThanStartTime"),
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("settings.teamMember.label.endTime")}</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Medewerker toevoegen</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};