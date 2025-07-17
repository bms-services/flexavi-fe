
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseStatus, ExpenseStatusEnum, ExpenseStatusMap } from "@/zustand/types/expenseT";
import { useGetExpense, useUpdateExpense, useUploadExpenseAttachment } from "@/zustand/hooks/useExpense";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Receipt, Download, FileText, ArrowLeft, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExpenseRes } from "@/zustand/types/expenseT";
import ExpenseStatusBadge from "@/components/expenses/ExpenseStatusBadge";
import { ExpenseTypeIcon, getTypeLabel } from "@/components/expenses/ExpenseTypeIcon";
import { formatEuro, formatIsoToDate, formatStringToDate } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import AttachmentDropzone from "@/components/ui/drop-zone-beta/DropzoneBeta";

const placeholderExpense: ExpenseRes = {
  id: "",
  project_id: null,
  company: "",
  due_date: "",
  description: "",
  type: "material",
  amount: 0,
  percentage: 0,
  vat_amount: 0,
  total_amount: 0,
  status: Object.keys(ExpenseStatusMap)[0] as ExpenseRes["status"],
  notes: "",
  receipt_url: null,
  created_at: "",
  updated_at: "",
  tags: []
};


const ExpenseDetailPage = () => {
  const { id } = useParams<{ id: string }>();


  const getExpenseZ = useGetExpense(id || "");
  const updateExpenseZ = useUpdateExpense();
  const uploadExpenseAttachmentZ = useUploadExpenseAttachment();
  const currentExpense = getExpenseZ.data?.result || placeholderExpense;

  const methods = useForm({
    defaultValues: {
      attachments: currentExpense.receipt_url ? [currentExpense.receipt_url] : [],
    },
  });

  const navigate = useNavigate();

  const handleStatus = (newStatus: ExpenseStatus) => {
    // updateExpenseZ.mutate({ id ||"", status: newStatus }, {
    //   onSuccess: () => {
    //     getExpenseZ.refetch();
    //   },
    // });

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("status", newStatus);

    // company
    if (getExpenseZ.data?.result?.company) {
      formData.append("company", getExpenseZ.data.result.company);
    }

    // description
    if (getExpenseZ.data?.result?.description) {
      formData.append("description", getExpenseZ.data.result.description);
    }

    // type
    if (getExpenseZ.data?.result?.type) {
      formData.append("type", getExpenseZ.data.result.type);
    }

    // due_date
    if (getExpenseZ.data?.result?.due_date) {
      const formattedDate = formatStringToDate(getExpenseZ.data.result.due_date);
      formData.append("due_date", format(formattedDate, 'yyyy-MM-dd'));
    }

    // amount
    if (getExpenseZ.data?.result?.amount) {
      formData.append("amount", String(getExpenseZ.data.result.amount));
    }


    // for (const [key, value] of Object.entries(getExpenseZ.data?.result || {})) {
    //   if (value !== undefined && value !== null && key !== "id") {
    //     formData.append(key, String(value));
    //   }
    // }

    updateExpenseZ.mutate({ id: id || "", formData }, {
      onSuccess: () => {
        // getExpenseZ.refetch();
      },
    });
  };

  const handleEdit = () => {
    navigate(`/expenses/edit/${id}`);
  };

  const handleUploadAttachment = async (file: File) => {
    if (!id) return;

    const formData = new FormData();
    formData.append("file", file);
    uploadExpenseAttachmentZ.mutate({ id, formData }, {
      onSuccess: () => {
        getExpenseZ.refetch();
      },
    });
  };

  const onSubmit = (data: {
    attachments: (File | string)[];
  }) => {
    if (!id) return;
    const formData = new FormData();
    const files = data.attachments || [];

    const urls = files.filter((f) => typeof f === "string");
    const newFiles = files.filter((f) => f instanceof File);

    urls.forEach((url: string) => formData.append("urls[]", url));
    newFiles.forEach((file: File) => formData.append("attachments[]", file));

    uploadExpenseAttachmentZ.mutate({ id, formData }, {
      onSuccess: () => {
        getExpenseZ.refetch();
      }
    });
  };



  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">{currentExpense.description}</h2>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <span>{currentExpense.company}</span>
                <span>•</span>
                <span>{currentExpense?.created_at && formatIsoToDate(currentExpense?.created_at)}</span>
                <ExpenseStatusBadge status={currentExpense.status || "concept"} />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/expenses')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar overzicht
              </Button>
              <Button
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Bewerken
              </Button>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="receipt">Bon</TabsTrigger>
              {currentExpense.project_id && (
                <TabsTrigger value="project">Project</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="details" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Algemene informatie</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Bedrijf</p>
                        <p className="font-medium">{currentExpense.company}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vervaldatum</p>
                        <p className="font-medium">
                          {currentExpense.due_date && formatIsoToDate(currentExpense.due_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <div className="flex items-center">
                          <ExpenseTypeIcon type={currentExpense.type} className="mr-2" />
                          <span className="font-medium">{getTypeLabel(currentExpense.type)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <ExpenseStatusBadge status={currentExpense.status || "concept"} />
                      </div>
                    </div>

                    {currentExpense.tags && currentExpense.tags.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tags</p>
                        <div className="flex flex-wrap gap-1">
                          {currentExpense.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentExpense.notes && (
                      <div>
                        <p className="text-sm text-muted-foreground">Notities</p>
                        <p>{currentExpense.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financiële details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Bedrag (excl. BTW)</p>
                          <p className="font-medium">{formatEuro(currentExpense.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">BTW tarief</p>
                          <p className="font-medium">{currentExpense.percentage}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">BTW bedrag</p>
                          <p className="font-medium">{formatEuro(currentExpense.vat_amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Totaalbedrag (incl. BTW)</p>
                          <p className="font-medium text-lg">{formatEuro(currentExpense.total_amount)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Status change actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Acties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentExpense.status === ExpenseStatusEnum.Concept && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleStatus(ExpenseStatusEnum.InTreatment)}
                        >
                          Ter goedkeuring indienen
                        </Button>
                      </>
                    )}

                    {currentExpense.status === ExpenseStatusEnum.InTreatment && (
                      <>
                        <Button
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatus(ExpenseStatusEnum.Approved)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Goedkeuren
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleStatus(ExpenseStatusEnum.Rejected)}
                        >
                          Afkeuren
                        </Button>
                      </>
                    )}

                    {currentExpense.status === "approved" && (
                      <Button
                        variant="outline"
                        onClick={() => handleStatus(ExpenseStatusEnum.Submitted)}
                      >
                        Markeren als verwerkt
                      </Button>
                    )}

                    {currentExpense.status === "rejected" && (
                      <Button
                        variant="outline"
                        onClick={() => handleStatus(ExpenseStatusEnum.Incorporated)}
                      >
                        Opnieuw bewerken
                      </Button>
                    )}

                    <Button
                      variant="outline"

                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Exporteren als PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="receipt" className="space-y-6 pt-4">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                  {currentExpense.receipt_url ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Bon details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="border rounded-md p-4 flex flex-col items-center">
                          <img
                            src={currentExpense.receipt_url}
                            alt="Receipt"
                            className="max-w-full max-h-96 object-contain mb-4"
                          />
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>

                        <div className="text-sm text-center text-muted-foreground">
                          Ontvangstbewijs geüpload op {currentExpense?.created_at && formatIsoToDate(currentExpense?.created_at)}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Bon toevoegen</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <AttachmentDropzone name="attachments" defaultUrls={currentExpense.receipt_url ? [currentExpense.receipt_url] : []} />
                        <Button variant="outline">
                          <Receipt className="h-4 w-4 mr-2" />
                          Bon uploaden
                        </Button>
                        {/* <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                          <Receipt className="h-10 w-10 text-gray-400 mb-2" />

                          <p className="text-sm text-center text-muted-foreground mb-4">
                            Er is nog geen bon gekoppeld aan deze uitgave. Upload een foto of scan van je bon.
                          </p>
                        </div> */}
                      </CardContent>
                    </Card>
                  )}
                </form>
              </FormProvider>
            </TabsContent>

            {currentExpense.project_id && (
              <TabsContent value="project" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* {linkedProject ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">{linkedProject.name}</h3>
                        <p className="text-muted-foreground">{linkedProject.description}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/projects/${linkedProject.id}`)}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Project openen
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Startdatum</p>
                        <p className="font-medium">
                          {format(new Date(linkedProject.startDate), 'dd MMM yyyy', { locale: nl })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">{linkedProject.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">{formatEuro(linkedProject.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Locatie</p>
                        <p className="font-medium">{linkedProject.location}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Project niet gevonden of is verwijderd.</p>
                    <Button
                      variant="link"
                      className="mt-2"
                      onClick={() => setCurrentExpense({ ...currentExpense, project_id: "" })}
                    >
                      Koppeling verwijderen
                    </Button>
                  </div>
                )} */}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>

    </Layout>
  );
};

export default ExpenseDetailPage;
