
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Project } from "@/types/project";
import { ProjectOverviewRes } from "@/zustand/types/projectT";

interface ProjectDocumentsCardProps {
  projectOverview: ProjectOverviewRes;

}

export const ProjectDocumentsCard: React.FC<ProjectDocumentsCardProps> = ({ projectOverview }) => (
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
            <p>{projectOverview.total_document_quote} offerte(s)</p>
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
            <p>{projectOverview.total_document_agreement} werkovereenkomst(en)</p>
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
            <p>{projectOverview.total_document_invoice} factuur/facturen</p>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
);
