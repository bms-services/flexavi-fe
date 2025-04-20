
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { mockCalculators } from "@/data/mockCalculators";
import { Calculator } from "@/types/calculator";
import { formatCurrency, calculateSummary, createNewCalculator } from "@/utils/calculatorUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator as CalculatorIcon, Plus, Search, Edit, Trash, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { toast } from "sonner";

const CalculatorPage = () => {
  const [calculators, setCalculators] = useState<Calculator[]>(mockCalculators);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCalculators = calculators.filter(calc => 
    calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    const newCalculator = createNewCalculator();
    setCalculators([...calculators, newCalculator]);
    navigate(`/calculator/${newCalculator.id}`);
    toast.success("Nieuwe berekening aangemaakt");
  };

  const handleDelete = (id: string) => {
    setCalculators(calculators.filter(calc => calc.id !== id));
    toast.success("Berekening verwijderd");
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd-MM-yyyy HH:mm");
    } catch {
      return dateString;
    }
  };

  return (
    <Layout>
      <div className="container max-w-full py-4 px-2 sm:px-4 md:px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <CalculatorIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Dak Calculator
          </h1>
        </div>

        <div className="bg-white rounded-lg p-3 sm:p-4 shadow border mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Zoek berekeningen..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleCreateNew} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Nieuwe berekening
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naam</TableHead>
                  <TableHead className="hidden md:table-cell">Beschrijving</TableHead>
                  <TableHead className="hidden sm:table-cell">Datum</TableHead>
                  <TableHead className="hidden lg:table-cell">Dakoppervlak</TableHead>
                  <TableHead className="text-right">Totaalbedrag</TableHead>
                  <TableHead className="text-right">Acties</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalculators.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Geen berekeningen gevonden.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCalculators.map((calc) => {
                    const summary = calculateSummary(calc);
                    return (
                      <TableRow key={calc.id}>
                        <TableCell className="font-medium">
                          <Link 
                            to={`/calculator/${calc.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {calc.name}
                          </Link>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs truncate">
                          {calc.description}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {formatDate(calc.updatedAt)}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {calc.roofParams.roofArea} m²
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(summary.total)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <Link to={`/calculator/${calc.id}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Bewerken</span>
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(calc.id)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Verwijderen</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalculatorPage;
