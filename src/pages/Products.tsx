
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle, Pencil, Trash2, FolderIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";
import { ProductDialog } from "@/components/products/ProductDialog";
import { CategoryDialog } from "@/components/products/CategoryDialog";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { mockCategories } from "@/data/mockCategories";

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

  // Function to determine product status badge
  const getProductStatusBadge = (product: Product) => {
    // This is a placeholder - in a real app you'd have actual status logic
    // For now, we'll just randomly assign statuses based on product ID
    const statusOptions = [
      { label: "Actief", variant: "success" as const },
      { label: "Inactief", variant: "secondary" as const },
      { label: "Uitverkocht", variant: "warning" as const },
    ];
    
    // Simple hash function to consistently get same status for same product
    const statusIndex = parseInt(product.id.slice(-1), 16) % statusOptions.length;
    return statusOptions[statusIndex];
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Producten</h1>
            <p className="text-muted-foreground">
              Beheer al je producten en diensten op één plek
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => {
                setEditingCategory(undefined);
                setCategoryDialogOpen(true);
              }}
              className="w-full sm:w-auto"
            >
              <FolderIcon className="mr-2 h-4 w-4" />
              Categorie
            </Button>
            <Button
              onClick={() => {
                setEditingProduct(undefined);
                setProductDialogOpen(true);
              }}
              className="w-full sm:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Nieuw Product
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Productoverzicht</CardTitle>
                <CardDescription>
                  Een lijst van alle producten en diensten
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-auto sm:max-w-xs">
                <Input
                  type="search"
                  placeholder="Zoek producten..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Acties</TableHead>
                    <TableHead>Titel</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Omschrijving
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">Eenheid</TableHead>
                    <TableHead>Prijs</TableHead>
                    <TableHead className="hidden sm:table-cell">BTW</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const statusBadge = getProductStatusBadge(product);
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingProduct(product);
                                setProductDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.title}
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs truncate">
                          {product.description}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{product.unit}</TableCell>
                        <TableCell>
                          {formatCurrency(product.pricePerUnit)}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{product.vat}%</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </Layout>
  );
};

export default Products;
