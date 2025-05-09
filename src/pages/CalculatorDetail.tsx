
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { mockCalculators } from "@/data/mockCalculators";
import { 
  Calculator, CalculationMaterial, CalculationLabor, 
  CalculationEquipment, CalculationMisc, RoofParams 
} from "@/types/calculator";
import { 
  calculateSummary, formatCurrency, formatNumber, 
  estimateMaterialNeeds, estimateLaborHours, createNewCalculator 
} from "@/utils/calculatorUtils";
import { 
  Calculator as CalculatorIcon, Save, ArrowLeft,
  Plus, Trash, RotateCcw, FileText 
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorDetails } from "@/components/calculator/CalculatorDetails";
import { CalculatorMaterials } from "@/components/calculator/CalculatorMaterials";
import { CalculatorLabor } from "@/components/calculator/CalculatorLabor";
import { CalculatorEquipment } from "@/components/calculator/CalculatorEquipment";
import { CalculatorMiscellaneous } from "@/components/calculator/CalculatorMiscellaneous";
import { CalculatorSummary } from "@/components/calculator/CalculatorSummary";

const CalculatorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [calculator, setCalculator] = useState<Calculator | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the calculator in the mock data or create a new one
    if (id) {
      const found = mockCalculators.find(calc => calc.id === id);
      if (found) {
        setCalculator({ ...found });
      } else {
        // Create a new calculator if not found
        const newCalculator = createNewCalculator();
        newCalculator.id = id;
        setCalculator(newCalculator);
      }
    }
    setIsLoading(false);
  }, [id]);

  const handleSave = () => {
    if (calculator) {
      // In a real app, this would save to the backend
      calculator.updatedAt = new Date().toISOString();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (calculator) {
      setCalculator({ ...calculator, name: e.target.value });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (calculator) {
      setCalculator({ ...calculator, description: e.target.value });
    }
  };

  const handleRoofParamsChange = (params: Partial<RoofParams>) => {
    if (calculator) {
      setCalculator({
        ...calculator,
        roofParams: { ...calculator.roofParams, ...params }
      });
    }
  };

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (calculator) {
      const value = parseFloat(e.target.value) || 0;
      setCalculator({ ...calculator, marginPercentage: value });
    }
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (calculator) {
      const value = parseFloat(e.target.value) || 0;
      setCalculator({ ...calculator, taxRate: value });
    }
  };

  // Material handlers
  const handleAddMaterial = () => {
    if (calculator) {
      const newMaterial: CalculationMaterial = {
        id: uuidv4(),
        name: "",
        unit: "stuk",
        unitPrice: 0,
        quantity: 0
      };
      setCalculator({
        ...calculator,
        materials: [...calculator.materials, newMaterial]
      });
    }
  };

  const handleUpdateMaterial = (updatedMaterial: CalculationMaterial) => {
    if (calculator) {
      const updatedMaterials = calculator.materials.map(material =>
        material.id === updatedMaterial.id ? updatedMaterial : material
      );
      setCalculator({ ...calculator, materials: updatedMaterials });
    }
  };

  const handleDeleteMaterial = (id: string) => {
    if (calculator) {
      setCalculator({
        ...calculator,
        materials: calculator.materials.filter(material => material.id !== id)
      });
    }
  };

  // Labor handlers
  const handleAddLabor = () => {
    if (calculator) {
      const newLabor: CalculationLabor = {
        id: uuidv4(),
        description: "",
        hourlyRate: 0,
        hours: 0
      };
      setCalculator({
        ...calculator,
        labor: [...calculator.labor, newLabor]
      });
    }
  };

  const handleUpdateLabor = (updatedLabor: CalculationLabor) => {
    if (calculator) {
      const updatedLabors = calculator.labor.map(labor =>
        labor.id === updatedLabor.id ? updatedLabor : labor
      );
      setCalculator({ ...calculator, labor: updatedLabors });
    }
  };

  const handleDeleteLabor = (id: string) => {
    if (calculator) {
      setCalculator({
        ...calculator,
        labor: calculator.labor.filter(labor => labor.id !== id)
      });
    }
  };

  // Equipment handlers
  const handleAddEquipment = () => {
    if (calculator) {
      const newEquipment: CalculationEquipment = {
        id: uuidv4(),
        name: "",
        rentalRate: 0,
        days: 0
      };
      setCalculator({
        ...calculator,
        equipment: [...calculator.equipment, newEquipment]
      });
    }
  };

  const handleUpdateEquipment = (updatedEquipment: CalculationEquipment) => {
    if (calculator) {
      const updatedEquipments = calculator.equipment.map(equipment =>
        equipment.id === updatedEquipment.id ? updatedEquipment : equipment
      );
      setCalculator({ ...calculator, equipment: updatedEquipments });
    }
  };

  const handleDeleteEquipment = (id: string) => {
    if (calculator) {
      setCalculator({
        ...calculator,
        equipment: calculator.equipment.filter(equipment => equipment.id !== id)
      });
    }
  };

  // Miscellaneous handlers
  const handleAddMisc = () => {
    if (calculator) {
      const newMisc: CalculationMisc = {
        id: uuidv4(),
        description: "",
        cost: 0
      };
      setCalculator({
        ...calculator,
        miscellaneous: [...calculator.miscellaneous, newMisc]
      });
    }
  };

  const handleUpdateMisc = (updatedMisc: CalculationMisc) => {
    if (calculator) {
      const updatedMiscs = calculator.miscellaneous.map(misc =>
        misc.id === updatedMisc.id ? updatedMisc : misc
      );
      setCalculator({ ...calculator, miscellaneous: updatedMiscs });
    }
  };

  const handleDeleteMisc = (id: string) => {
    if (calculator) {
      setCalculator({
        ...calculator,
        miscellaneous: calculator.miscellaneous.filter(misc => misc.id !== id)
      });
    }
  };

  const handleEstimateMaterials = () => {
    if (calculator && calculator.roofParams.roofArea > 0) {
      const { roofType, roofArea, complexity } = calculator.roofParams;
      const estimates = estimateMaterialNeeds(roofArea, roofType, complexity);
      
      // Create new materials based on estimates
      const newMaterials: CalculationMaterial[] = [
        {
          id: uuidv4(),
          ...estimates.mainMaterial
        },
        ...estimates.additionalMaterials.map((material: any) => ({
          id: uuidv4(),
          ...material
        }))
      ];
      
      // Add to existing materials
      setCalculator({
        ...calculator,
        materials: [...calculator.materials, ...newMaterials]
      });
      
    } else {
    }
  };

  const handleEstimateLabor = () => {
    if (calculator && calculator.roofParams.roofArea > 0) {
      const { roofType, roofArea, complexity } = calculator.roofParams;
      const totalHours = estimateLaborHours(roofArea, roofType, complexity);
      
      // Create labor entries
      const dakdekkerHours = Math.ceil(totalHours * 0.6);
      const assistentHours = Math.ceil(totalHours * 0.4);
      
      const newLabor: CalculationLabor[] = [
        {
          id: uuidv4(),
          description: "Dakdekker",
          hourlyRate: 45,
          hours: dakdekkerHours
        },
        {
          id: uuidv4(),
          description: "Assistent dakdekker",
          hourlyRate: 35,
          hours: assistentHours
        }
      ];
      
      // Add to existing labor
      setCalculator({
        ...calculator,
        labor: [...calculator.labor, ...newLabor]
      });
      
    } else {
      console.error("Invalid roof area or parameters");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-6">
          <p>Laden...</p>
        </div>
      </Layout>
    );
  }

  if (!calculator) {
    return (
      <Layout>
        <div className="container py-6">
          <p>Berekening niet gevonden.</p>
          <Button onClick={() => navigate("/calculator")}>Terug naar overzicht</Button>
        </div>
      </Layout>
    );
  }

  const summary = calculateSummary(calculator);

  return (
    <Layout>
      <div className="container max-w-full p-2 sm:p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/calculator")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <CalculatorIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold">{calculator.name || "Nieuwe berekening"}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Opslaan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="name">Naam</Label>
                  <Input
                    id="name"
                    value={calculator.name}
                    onChange={handleNameChange}
                    placeholder="Naam van de berekening"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Beschrijving</Label>
                  <Input
                    id="description"
                    value={calculator.description}
                    onChange={handleDescriptionChange}
                    placeholder="Korte beschrijving"
                  />
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="details" className="flex-1">Dak details</TabsTrigger>
                <TabsTrigger value="materials" className="flex-1">Materialen</TabsTrigger>
                <TabsTrigger value="labor" className="flex-1">Arbeid</TabsTrigger>
                <TabsTrigger value="equipment" className="flex-1">Materieel</TabsTrigger>
                <TabsTrigger value="misc" className="flex-1">Overig</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-0">
                <CalculatorDetails 
                  roofParams={calculator.roofParams}
                  onRoofParamsChange={handleRoofParamsChange}
                  marginPercentage={calculator.marginPercentage}
                  onMarginChange={handleMarginChange}
                  taxRate={calculator.taxRate}
                  onTaxRateChange={handleTaxRateChange}
                />
              </TabsContent>
              
              <TabsContent value="materials" className="mt-0">
                <CalculatorMaterials
                  materials={calculator.materials}
                  onAddMaterial={handleAddMaterial}
                  onUpdateMaterial={handleUpdateMaterial}
                  onDeleteMaterial={handleDeleteMaterial}
                  onEstimateMaterials={handleEstimateMaterials}
                />
              </TabsContent>
              
              <TabsContent value="labor" className="mt-0">
                <CalculatorLabor
                  labor={calculator.labor}
                  onAddLabor={handleAddLabor}
                  onUpdateLabor={handleUpdateLabor}
                  onDeleteLabor={handleDeleteLabor}
                  onEstimateLabor={handleEstimateLabor}
                />
              </TabsContent>
              
              <TabsContent value="equipment" className="mt-0">
                <CalculatorEquipment
                  equipment={calculator.equipment}
                  onAddEquipment={handleAddEquipment}
                  onUpdateEquipment={handleUpdateEquipment}
                  onDeleteEquipment={handleDeleteEquipment}
                />
              </TabsContent>
              
              <TabsContent value="misc" className="mt-0">
                <CalculatorMiscellaneous
                  miscellaneous={calculator.miscellaneous}
                  onAddMisc={handleAddMisc}
                  onUpdateMisc={handleUpdateMisc}
                  onDeleteMisc={handleDeleteMisc}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <CalculatorSummary summary={summary} roofArea={calculator.roofParams.roofArea} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalculatorDetail;
