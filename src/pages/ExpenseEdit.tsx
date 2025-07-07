
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
  status: "concept"
};

const ExpenseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const methods = useForm<ExpenseReq>({
    defaultValues: defaultExpenseData,
  });

  const createExpenseZ = useCreateExpense();
  const updateExpenseZ = useUpdateExpense();
  const getExpenseZ = useGetExpense(id || "");

  const navigate = useNavigate();

  const handleStore = async (data: ExpenseReq) => {
    await createExpenseZ.mutateAsync({
      ...data,
      voucher: "no_voucher",
    });
  };

  const handleUpdate = async (data: ExpenseReq) => {
    await updateExpenseZ.mutateAsync({ id: id || "", formData: data });
  };


  // useEffect(() => {
  //   if (getExpenseZ.isSuccess && getExpenseZ.data.result) {
  //     const data = getExpenseZ.data.result;
  //     methods.reset({
  //       ...data,
  //       company: data.company.id,
  //       due_date: data.due_date || "",
  //       amount: Number(data.amount),
  //       percentage: Number(data.percentage),
  //       vat_amount: Number(data.vat_amount),
  //       total_amount: Number(data.total_amount),
  //     });
  //   }
  // }, [getExpenseZ.isSuccess, getExpenseZ.data, methods]);

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
