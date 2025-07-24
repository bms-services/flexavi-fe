import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { useParams } from "react-router-dom";
import {
  useCreateProjectAppointment,
  useDeleteProjectAppointments,
  useGetProjectAppointments,
} from "@/zustand/hooks/useProject";
import { defaultParams, ParamGlobal } from "@/zustand/types/apiT";
import { FormProvider, useForm } from "react-hook-form";
import { ProjectAppointmentReq } from "@/zustand/types/projectT";
import { AppointmentDialog } from "./AppointmentDialog";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

const defaultProjectAppointment: ProjectAppointmentReq = {
  appointments: []
};

export const ProjectAppointmentsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const [params, setParams] = useState<ParamGlobal>({ ...defaultParams, per_page: 5 });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<any | null>(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getProjectAppointmentsZ = useGetProjectAppointments(id || "", params);
  const createProjectAppointmentZ = useCreateProjectAppointment(id || "");
  const deleteProjectAppointmentZ = useDeleteProjectAppointments(id || "");

  const appointments = getProjectAppointmentsZ.data?.result?.data || [];
  const meta = getProjectAppointmentsZ.data?.result?.meta;

  const methods = useForm<ProjectAppointmentReq>({
    defaultValues: defaultProjectAppointment,
  });

  const handleStore = (data: ProjectAppointmentReq) => {
    createProjectAppointmentZ.mutateAsync(data, {
      onSuccess: () => {
        setIsAddOpen(false);
      },
    });
  };

  const handlePreview = (item: any) => {
    setPreviewItem(item);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setModalDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    await deleteProjectAppointmentZ.mutateAsync({ appointmentIds: [deleteId] });
    setModalDelete(false);
    setDeleteId(null);
  };

  const handleChangePage = (direction: "next" | "prev") => {
    setParams((prev) => ({
      ...prev,
      page: direction === "next" ? (prev.page ?? 1) + 1 : Math.max((prev.page ?? 1) - 1, 1),
    }));
  };

  useEffect(() => {
    setParams((prev) => ({ ...prev, search: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Afspraken</h2>
        <Button onClick={() => setIsAddOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Afspraak toevoegen
        </Button>
      </div>

      <Input
        placeholder="Zoeken afspraak..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground py-4">Nog geen afspraken vastgelegd voor dit project.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-4 flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">{appointment.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {appointment.date && format(parseISO(appointment.date), "d MMMM yyyy", { locale: nl })} &bull; {appointment.startTime} - {appointment.endTime}
                  </p>
                  <p className="text-xs text-muted-foreground">Door: {appointment.createdBy}</p>
                  <p className="text-sm mt-1">{appointment.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handlePreview(appointment)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(appointment.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between pt-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleChangePage("prev")}
              disabled={!meta || meta.current_page <= 1}
              aria-label="Vorige pagina"
            >
              <ChevronLeft />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleChangePage("next")}
              disabled={!meta || meta.current_page >= meta.last_page}
              aria-label="Volgende pagina"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}

      <FormProvider {...methods}>
        <AppointmentDialog
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          handleStore={methods.handleSubmit(handleStore)}
        />
      </FormProvider>

      <ConfirmDialog
        open={modalDelete}
        onCancel={() => setModalDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Afspraak verwijderen"
        description="Weet je zeker dat je deze afspraak wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
        loading={deleteProjectAppointmentZ.isPending}
      />
    </div>
  );
};