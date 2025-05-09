
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, FileText, X, File } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DefaultAttachment {
  id: string;
  name: string;
  url: string;
}

export const DefaultAttachmentsSettings = () => {
  
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
  
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
   
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <File className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Standaard bijlages</CardTitle>
            <CardDescription>
              Beheer de standaard bijlages die automatisch worden toegevoegd
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quotes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="quotes">Offertes</TabsTrigger>
            <TabsTrigger value="invoices">Facturen</TabsTrigger>
            <TabsTrigger value="agreements">Werkovereenkomsten</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("quote-file-upload")?.click()}
                  className="gap-2"
                >
                  <Paperclip className="h-4 w-4" />
                  Bestand toevoegen
                </Button>
                <Input
                  id="quote-file-upload"
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
                      className="flex items-center gap-2 p-3 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1 text-sm font-medium">{attachment.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => removeAttachment(attachment.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            {/* Similar content for invoices */}
          </TabsContent>

          <TabsContent value="agreements" className="space-y-4">
            {/* Similar content for work agreements */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
