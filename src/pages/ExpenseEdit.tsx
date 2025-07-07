
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { ExpenseReq } from "@/zustand/types/expenseT";
import { useCreateExpense, useGetExpense, useUpdateExpense } from "@/zustand/hooks/useExpense";

import { ExpenseRes } from "@/zustand/types/expenseT";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpenseHeader } from "@/components/expenses/ExpenseHeader";

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
  status: null,
  notes: "",
  receipt_url: null,
  created_at: "",
  updated_at: ""
};


const ExpenseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const methods = useForm<ExpenseReq>({
    defaultValues: defaultExpenseData,
  });

  const createExpenseZ = useCreateExpense();
  const updateExpenseZ = useUpdateExpense();
  const getExpenseZ = useGetExpense(id || "");

  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const isEdit = searchParams.get("edit") === "true";
  // const isNewExpense = id?.startsWith("exp-new-");

  // For new expenses, create a placeholder

  // For existing expenses, get from mock data
  // const expense = isNewExpense
  //   ? placeholderExpense
  //   : getExpenseById(id || "");

  // if (!expense && !isNewExpense) {
  //   return <NotFound />;
  // }

  const handleSave = (data: Partial<ExpenseReq>) => {
    // In a real app, we would make an API call to update the expense
    // const updated = { ...currentExpense, ...updatedExpense };
    // setCurrentExpense(updated);
    // setIsEditing(false);
  };

  const handleStore = async (data: ExpenseReq) => {
    await createExpenseZ.mutateAsync(data);
  };

  const handleUpdate = async (data: ExpenseReq) => {
    await updateExpenseZ.mutateAsync({ id: id || "", formData: data });
  };


  const handleStatus = (newStatus: ExpenseRes["status"]) => {
    const updated = { ...currentExpense, status: newStatus };
    // setCurrentExpense(updated);

  };

  const currentExpense = getExpenseZ.data?.result || placeholderExpense;

  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(id ? handleUpdate : handleStore)}>
          <div className="px-[24px] py-6 space-y-6">
            <ExpenseHeader
              isEditing={false} isReadOnly={false}
            />
            <ExpenseForm
              expense={currentExpense}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default ExpenseEdit;
