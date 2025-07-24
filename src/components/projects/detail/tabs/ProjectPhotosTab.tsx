import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, ChevronLeft, ChevronRight, Trash2, ViewIcon } from "lucide-react";
import { useDeleteProjectPhotos, useGetProjectPhotos } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";
import { defaultParams } from "@/zustand/types/apiT";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ProjectPhotosUploadDialog } from "./ProjectPhotosUploadDialog";

export const ProjectPhotosTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [param, setParam] = useState({ ...defaultParams, per_page: 6 });
  const [openUpload, setOpenUpload] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getPhotosZ = useGetProjectPhotos(id || "", param);
  const deletePhotoZ = useDeleteProjectPhotos(id || "");

  const handleChangePage = (direction: "next" | "prev") => {
    setParam((prev) => ({
      ...prev,
      page: direction === "next" ? (prev.page ?? 1) + 1 : Math.max((prev.page ?? 1) - 1, 1),
    }));
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    await deletePhotoZ.mutateAsync({ photoIds: [selectedId] });
    setConfirmDelete(false);
    setSelectedId(null);
  };

  const handlePreview = (photo: { url: string; name: string }) => {
    const url = photo.url;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Foto's</h2>
        <Button onClick={() => setOpenUpload(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Foto's uploaden
        </Button>
      </div>

      {getPhotosZ.isLoading ? (
        <p>Laden...</p>
      ) : getPhotosZ.data?.result.data.length ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {getPhotosZ.data.result.data.map((photo) => (
              <Card key={photo.id} className="relative overflow-hidden group p-0">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handlePreview(photo)}
                    >
                      <ViewIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleChangePage("prev")}
              disabled={getPhotosZ.data?.result.meta.current_page === 1}
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleChangePage("next")}
              disabled={getPhotosZ.data?.result.meta.current_page >= getPhotosZ.data?.result.meta.last_page}
            >
              <ChevronRight />
            </Button>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground mt-2">
              Er zijn nog geen foto's toegevoegd aan dit project.
            </p>
            <Button className="mt-4" onClick={() => setOpenUpload(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Foto's uploaden
            </Button>
          </CardContent>
        </Card>
      )}

      <ProjectPhotosUploadDialog
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        projectId={id || ""}
      />

      <ConfirmDialog
        open={confirmDelete}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Verwijder foto"
        description="Weet je zeker dat je deze foto wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
        loading={deletePhotoZ.isPending}
      />
    </div>
  );
};