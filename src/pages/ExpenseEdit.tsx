
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { ExpenseReq } from "@/zustand/types/expenseT";
import { useCreateExpense, useGetExpense, useUpdateExpense } from "@/zustand/hooks/useExpense";

import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpenseHeader } from "@/components/expenses/ExpenseHeader";
import { useEffect } from "react";
import { formatNormalizeCurrency } from "@/utils/format";

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

const appendExpenses = (data: ExpenseReq, isUpdate: boolean) => {
  const formData = new FormData();

  if (isUpdate) {
    formData.append('_method', "patch");
  }

  formData.append('company', data.company);
  formData.append('due_date', data.due_date);
  formData.append('description', data.description);
  formData.append('amount', String(formatNormalizeCurrency(data.amount)));
  formData.append('percentage', String(formatNormalizeCurrency(data.percentage)));
  formData.append('vat_amount', String(formatNormalizeCurrency(data.vat_amount)));
  formData.append('total_amount', String(formatNormalizeCurrency(data.total_amount)));
  formData.append('notes', data.notes || '');
  formData.append('type', data.type);
  formData.append('status', data.status);
  // formData.append('voucher', data.voucher || 'no_voucher');

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
    const formData = appendExpenses(data, false);
    await createExpenseZ.mutateAsync(formData);
  };

  const handleUpdate = async (data: ExpenseReq) => {
    const formData = appendExpenses(data, true);
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
        type: data.type || "material",
        tags: data.tags.map((tag) => {
          return typeof tag === 'string' ? {
            id: tag,
            className: "",
            text: tag
          } : tag;
        }),
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
