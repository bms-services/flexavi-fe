
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductDialog } from "@/components/products/ProductDialog";
import { CategoryDialog } from "@/components/products/CategoryDialog";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsTable } from "@/components/products/ProductsTable";
import { useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useGetProductCategories, useCreateProductCategory, useUpdateProductCategory, useDeleteProductCategory } from "@/zustand/hooks/useProduct";
import { ParamGlobal } from "@/zustand/types/apiT";
import { ProductCategoryReq, ProductReq, ProductRes } from "@/zustand/types/productT";
import { FormProvider, useForm } from "react-hook-form";
import { formatCurrency } from "@/utils/format";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import ProductCategoryCanvas from "@/components/products/ProductCategoryCanvas";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Offcanvas } from "tw-elements";
const defaultProductData: ProductReq = {
  title: "",
  description: "",
  price: "0",
  category_id: "",
  unit: "",
  btw_percentage: "0"
};

const defaultCategoryData: ProductCategoryReq = {
  name: "",
  description: "",
};

const Products = () => {
  // const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [modal, setModal] = useState({
    product: false,
    category: false,
    deleteCategory: false,
  });

  const methods = useForm<ProductReq>({
    defaultValues: defaultProductData,
  });

  const methodCategory = useForm<ProductCategoryReq>({
    defaultValues: defaultCategoryData,
  });

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const [paramsCategory, setParamsCategory] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const [productId, setProductId] = useState<string>("");
  const [productCategoryId, setProductCategoryId] = useState<string>("");

  const getProductsZ = useGetProducts(params);
  const createProductZ = useCreateProduct();
  const updateProductZ = useUpdateProduct();
  const deleteProductZ = useDeleteProduct();


  const getProductCategoryZ = useGetProductCategories(paramsCategory)
  const createProductCategoryZ = useCreateProductCategory();
  const updateProductCategoryZ = useUpdateProductCategory();
  const deleteProductCategoryZ = useDeleteProductCategory();


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
  const handleShow = (data: ProductReq) => {
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

  // Product Category 
  const handleCreateCategory = () => {
    closeProductCategoryCanvas();
    methodCategory.reset(defaultCategoryData);
    setProductCategoryId("");
    setModal(prev => ({ ...prev, category: true }));
  };

  const handleStoreCategory = async (data: ProductCategoryReq) => {
    try {
      await createProductCategoryZ.mutateAsync(data);
      setModal(prev => ({ ...prev, category: false }));
      openProductCategoryCanvas();
    } catch (error) {
      throw new Error("Failed to create product category: " + error);
    }
  };

  const handleEditCategory = (data: ProductCategoryReq) => {
    closeProductCategoryCanvas();
    methodCategory.reset(data);
    setProductCategoryId(data.id ?? "");
    setModal(prev => ({ ...prev, category: true }));
  };

  const handleUpdateCategory = async (data: ProductCategoryReq) => {
    try {
      await updateProductCategoryZ.mutateAsync({ id: data.id!, formData: data });
      setModal(prev => ({ ...prev, category: false }));
      openProductCategoryCanvas();
    } catch (error) {
      throw new Error("Failed to update product category: " + error);
    }
  };

  const handleDeleteCategory = (id: string) => {
    closeProductCategoryCanvas();
    setProductCategoryId(id);
    setModal(prev => ({ ...prev, deleteCategory: true }));
  };

  const handleDestroyCategory = async (id: string) => {
    try {
      await deleteProductCategoryZ.mutateAsync({
        ids: [id],
        force: false
      });
      setProductCategoryId("");
      setModal(prev => ({ ...prev, deleteCategory: false }));
      openProductCategoryCanvas();
    } catch (error) {
      throw new Error("Failed to delete product category: " + error);
    }
  };

  const closeProductCategoryCanvas = () => {
    const instance = Offcanvas.getInstance("#productCategoryCanvas");
    instance?.hide();
  };

  const openProductCategoryCanvas = () => {
    const instance = Offcanvas.getInstance("#productCategoryCanvas");
    instance?.show();
  };

  useEffect(() => {
    if (createProductZ.isError) {
      mapApiErrorsToForm(createProductZ.error.errors, methods.setError);
    }
  }, [createProductZ.isError, createProductZ.error, methods.setError]);

  useEffect(() => {
    if (updateProductZ.isError) {
      mapApiErrorsToForm(updateProductZ.error.errors, methods.setError);
    }
  }, [updateProductZ.isError, updateProductZ.error, methods.setError]);


  useEffect(() => {
    if (createProductCategoryZ.isError) {
      mapApiErrorsToForm(createProductCategoryZ.error.errors, methodCategory.setError);
    }
  }, [createProductCategoryZ.isError, createProductCategoryZ.error, methodCategory.setError]);

  useEffect(() => {
    if (updateProductCategoryZ.isError) {
      mapApiErrorsToForm(updateProductCategoryZ.error.errors, methodCategory.setError);
    }
  }, [updateProductCategoryZ.isError, updateProductCategoryZ.error, methodCategory.setError]);

  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <ProductsHeader
          onNewProduct={handleCreate}
        />

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

        <ProductCategoryCanvas
          handleCreateCategory={handleCreateCategory}
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
          getProductCategoryZ={getProductCategoryZ}
          params={paramsCategory}
          setParams={setParamsCategory}
        />

        <FormProvider {...methodCategory}>
          <CategoryDialog
            open={modal.category}
            onOpenChange={(value) => {
              setModal(prev => ({ ...prev, category: value }));
              openProductCategoryCanvas();
            }}
            productCategoryId={productCategoryId}
            onSave={productCategoryId ? handleUpdateCategory : handleStoreCategory}
          />
        </FormProvider>


        {/* Delete Category */}
        <ConfirmDialog
          open={modal.deleteCategory}
          onCancel={() => {
            setModal(prev => ({ ...prev, deleteCategory: false }));
            openProductCategoryCanvas();
          }}
          onConfirm={() => handleDestroyCategory(productCategoryId)}
          title="Weet je het zeker?"
          description="Weet je zeker dat je deze categorie wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
          loading={deleteProductZ.isPending}
        />

      </div>
    </Layout>
  );
};

export default Products;
