
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link as LinkIcon, Plus, FileSpreadsheet } from "lucide-react";
import { defaultParams, ParamGlobal } from "@/zustand/types/apiT";
import { useGetProjectDocuments } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";


export const ProjectDocumentsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projectAgreementDocumentsParam, setProjectAgreementDocumentsParam] = useState<ParamGlobal>(
    defaultParams
  );
  const [projectInvoiceDocumentsParam, setProjectInvoiceDocumentsParam] = useState<ParamGlobal>(
    defaultParams
  );
  const [projectQuoteDocumentsParam, setProjectQuoteDocumentsParam] = useState<ParamGlobal>(
    defaultParams
  );

  const getProjectAgreementDocumentsZ = useGetProjectDocuments(id || "", projectAgreementDocumentsParam, 'agreement');
  const getProjectInvoiceDocumentsZ = useGetProjectDocuments(id || "", projectInvoiceDocumentsParam, 'invoice');
  const getProjectQuoteDocumentsZ = useGetProjectDocuments(id || "", projectQuoteDocumentsParam, 'quotation');


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Documenten</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <LinkIcon className="h-4 w-4 mr-2" />
            Document koppelen
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Document toevoegen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Offertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* {project.quotes.length > 0 ? (
              <div className="space-y-2">
                {project.quotes.map((quoteId) => (
                  <div key={quoteId} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>Offerte {quoteId}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Er zijn nog geen offertes gekoppeld
              </p>
            )} */}
            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Offerte koppelen
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Werkovereenkomsten
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* {project.workAgreements.length > 0 ? (
              <div className="space-y-2">
                {project.workAgreements.map((waId) => (
                  <div key={waId} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span>Werkovereenkomst {waId}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Er zijn nog geen werkovereenkomsten gekoppeld
              </p>
            )} */}
            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Werkovereenkomst koppelen
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Facturen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* {project.invoices.length > 0 ? (
              <div className="space-y-2">
                {project.invoices.map((invoiceId) => (
                  <div key={invoiceId} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-red-500" />
                      <span>Factuur {invoiceId}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Er zijn nog geen facturen gekoppeld
              </p>
            )} */}
            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Factuur koppelen
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
