
import { Layout } from "@/components/layout/Layout";
import { InvoicesHeader } from "@/components/invoices/InvoicesHeader";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { ParamGlobal } from "@/zustand/types/apiT";
import { useState } from "react";
import { useDeleteInvoice, useGetInvoices } from "@/zustand/hooks/useInvoice";
import { InvoiceRes } from "@/zustand/types/invoiceT";
import { useNavigate } from "react-router-dom";

const InvoicesMain = () => {
  const navigate = useNavigate();

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const getInvoicesZ = useGetInvoices(params);
  const deleteInvoiceZ = useDeleteInvoice();

  const handleCreate = () => {
    navigate("/invoices/create");
  };

  const handleEdit = (data: InvoiceRes) => {
    navigate(`/invoices/edit/${data.id}`);
  };

  const handleDelete = async (ids: InvoiceRes[]) => {
    const invoiceIds = ids.map(id => id.id).filter((id): id is string => typeof id === "string");
    await deleteInvoiceZ.mutateAsync({
      ids: invoiceIds,
      force: false
    });
  };


  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <InvoicesHeader onCreateNewInvoice={handleCreate} />
        {/* <InvoiceKPIs
          total={kpis.total}
          paid={kpis.paid}
          outstanding={kpis.outstanding}
        /> */}

        <InvoiceTable
          params={params}
          setParams={setParams}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getInvoicesZ={getInvoicesZ} />
      </div>
      {/* <CreditInvoiceDialog
        open={creditDialogOpen}
        onOpenChange={setCreditDialogOpen}
        selectedInvoice={selectedInvoice}
        onCredit={createCreditInvoice}
      /> */}
    </Layout>
  );
};

export default InvoicesMain;
