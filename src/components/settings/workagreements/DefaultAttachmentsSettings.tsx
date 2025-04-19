
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DefaultAttachment {
  id: string;
  name: string;
  url: string;
}

export const DefaultAttachmentsSettings = () => {
  const { toast } = useToast();
  const [attachments, setAttachments] = useState<DefaultAttachment[]>([
    { id: '1', name: 'Algemene voorwaarden.pdf', url: '/attachments/terms.pdf' },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you would upload these files to storage and get URLs back
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
    toast({
      title: "Bestanden toegevoegd",
      description: "De bestanden zijn succesvol toegevoegd als standaard bijlages.",
    });
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
    toast({
      title: "Bestand verwijderd",
      description: "Het bestand is verwijderd uit de standaard bijlages.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standaard bijlages</CardTitle>
        <CardDescription>
          Beheer de standaard bijlages die worden toegevoegd aan nieuwe werkovereenkomsten
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("default-file-upload")?.click()}
            className="gap-2"
          >
            <Paperclip className="h-4 w-4" />
            Bestand toevoegen
          </Button>
          <Input
            id="default-file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>

        {attachments.length > 0 && (
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 p-2 bg-muted rounded-md"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm">{attachment.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
