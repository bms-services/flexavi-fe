
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductsTableProps {
  products: Product[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onEditProduct: (product: Product) => void;
  formatCurrency: (amount: number) => string;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  searchTerm,
  onSearchChange,
  onEditProduct,
  formatCurrency,
}) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditProduct(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {product.description}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.unit}
                  </TableCell>
                  <TableCell>{formatCurrency(product.pricePerUnit)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.vat}%
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
