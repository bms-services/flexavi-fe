import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { QuotesHeader } from "@/components/quotes/QuotesHeader";
import { QuotesTable } from "@/components/quotes/QuotesTable";
import {
  useGetQuotations,
  useDeleteQuotation,
} from "@/zustand/hooks/useQuotation";
import { ParamGlobal } from "@/zustand/types/apiT";
import { QuotationRes } from "@/zustand/types/quotationT";
import { useNavigate } from "react-router-dom";

const Quotations = () => {
  const navigate = useNavigate();

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const getQuotationsZ = useGetQuotations(params);
  const deleteQuotationZ = useDeleteQuotation();

  const handleCreate = () => {
    navigate("/quotes/create");
  };

  const handleEdit = (data: QuotationRes) => {
    navigate(`/quotes/edit/${data.id}`);
  };

  const handleDelete = async (ids: QuotationRes[]) => {
    const quotationIds = ids.map(id => id.id).filter((id): id is string => typeof id === "string");
    await deleteQuotationZ.mutateAsync({
      ids: quotationIds,
      force: false
    });
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
      </div>
    </Layout>
  );
};

export default Quotations;
