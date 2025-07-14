
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ExpenseReq } from "@/zustand/types/expenseT";
import { useCreateExpense, useGetExpense, useUpdateExpense } from "@/zustand/hooks/useExpense";

import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpenseHeader } from "@/components/expenses/ExpenseHeader";
import { useEffect } from "react";

const defaultExpenseData: ExpenseReq = {
  company: "",
  due_date: "",
  description: "",
  type: "material",
  amount: 0,
  percentage: 0,
  vat_amount: 0,
  total_amount: 0,
  notes: "",
  voucher: "",
  status: "concept",
  tags: [],
};

const convertToFormData = (data: ExpenseReq) => {
  const formData = new FormData();
  formData.append('company', data.company);
  formData.append('due_date', data.due_date);
  formData.append('description', data.description);
  formData.append('type', data.type);
  formData.append('amount', String(data.amount));
  formData.append('percentage', String(data.percentage));
  formData.append('vat_amount', String(data.vat_amount));
  formData.append('total_amount', String(data.total_amount));
  formData.append('notes', data.notes || '');
  // formData.append('voucher', data.voucher || 'no_voucher');
  formData.append('status', data.status);

  data.tags?.forEach((tag) => {
    if (typeof tag === 'string') {
      formData.append('tags[]', tag);
    } else if (typeof tag === 'object' && tag.text) {
      formData.append('tags[]', tag.text);
    }
  });

  // data.attachments?.forEach((file) => {
  //   formData.append('attachments[]', file);
  // });

  return formData;
};

const ExpenseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const methods = useForm<ExpenseReq>({
    defaultValues: defaultExpenseData,
  });

  const createExpenseZ = useCreateExpense();
  const updateExpenseZ = useUpdateExpense();
  const getExpenseZ = useGetExpense(id || "");


  const handleStore = async (data: ExpenseReq) => {
    const formData = convertToFormData({
      ...data,
      voucher: "no_voucher",
    });

    await createExpenseZ.mutateAsync(formData);
  };

  const handleUpdate = async (data: ExpenseReq) => {
    const formData = convertToFormData(data);
    await updateExpenseZ.mutateAsync({ id: id || "", formData });
  };

  useEffect(() => {
    if (getExpenseZ.isSuccess && getExpenseZ.data.result) {
      const data = getExpenseZ.data.result;
      methods.reset({
        ...data,
        amount: Number(data.amount),
        percentage: Number(data.percentage),
        vat_amount: Number(data.vat_amount),
        total_amount: Number(data.total_amount),
        status: data.status || undefined,
      });
    }
  }, [getExpenseZ.isSuccess, getExpenseZ.data, methods]);

  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(id ? handleUpdate : handleStore)}>
          <div className="px-[24px] py-6 space-y-6">
            <ExpenseHeader
              isEditing={false} isReadOnly={false}
            />
            <ExpenseForm />
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default ExpenseEdit;
