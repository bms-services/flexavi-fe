
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Category } from "@/types/category";

interface CategoriesOverviewProps {
  categories: Category[];
  onEditCategory: (category: Category) => void;
}

export const CategoriesOverview: React.FC<CategoriesOverviewProps> = ({
  categories,
  onEditCategory,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorieën</CardTitle>
        <CardDescription>Overzicht van productcategorieën</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditCategory(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  {category.description || "Geen beschrijving"}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
