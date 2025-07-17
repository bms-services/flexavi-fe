
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseReq, ExpenseStatusMap } from "@/zustand/types/expenseT";
import { useCreateExpense, useGetExpense, useUpdateExpense } from "@/zustand/hooks/useExpense";

import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Edit, Receipt, Download, FileText, ArrowLeft, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExpenseRes } from "@/zustand/types/expenseT";
import ExpenseStatusBadge from "@/components/expenses/ExpenseStatusBadge";
import { ExpenseTypeIcon, getTypeLabel } from "@/components/expenses/ExpenseTypeIcon";
import { formatDate, formatEuro, formatIsoToDate, formatStringToDate } from "@/utils/format";
import { Badge } from "@/components/ui/badge";

// const defaultExpenseData: ExpenseReq = {
//   company: "",
//   due_date: "",
//   description: "",
//   type: "material",
//   amount: 0,
//   percentage: 0,
//   vat_amount: 0,
//   total_amount: 0,
//   notes: "",
//   voucher: "",
//   status: "concept",
//   tags: []
// };

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
  // const methods = useForm<ExpenseReq>({
  //   defaultValues: defaultExpenseData,
  // });

  const getExpenseZ = useGetExpense(id || "");

  const navigate = useNavigate();

  const handleStatus = (newStatus: ExpenseRes["status"]) => {
    const updated = { ...currentExpense, status: newStatus };
    // setCurrentExpense(updated);

  };

  const handleEdit = () => {
    navigate(`/expenses/edit/${id}`);
  };


  const currentExpense = getExpenseZ.data?.result || placeholderExpense;

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
                <span>{formatIsoToDate(currentExpense.created_at)}</span>
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
                        <p className="text-sm text-muted-foreground">Datum</p>
                        <p className="font-medium">
                          {formatIsoToDate(currentExpense.due_date)}
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
                    {currentExpense.status === "concept" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleStatus("pending")}
                        >
                          Ter goedkeuring indienen
                        </Button>
                      </>
                    )}

                    {currentExpense.status === "pending" && (
                      <>
                        <Button
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatus("approved")}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Goedkeuren
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleStatus("rejected")}
                        >
                          Afkeuren
                        </Button>
                      </>
                    )}

                    {currentExpense.status === "approved" && (
                      <Button
                        variant="outline"
                        onClick={() => handleStatus("submitted")}
                      >
                        Markeren als verwerkt
                      </Button>
                    )}

                    {currentExpense.status === "rejected" && (
                      <Button
                        variant="outline"
                        onClick={() => handleStatus("concept")}
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
                      Ontvangstbewijs geüpload op {format(new Date(currentExpense.created_at), 'dd MMMM yyyy', { locale: nl })}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bon toevoegen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                      <Receipt className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-center text-muted-foreground mb-4">
                        Er is nog geen bon gekoppeld aan deze uitgave. Upload een foto of scan van je bon.
                      </p>
                      <Button variant="outline">
                        <Receipt className="h-4 w-4 mr-2" />
                        Bon uploaden
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
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
