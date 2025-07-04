
import React from "react";
import { Button } from "@/components/ui/button";
import { FolderIcon, PlusCircle } from "lucide-react";

interface ProductsHeaderProps {
  onNewProduct: () => void;
  onNewCategory: () => void;
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  onNewProduct,
  onNewCategory,
}) => {
  return (
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
          onClick={onNewCategory}
          className="w-full sm:w-auto"
        >
          <FolderIcon className="mr-2 h-4 w-4" />
          Categorie
        </Button>
        <Button onClick={onNewProduct} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuw Product
        </Button>
      </div>
    </div>
  );
};
