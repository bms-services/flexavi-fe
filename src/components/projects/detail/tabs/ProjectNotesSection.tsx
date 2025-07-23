//  <div key={n.id} className="border-t pt-2">
//                   <div className="text-xs text-muted-foreground mb-1">
//                     {new Date(n.createdAt).toLocaleString()} | Door: {n.createdBy} · Voor: {n.createdFor}
//                   </div>
//                   <div className="text-sm">{n.note}</div>
//                 </div>



import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectNoteReq, ProjectNoteRes } from "@/zustand/types/projectT";
import { formatIsoToDate } from "@/utils/format";
import { useParams } from "react-router-dom";
import { defaultParams, ParamGlobal } from "@/zustand/types/apiT";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateProjectNote, useGetProjectNotes } from "@/zustand/hooks/useProject";
import { NoteDialog } from "./NoteDialog";


const defaultProjectNotes: ProjectNoteReq = {
  notes: "",
  assign_to: []
}

export const ProjectNotesSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  const [projectNotesParam, setProjectNotesParam] = useState<ParamGlobal>(
    defaultParams
  );

  const formProjectNote = useForm<ProjectNoteReq>({
    defaultValues: defaultProjectNotes,
  });

  const getProjectNotesZ = useGetProjectNotes(id || "", projectNotesParam);
  const createProjectNoteZ = useCreateProjectNote(id || "");


  const projectNotes = getProjectNotesZ.data?.result?.data || [];


  const handleCreateNote = () => {
    setIsNoteDialogOpen(true);
  }

  const handleStoreNote = async (data: ProjectNoteReq) => {
    await createProjectNoteZ.mutateAsync({
      ...data,
      assign_to: data.assign_to.map((user) =>
        typeof user === "string" ? user : user.value
      ),
    });
  }

  useEffect(() => {
    if (createProjectNoteZ.isSuccess) {
      formProjectNote.reset(defaultProjectNotes);
      setIsNoteDialogOpen(false);
    }
  }, [createProjectNoteZ.isSuccess, formProjectNote]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Openstaande notities</CardTitle>
            <CardDescription>Notities die aandacht vereisen</CardDescription>
          </div>
          <Button size="sm" onClick={handleCreateNote}>
            <Plus className="h-4 w-4 mr-2" />
            Notitie toevoegen
          </Button>
        </CardHeader>
        <CardContent>
          {projectNotes.length > 0 ? (
            <div className="space-y-3">
              {projectNotes.map((note) => (
                <div key={note.id} className="border-t pt-2">
                  <div className="text-xs text-muted-foreground mb-1">
                    {note.created_at && formatIsoToDate(note.created_at)} | Door: {note.created_by} · Voor: {note.assign_to.map((user) => (typeof user === "string" ? user : user.value)).join(", ")}
                  </div>
                  <div className="text-sm">{note.notes}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>Geen openstaande taken</p>
              <p className="text-sm">Voeg taken toe om het project te beheren</p>
            </div>
          )}
        </CardContent>
      </Card>

      <FormProvider {...formProjectNote}>
        <NoteDialog
          open={isNoteDialogOpen}
          onOpenChange={setIsNoteDialogOpen}
          handleStore={formProjectNote.handleSubmit(handleStoreNote)}
        />
      </FormProvider>
    </>
  );
}
