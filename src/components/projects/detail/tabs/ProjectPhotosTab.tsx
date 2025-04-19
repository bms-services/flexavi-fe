
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Attachments } from "@/components/workagreements/customer-portal/components/Attachments";
import { toast } from "sonner";

interface ProjectPhotosTabProps {
  project: Project;
}

export const ProjectPhotosTab: React.FC<ProjectPhotosTabProps> = ({ project }) => {
  const [photos, setPhotos] = useState(project.photos);

  const handleAddPhoto = () => {
    // In a real app, this would handle file upload
    const newPhoto = {
      name: `Foto ${photos.length + 1}`,
      url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    };
    setPhotos([...photos, newPhoto]);
    toast.success("Foto toegevoegd aan project");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Foto's</h2>
        <Button onClick={handleAddPhoto}>
          <Upload className="h-4 w-4 mr-2" />
          Foto's uploaden
        </Button>
      </div>

      {photos.length > 0 ? (
        <div className="space-y-4">
          <Attachments defaultAttachments={photos} />
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground mt-2">
              Er zijn nog geen foto's toegevoegd aan dit project.
            </p>
            <Button className="mt-4" onClick={handleAddPhoto}>
              <Upload className="h-4 w-4 mr-2" />
              Foto's uploaden
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
