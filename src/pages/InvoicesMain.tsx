
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation, Outlet } from "react-router-dom";
import { InvoicesHeader } from "@/components/invoices/InvoicesHeader";
import { InvoicesTable } from "@/components/invoices/InvoicesTable";
import { CreditInvoiceDialog } from "@/components/invoices/CreditInvoiceDialog";
import { InvoicesFilters } from "./InvoicesFilters";
import { InvoiceKPIs } from "@/components/invoices/InvoiceKPIs";
import { useInvoiceFilters } from "@/hooks/useInvoiceFilters";
import { useInvoiceActions } from "@/hooks/useInvoiceActions";
import { calculateInvoiceKPIs } from "@/components/invoices/InvoiceKPICalculator";

export const statusOptions = [
  { value: "draft", label: "Concept" },
  { value: "sent", label: "Verzonden" },
  { value: "paid", label: "Betaald" },
  { value: "overdue", label: "Te laat" },
  { value: "canceled", label: "Geannuleerd" },
  { value: "collection", label: "Incasso" },
  { value: "legal", label: "Juridisch" },
];

const itemsPerPageOptions = [10, 25, 100];

const InvoicesMain = () => {
  const {
    filters,
    currentPage,
    itemsPerPage,
    totalPages,
    filteredInvoices,
    pageInvoices,
    getLeadName,
    setCurrentPage,
    setItemsPerPage,
    handleChangeFilter,
  } = useInvoiceFilters();

  const {
    creditDialogOpen,
    selectedInvoice,
    setCreditDialogOpen,
    handleViewInvoice,
    handleEditInvoice,
    handleDeleteInvoice,
    handleCreateNewInvoice,
    handleCreditInvoice,
    createCreditInvoice,
  } = useInvoiceActions();

  const location = useLocation();
  const kpis = calculateInvoiceKPIs(filteredInvoices);

  const renderContent = () => {
    if (location.pathname.includes("/filter")) {
      return (
        <InvoicesFilters
          filters={filters}
          onChange={handleChangeFilter}
          totalValue={filteredInvoices.reduce((sum, q) => sum + q.amount, 0)}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          filteredInvoices={filteredInvoices}
        />
      );
    }
    return <Outlet />;
  };

  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <InvoicesHeader onCreateNewInvoice={handleCreateNewInvoice} />
        <InvoiceKPIs
          total={kpis.total}
          paid={kpis.paid}
          outstanding={kpis.outstanding}
        />
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Factuuroverzicht</CardTitle>
                <CardDescription>Een lijst van alle facturen</CardDescription>
              </div>
              <div className="relative w-full sm:w-auto sm:max-w-xs">
                <Input
                  type="search"
                  placeholder="Zoek facturen..."
                  className="pl-8"
                  value={filters.searchTerm}
                  onChange={(e) => handleChangeFilter("searchTerm", e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderContent()}
            {!location.pathname.includes("/filter") && (
              <>
                <InvoicesFilters
                  filters={filters}
                  onChange={handleChangeFilter}
                  totalValue={filteredInvoices.reduce((sum, q) => sum + q.amount, 0)}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  itemsPerPageOptions={itemsPerPageOptions}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  filteredInvoices={filteredInvoices}
                />
                <InvoicesTable
                  invoices={pageInvoices}
                  getLeadName={getLeadName}
                  onView={handleViewInvoice}
                  onEdit={handleEditInvoice}
                  onDelete={handleDeleteInvoice}
                  onCredit={handleCreditInvoice}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <CreditInvoiceDialog
        open={creditDialogOpen}
        onOpenChange={setCreditDialogOpen}
        selectedInvoice={selectedInvoice}
        onCredit={createCreditInvoice}
      />
    </Layout>
  );
};

export default InvoicesMain;
