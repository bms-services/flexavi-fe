
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { mockProducts } from "@/data/mockProducts";
import { mockCategories } from "@/data/mockCategories";
import { ProductDialog } from "@/components/products/ProductDialog";
import { CategoryDialog } from "@/components/products/CategoryDialog";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { CategoriesOverview } from "@/components/products/CategoriesOverview";
import { ProductsTable } from "@/components/products/ProductsTable";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (productData: Partial<Product>) => {
    console.log("Save product:", productData);
  };

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    console.log("Save category:", categoryData);
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <ProductsHeader
          onNewProduct={() => {
            setEditingProduct(undefined);
            setProductDialogOpen(true);
          }}
          onNewCategory={() => {
            setEditingCategory(undefined);
            setCategoryDialogOpen(true);
          }}
        />

        <CategoriesOverview
          categories={mockCategories}
          onEditCategory={(category) => {
            setEditingCategory(category);
            setCategoryDialogOpen(true);
          }}
        />

        <ProductsTable
          products={filteredProducts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEditProduct={(product) => {
            setEditingProduct(product);
            setProductDialogOpen(true);
          }}
          formatCurrency={formatCurrency}
        />

        <ProductDialog
          open={productDialogOpen}
          onOpenChange={setProductDialogOpen}
          product={editingProduct}
          onSave={handleSaveProduct}
        />

        <CategoryDialog
          open={categoryDialogOpen}
          onOpenChange={setCategoryDialogOpen}
          category={editingCategory}
          onSave={handleSaveCategory}
        />
      </div>
    </Layout>
  );
};

export default Products;
