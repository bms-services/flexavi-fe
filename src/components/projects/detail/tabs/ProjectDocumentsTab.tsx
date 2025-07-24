import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDeleteProjectDocuments, useGetProjectDocuments } from "@/zustand/hooks/useProject";
import { ListUrlItem } from "@/components/ui/drop-zone-alpha/DropZoneAlpha";
import { ProjectDocumentUploadDialog } from "./ProjectDocumentUploadDialog";
import { ProjectAttachmentType, ProjectDocumentRes } from "@/zustand/types/projectT";
import FileViewer from "@/components/ui/file-viewer/FileViewer";
import { handlePreviewFile } from "@/components/ui/drop-zone-alpha/preview";
import { AttachmentRes } from "@/zustand/types/attachmentT";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { defaultParams } from "@/zustand/types/apiT";
import { useDebounce } from "use-debounce";

export const ProjectDocumentsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuote, setSearchQuote] = useState("");
  const [searchAgreement, setSearchAgreement] = useState("");
  const [searchInvoice, setSearchInvoice] = useState("");

  const [debouncedSearchQuote] = useDebounce(searchQuote, 300);
  const [debouncedSearchAgreement] = useDebounce(searchAgreement, 300);
  const [debouncedSearchInvoice] = useDebounce(searchInvoice, 300);

  const [paramQuote, setParamQuote] = useState({ ...defaultParams, per_page: 5 });
  const [paramInvoice, setParamInvoice] = useState({ ...defaultParams, per_page: 5 });
  const [paramAgreement, setParamAgreement] = useState({ ...defaultParams, per_page: 5 });

  const [isPreview, setIsPreview] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<{ uri: string; fileType: string | undefined } | null>(null);
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<ProjectAttachmentType>("agreement");

  const [modal, setModal] = useState<{
    upload: boolean;
    delete: boolean
  }>({
    delete: false,
    upload: false
  });

  const getProjectQuoteDocumentsZ = useGetProjectDocuments(id || "", paramQuote, "quote");
  const getProjectInvoiceDocumentsZ = useGetProjectDocuments(id || "", paramInvoice, "invoice");
  const getProjectAgreementDocumentsZ = useGetProjectDocuments(id || "", paramAgreement, "agreement");

  const deleteProjectDocumentZ = useDeleteProjectDocuments(id || "");

  const handleOpenUploadModal = (type: ProjectAttachmentType) => {
    setUploadType(type);
    setModal((prev) => ({ ...prev, upload: true }));
  };
  const handleCloseUploadModal = () => {
    setUploadType("agreement");
    setModal((prev) => ({ ...prev, upload: false }));
  };

  const handleDelete = (ids: string[]) => {
    setDeletedId(ids[0]);
    setModal((prev) => ({ ...prev, delete: true }));
  };

  const handleDestroy = async (ids: string[]) => {
    await deleteProjectDocumentZ.mutateAsync({ documentIds: ids }).then(() => {
      setModal((prev) => ({ ...prev, delete: false }));
      setDeletedId(null);
    }).catch((error) => {
      setModal((prev) => ({ ...prev, delete: false }));
    });
  };

  const handlePreview = (file: File | AttachmentRes | ProjectDocumentRes) => {
    const previewFile = handlePreviewFile(file as File | AttachmentRes);
    setPreviewFiles(previewFile);
    setIsPreview(true);
  }

  const handleChangePage = (type: ProjectAttachmentType, direction: "next" | "prev") => {
    if (type === "quote") {
      setParamQuote((prev) => ({
        ...prev,
        page: direction === "next" ? (prev.page ?? 1) + 1 : Math.max((prev.page ?? 1) - 1, 1)
      }));
    } else if (type === "invoice") {
      setParamInvoice((prev) => ({
        ...prev,
        page: direction === "next" ? (prev.page ?? 1) + 1 : Math.max((prev.page ?? 1) - 1, 1)
      }));
    } else if (type === "agreement") {
      setParamAgreement((prev) => ({
        ...prev,
        page: direction === "next" ? (prev.page ?? 1) + 1 : Math.max((prev.page ?? 1) - 1, 1)
      }));
    }
  };

  useEffect(() => {
    setParamQuote((prev) => ({ ...prev, search: debouncedSearchQuote, page: 1 }));
  }, [debouncedSearchQuote]);

  useEffect(() => {
    setParamAgreement((prev) => ({ ...prev, search: debouncedSearchAgreement, page: 1 }));
  }, [debouncedSearchAgreement]);

  useEffect(() => {
    setParamInvoice((prev) => ({ ...prev, search: debouncedSearchInvoice, page: 1 }));
  }, [debouncedSearchInvoice]);

  const defaultTabs = [{
    label: "Offertes",
    type: "quote",
    icon: <FileText className="h-5 w-5" />,
    data: getProjectQuoteDocumentsZ,
    page: paramQuote.page,
    setPage: setParamQuote,
    search: searchQuote,
    onSearch: (val: string) => {
      setSearchQuote(val);
    },
  }, {
    label: "Werkovereenkomsten",
    type: "agreement",
    icon: <FileText className="h-5 w-5" />,
    data: getProjectAgreementDocumentsZ,
    page: paramAgreement.page,
    setPage: setParamAgreement,
    search: searchAgreement,
    onSearch: (val: string) => {
      setSearchAgreement(val);
    }
  }, {
    label: "Facturen",
    type: "invoice",
    icon: <FileSpreadsheet className="h-5 w-5" />,
    data: getProjectInvoiceDocumentsZ,
    page: paramInvoice.page,
    setPage: setParamInvoice,
    search: searchInvoice,
    onSearch: (val: string) => {
      setSearchInvoice(val);
    }
  }]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Documenten</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {defaultTabs.map(({ label, icon, data, page, type, setPage, search, onSearch }, idx) => {
          const meta = data.data?.result.meta;
          const hasNext = meta && meta.current_page < meta.last_page;
          const hasPrev = meta && meta.current_page > 1;

          return (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {icon}
                    {label}
                  </div>
                  <Button onClick={() => handleOpenUploadModal(type as ProjectAttachmentType)} variant="link" className="p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <input
                  type="text"
                  placeholder="Zoeken..."
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-primary"
                />
                {data.isLoading ? (
                  <p>Laden...</p>
                ) : data.data?.result.data.length ? (
                  <>
                    {data.data.result.data.map((item) => (
                      <ListUrlItem
                        key={item.id}
                        name={item.name}
                        onRemove={() => handleDelete([item.id])}
                        onPreview={() => handlePreview(item)}
                        disabled={true}
                      />
                    ))}
                    <div className="flex justify-between pt-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleChangePage(type as ProjectAttachmentType, "prev")}
                        disabled={!hasPrev}
                        aria-label="Vorige pagina"
                      >
                        <ChevronLeft />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleChangePage(type as ProjectAttachmentType, "next")}
                        disabled={!hasNext}
                        aria-label="Volgende pagina"
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm">Geen documenten gevonden</p>
                )}
              </CardContent>
            </Card>
          )
        }
        )}

        <FileViewer
          documents={previewFiles ? [previewFiles] : []}
          open={isPreview}
          onOpen={setIsPreview}
        />

        <ProjectDocumentUploadDialog
          open={modal.upload}
          onClose={handleCloseUploadModal}
          projectId={id || ""}
          defaultType={uploadType} />

        <ConfirmDialog
          open={modal.delete}
          onCancel={() => setModal((prev) => ({ ...prev, delete: false }))}
          onConfirm={() => handleDestroy([deletedId || ""])}
          title="Annuleren uitnodiging"
          description="Ben je zeker dat je deze uitnodiging wilt annuleren? Deze actie kan niet ongedaan worden gemaakt."
          loading={deleteProjectDocumentZ.isPending}
        />
      </div>
    </div >
  );
};
