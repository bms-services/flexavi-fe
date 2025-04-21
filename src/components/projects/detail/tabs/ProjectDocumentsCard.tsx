
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectDocumentsCardProps {
  project: Project;
}

export const ProjectDocumentsCard: React.FC<ProjectDocumentsCardProps> = ({ project }) => (
  <Card className="md:col-span-2">
    <CardHeader>
      <CardTitle>Documenten</CardTitle>
      <CardDescription>Gekoppelde documenten aan dit project</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Offertes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p>{project.quotes.length} offerte(s)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Werkovereenkomsten
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p>{project.workAgreements.length} werkovereenkomst(en)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Facturen
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p>{project.invoices.length} factuur/facturen</p>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
);
