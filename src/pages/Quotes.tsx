import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { QuotesHeader } from "@/components/quotes/QuotesHeader";
import { QuotesTable } from "@/components/quotes/QuotesTable";
import {
  useGetQuotation,
  useGetQuotations,
  useCreateQuotation,
  useUpdateQuotation,
  useDeleteQuotation,
} from "@/zustand/hooks/useQuotation";
import { ParamGlobal } from "@/zustand/types/apiT";
import { QuotationReq, QuotationRes } from "@/zustand/types/quotationT";
import { FormProvider, useForm } from "react-hook-form";
import { formatCurrency } from "@/utils/format";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useNavigate } from "react-router-dom";

const defaultQuotationData: QuotationReq = {
  leads: [],
  title: "",
  description: "",
  notes: "",
  planned_start_date: "",
  status: "",
  address: {
    street: "",
    city: "",
    postal_code: "",
    house_number: ""
  },
  items: [],
  sub_total: 0,
  discount_amount: 0,
  discount_type: "percentage",
  total_amount: 0
};

const Quotations = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    quotation: false,
    deleteQuotation: false,
  });

  const methods = useForm<QuotationReq>({
    defaultValues: defaultQuotationData,
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
  const getQuotationZ = useGetQuotation(quotationId);
  const createQuotationZ = useCreateQuotation();
  const updateQuotationZ = useUpdateQuotation();
  const deleteQuotationZ = useDeleteQuotation();

  const handleCreate = () => {
    // methods.reset(defaultQuotationData);
    // setQuotationId("");
    // setModal(prev => ({ ...prev, quotation: true }));
    navigate("/quotes/create");
  };

  // const handleStore = async (data: QuotationReq) => {
  //   try {
  //     await createQuotationZ.mutateAsync({
  //       ...data,
  //       price: formatCurrency(data.price),
  //       btw_percentage: formatCurrency(data.btw_percentage)
  //     });
  //     setModal(prev => ({ ...prev, quotation: false }));
  //   } catch (error) {
  //     throw new Error("Failed to create quotation: " + error);
  //   }
  // };

  const handleEdit = (data: QuotationReq) => {
    // setQuotationId(data.id ?? "");
    // setModal(prev => ({ ...prev, quotation: true }));
    navigate(`/quotes/${data.id}/edit`);
  };

  const handleUpdate = async (data: QuotationReq) => {
    try {
      await updateQuotationZ.mutateAsync({ id: data.id!, formData: data });
      setModal(prev => ({ ...prev, quotation: false }));
    } catch (error) {
      throw new Error("Failed to update quotation: " + error);
    }
  };

  const handleShow = (data: QuotationReq) => {
    // navigate(`/quotation/${data.id}`);
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

  useEffect(() => {
    if (createQuotationZ.isError) {
      mapApiErrorsToForm(createQuotationZ.error.errors, methods.setError);
    }
  }, [createQuotationZ.isError, createQuotationZ.error, methods.setError]);

  useEffect(() => {
    if (updateQuotationZ.isError) {
      mapApiErrorsToForm(updateQuotationZ.error.errors, methods.setError);
    }
  }, [updateQuotationZ.isError, updateQuotationZ.error, methods.setError]);

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
          onShow={handleShow}
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
