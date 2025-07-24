import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, File, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { formatCurrency } from "@/utils/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ReceiptUploadArea } from "@/components/layout/quick-actions/receipt-upload/ReceiptUploadArea";
import { ReceiptFilePreview } from "@/components/layout/quick-actions/receipt-upload/ReceiptFilePreview";
import { ReceiptFormFields } from "@/components/layout/quick-actions/receipt-upload/ReceiptFormFields";
import { defaultParams, FiltersGlobal, SortsGlobal } from "@/zustand/types/apiT";
import { useCreateProjectCost, useGetProjectCosts } from "@/zustand/hooks/useProject";

export const ProjectExpensesTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [params, setParams] = useState({ ...defaultParams, per_page: 5 });
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<any>({});
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const getExpensesZ = useGetProjectCosts(id || "", params);
  const createExpenseZ = useCreateProjectCost(id || "");
  const expenses = getExpensesZ.data?.result.data || [];
  const meta = getExpensesZ.data?.result.meta;
  const totalExpenses = getExpensesZ.data?.result.total || 0;

  useEffect(() => {
    setParams((prev) => ({ ...prev, search: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);

  const handleChangePage = (dir: "next" | "prev") => {
    setParams((prev) => ({
      ...prev,
      page: dir === "next" ? (prev.page ?? 1) + 1 : Math.max((prev.page ?? 1) - 1, 1),
    }));
  };

  const handleFileUpload = (file: string) => {
    setUploadedImage(file);
    setIsProcessing(true);
    // Simulasi AI extract
    setTimeout(() => {
      setReceiptData({ date: "2024-07-01", amount: "99.99" });
      setNewExpense((prev) => ({ ...prev, amount: "99.99", date: "2024-07-01" }));
      setIsProcessing(false);
    }, 2000);
  };

  const handleReceiptDataChange = (key: string, value: string) => {
    setReceiptData((prev: any) => ({ ...prev, [key]: value }));
    if (key === "amount" || key === "date") {
      setNewExpense((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleClearFile = () => {
    setUploadedImage(null);
    setReceiptData({});
    setNewExpense({ description: "", amount: "", date: "" });
  };

  const addExpense = async () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.date) return;
    await createExpenseZ.mutateAsync(newExpense);
    setIsAddOpen(false);
    handleClearFile();
  };

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    // You can integrate with FileViewer or other preview component
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Kosten
          <span className="ml-2 text-muted-foreground">
            Totaal: {formatCurrency(totalExpenses)}
          </span>
        </h2>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Kosten toevoegen
        </Button>
      </div>

      <Input
        placeholder="Zoek kosten..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {expenses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {expenses.map((expense) => (
            <Card key={expense.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{expense.description}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(expense.date), "d MMMM yyyy", { locale: nl })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {expense.receiptUrl && (
                      <Button variant="outline" size="sm" onClick={() => handlePreview(expense.receiptUrl)}>
                        <File className="h-4 w-4 mr-2" /> Bekijk bon
                      </Button>
                    )}
                    <p className="text-lg font-bold">{formatCurrency(expense.amount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between pt-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleChangePage("prev")}
              disabled={!meta || meta.current_page <= 1}
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleChangePage("next")}
              disabled={!meta || meta.current_page >= meta.last_page}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Er zijn nog geen kosten toegevoegd aan dit project.
            </p>
          </CardContent>
        </Card>
      )}

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Kosten toevoegen</DialogTitle>
            <DialogDescription>
              Upload een bonnetje om automatisch de gegevens uit te lezen met AI
            </DialogDescription>
          </DialogHeader>

          {!uploadedImage ? (
            <ReceiptUploadArea onFileUpload={handleFileUpload} />
          ) : (
            <div className="space-y-4">
              <ReceiptFilePreview imageSrc={uploadedImage} onClear={handleClearFile} />
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-sm text-center text-muted-foreground">
                    Bon wordt geanalyseerd met AI...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted/40 p-3 rounded-md border">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" /> AI herkende:
                    </h3>
                    <ReceiptFormFields
                      receiptData={receiptData}
                      onInputChange={handleReceiptDataChange}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Beschrijving</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Omschrijf de kosten"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Bedrag</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Datum</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense((prev) => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Annuleren</Button>
            <Button onClick={addExpense} disabled={isProcessing || !newExpense.description || !newExpense.amount}>Toevoegen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};