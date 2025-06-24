
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Category } from "@/types/category";
import { mockProducts } from "@/data/mockProducts";
import { ProductDialog } from "@/components/products/ProductDialog";
import { CategoryDialog } from "@/components/products/CategoryDialog";
import { mockCategories } from "@/data/mockCategories";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { CategoriesOverview } from "@/components/products/CategoriesOverview";
import { ProductsTable } from "@/components/products/ProductsTable";
import { useGetProduct, useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/zustand/hooks/useProduct";
import { ParamGlobal } from "@/zustand/types/apiT";
import { ProductReq, ProductRes } from "@/zustand/types/productT";
import { FormProvider, useForm } from "react-hook-form";
import { formatCurrency, formatCurrencyToNumber } from "@/utils/format";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";

const defaultProductData: ProductReq = {
  title: "",
  description: "",
  price: "0",
  category_id: "",
  unit: 0,
  btw_percentage: "0"
};

const Products = () => {
  // const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [modal, setModal] = useState({
    product: false,
    category: false,
  });

  const methods = useForm<ProductReq>({
    defaultValues: defaultProductData,
  });

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const [productId, setProductId] = useState<string>("");

  const getProductsZ = useGetProducts(params);
  const getProductZ = useGetProduct(productId);
  const createProductZ = useCreateProduct();
  const updateProductZ = useUpdateProduct();
  const deleteProductZ = useDeleteProduct();

  /**
     * Handle create lead
     * 
     * @returns void
     */
  const handleCreate = () => {
    methods.reset(defaultProductData);
    setProductId("");
    setModal(prev => ({ ...prev, product: true }));
  };

  /**
   * Handle store lead
   * 
   * @param data 
   * @returns Promise<void>
   */
  const handleStore = async (data: ProductReq) => {
    try {
      await createProductZ.mutateAsync({
        ...data,
        category_id: typeof data.category_id === "string" ? data.category_id : data.category_id.value,
        price: formatCurrency(data.price),
        btw_percentage: formatCurrency(data.btw_percentage)
      });
      setModal(prev => ({ ...prev, product: false }));
    } catch (error) {
      throw new Error("Failed to create lead: " + error);
    }
  };

  /**
   * Handle edit lead
   * 
   * @param data 
   * @returns void
   */
  const handleEdit = (data: ProductReq) => {
    setProductId(data.id ?? "");
    setModal(prev => ({ ...prev, product: true }));
  };

  /**
   * Handle update lead
   * 
   * @param data 
   * @returns Promise<void>
   */
  const handleUpdate = async (data: ProductReq) => {
    try {
      await updateProductZ.mutateAsync({ id: data.id!, formData: data });
      setModal(prev => ({ ...prev, product: false }));
    } catch (error) {
      throw new Error("Failed to update lead: " + error);
    }
  };

  /**
   * Handle show lead detail
   * 
   * @param data 
   * @returns void
   */
  const handleShow = (data: ProductRes) => {
    // navigate(`/lead/${data.id}`);
  };

  /**
   * Handle delete lead
   * 
   * @param ids 
   * @returns Promise<void>
   */
  const handleDelete = async (ids: ProductRes[]) => {
    const leadIds = ids.map(id => id.id).filter((id): id is string => typeof id === "string");
    try {
      await deleteProductZ.mutateAsync({
        ids: leadIds,
        force: false
      });
      setProductId("");
    } catch (error) {
      throw new Error("Failed to delete lead: " + error);
    }
  };

  useEffect(() => {
    if (createProductZ.isError) {
      mapApiErrorsToForm(createProductZ.error.errors, methods.setError);
    }
  }, [createProductZ.isError, createProductZ.error, methods.setError]);


  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <ProductsHeader
          onNewProduct={handleCreate}
          onNewCategory={undefined}
        />

        {/* <CategoriesOverview
          categories={mockCategories}
          onEditCategory={(category) => {
            setEditingCategory(category);
            setCategoryDialogOpen(true);
          }}
        /> */}

        <ProductsTable
          params={params}
          setParams={setParams}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShow={handleShow}
          getProductsZ={getProductsZ}
        />

        <FormProvider {...methods}>
          <ProductDialog
            open={modal.product}
            onOpenChange={(value) => setModal(prev => ({ ...prev, product: value }))}
            productId={productId}
            onSave={productId ? handleUpdate : handleStore}
          />
        </FormProvider>

        {/* <CategoryDialog
          open={categoryDialogOpen}
          onOpenChange={setCategoryDialogOpen}
          category={editingCategory}
          onSave={handleSaveCategory}
        /> */}
      </div>
    </Layout>
  );
};

export default Products;
