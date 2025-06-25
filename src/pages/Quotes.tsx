import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { QuotesHeader } from "@/components/quotes/QuotesHeader";
import { QuotesTable } from "@/components/quotes/QuotesTable";
import {
  useGetQuotation,
  useGetQuotations,
  useDeleteQuotation,
} from "@/zustand/hooks/useQuotation";
import { ParamGlobal } from "@/zustand/types/apiT";
import { QuotationReq, QuotationRes } from "@/zustand/types/quotationT";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useNavigate } from "react-router-dom";

const Quotations = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    quotation: false,
    deleteQuotation: false,
  });



  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const [quotationId, setQuotationId] = useState<string>("");

  const getQuotationsZ = useGetQuotations(params);
  // const getQuotationZ = useGetQuotation(quotationId);

  const deleteQuotationZ = useDeleteQuotation();

  const handleCreate = () => {
    navigate("/quotes/create");
  };

  const handleEdit = (data: QuotationReq) => {
    navigate(`/quotes/edit/${data.id}`);
  };

  const handleDelete = async (ids: QuotationRes[]) => {
    const quotationIds = ids.map(id => id.id).filter((id): id is string => typeof id === "string");
    try {
      await deleteQuotationZ.mutateAsync({
        ids: quotationIds,
        force: false
      });
      setQuotationId("");
    } catch (error) {
      throw new Error("Failed to delete quotation: " + error);
    }
  };


  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <QuotesHeader
          onNewQuotation={handleCreate}
        />

        <QuotesTable
          params={params}
          setParams={setParams}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getQuotationsZ={getQuotationsZ}
        />

        {/* Delete Quotation */}
        <ConfirmDialog
          open={modal.deleteQuotation}
          onCancel={() => setModal(prev => ({ ...prev, deleteQuotation: false }))}
          onConfirm={() => handleDelete([{ id: quotationId } as QuotationRes])}
          title="Weet je het zeker?"
          description="Weet je zeker dat je deze offerte wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
          loading={deleteQuotationZ.isPending}
        />
      </div>
    </Layout>
  );
};

export default Quotations;
