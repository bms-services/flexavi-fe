import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProjectReq } from '@/zustand/types/projectT';
import { Image, Trash2, ViewIcon } from 'lucide-react';
import { cn } from '@/utils/format';

export const WizardPhotosStep: React.FC = () => {
  const { control } = useFormContext<ProjectReq>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'photos',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file, idx) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          append({
            name: file.name,
            description: '',
            file,
            url: reader.result as string,
          });
        }
      };

      reader.readAsDataURL(file);
    });
  }, [append]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true,
  });

  const handleSkip = () => {
    fields.forEach((_, i) => remove(i));
  };

  const handlePreview = (field: { url: string; name: string; file: File }) => {
    const url = field.url;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4 w-[600px]">
      <div>
        <h2 className="text-xl font-semibold mb-2">Voeg foto's toe (optioneel)</h2>
        <p className="text-muted-foreground">Voeg foto's toe aan het project om de voortgang te documenteren</p>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed border-muted rounded-md h-40 flex flex-col items-center justify-center cursor-pointer',
          'transition-colors hover:bg-accent/50 text-muted-foreground text-center px-4',
          isDragActive && 'bg-accent'
        )}
      >
        <input {...getInputProps()} />
        <p className="text-sm">
          {isDragActive ? 'Laat hier je foto’s vallen...' : 'Sleep hier je foto’s heen of klik om te uploaden'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Maximale bestandsgrootte afhankelijk van server</p>
      </div>

      {fields.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="relative overflow-hidden group p-0">
              <img
                src={field.url}
                alt={field.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handlePreview(field)}
                  >
                    <ViewIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-2 bg-background border-t">
                <p className="text-sm truncate">{field.name}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center border rounded-md flex flex-col items-center gap-2">
          <Image className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Er zijn nog geen foto's toegevoegd aan dit project
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={handleSkip}>
          Overslaan
        </Button>
      </div>
    </div>
  );
};