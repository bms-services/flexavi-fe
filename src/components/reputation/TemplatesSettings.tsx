
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Trash2, 
  PenLine, 
  Check, 
  Mail,
  MailQuestion
} from "lucide-react";
import { ReviewTemplate } from "@/types/reputation";
import { EmailTemplateDialog } from "./dialogs/EmailTemplateDialog";

export const TemplatesSettings = ({ reputation }: { reputation: any }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ReviewTemplate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditTemplate = (template: ReviewTemplate) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setIsDialogOpen(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm("Weet u zeker dat u deze template wilt verwijderen?")) {
      reputation.deleteTemplate(templateId);
    }
  };

  const handleSetActiveTemplate = (templateId: string) => {
    reputation.setActiveTemplate(templateId);
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Email Templates</h2>
          <p className="text-muted-foreground">
            Beheer de email templates voor review verzoeken
          </p>
        </div>
        <Button onClick={handleCreateTemplate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reputation.templates.map((template: ReviewTemplate) => (
          <Card key={template.id} className={template.id === reputation.settings.activeTemplateId ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.dayDelay} dagen na factuur</CardDescription>
                </div>
                <div className="flex gap-2">
                  {template.id === reputation.settings.activeTemplateId ? (
                    <Button variant="outline" size="icon" className="text-green-500" disabled>
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleSetActiveTemplate(template.id)}
                      title="Instellen als actieve template"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <PenLine className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDeleteTemplate(template.id)}
                    disabled={template.id === reputation.settings.activeTemplateId}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Onderwerp</h4>
                  <p className="text-sm bg-muted p-2 rounded">{template.subject}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Bericht inhoud</h4>
                  <div className="text-sm bg-muted p-2 rounded h-[120px] overflow-y-auto whitespace-pre-line">
                    {template.emailBody}
                  </div>
                </div>
                {template.id === reputation.settings.activeTemplateId && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    Actieve template
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {reputation.templates.length === 0 && (
          <Card className="md:col-span-2 p-10 flex flex-col items-center justify-center text-center">
            <MailQuestion className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Geen templates gevonden</h3>
            <p className="text-muted-foreground mb-4">
              Maak uw eerste email template om review verzoeken te sturen aan klanten
            </p>
            <Button onClick={handleCreateTemplate}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nieuwe template
            </Button>
          </Card>
        )}
      </div>

      <EmailTemplateDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        template={selectedTemplate}
        onSave={reputation.saveTemplate}
      />
    </div>
  );
};

// Badge component for template status
const Badge = ({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: string }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className || ""}`}>
      {children}
    </span>
  );
};
