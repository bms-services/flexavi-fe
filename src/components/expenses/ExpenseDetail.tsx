
import React, { useState } from "react";
import { Expense } from "@/types/expenses";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTypeIcon, getTypeLabel } from "./ExpenseTypeIcon";
import { ExpenseStatusBadge } from "./ExpenseStatusBadge";
import { Button } from "@/components/ui/button";
import { Edit, Link, Receipt, Download, FileText, ArrowLeft, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockProjects } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { ExpenseForm } from "./ExpenseForm";

import { Badge } from "@/components/ui/badge";

interface ExpenseDetailProps {
  expense: Expense;
  onEdit?: boolean;
}

export const ExpenseDetail: React.FC<ExpenseDetailProps> = ({ expense, onEdit = false }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(onEdit);
  const [currentExpense, setCurrentExpense] = useState(expense);

  // Find linked project if any
  const linkedProject = currentExpense.projectId 
    ? mockProjects.find(p => p.id === currentExpense.projectId) 
    : undefined;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleSave = (updatedExpense: Partial<Expense>) => {
    // In a real app, we would make an API call to update the expense
    const updated = { ...currentExpense, ...updatedExpense };
    setCurrentExpense(updated);
    setIsEditing(false);
   
  };

  const handleStatus = (newStatus: Expense["status"]) => {
    const updated = { ...currentExpense, status: newStatus };
    setCurrentExpense(updated);
    
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(false)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar details
          </Button>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Uitgave bewerken</h2>
        <ExpenseForm 
          expense={currentExpense} 
          onSave={handleSave} 
          onCancel={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">{currentExpense.description}</h2>
          <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <span>{currentExpense.company}</span>
            <span>•</span>
            <span>{format(new Date(currentExpense.date), 'dd MMMM yyyy', { locale: nl })}</span>
            <ExpenseStatusBadge status={currentExpense.status} />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/expenses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar overzicht
          </Button>
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Bewerken
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="receipt">Bon</TabsTrigger>
          {currentExpense.projectId && (
            <TabsTrigger value="project">Project</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="details" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Algemene informatie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrijf</p>
                    <p className="font-medium">{currentExpense.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Datum</p>
                    <p className="font-medium">
                      {format(new Date(currentExpense.date), 'dd MMMM yyyy', { locale: nl })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <div className="flex items-center">
                      <ExpenseTypeIcon type={currentExpense.type} className="mr-2" />
                      <span className="font-medium">{getTypeLabel(currentExpense.type)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <ExpenseStatusBadge status={currentExpense.status} />
                  </div>
                </div>
                
                {currentExpense.tags && currentExpense.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {currentExpense.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentExpense.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notities</p>
                    <p>{currentExpense.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financiële details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrag (excl. BTW)</p>
                      <p className="font-medium">{formatCurrency(currentExpense.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">BTW tarief</p>
                      <p className="font-medium">{currentExpense.vatRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">BTW bedrag</p>
                      <p className="font-medium">{formatCurrency(currentExpense.vatAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Totaalbedrag (incl. BTW)</p>
                      <p className="font-medium text-lg">{formatCurrency(currentExpense.totalAmount)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Status change actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentExpense.status === "draft" && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => handleStatus("pending")}
                    >
                      Ter goedkeuring indienen
                    </Button>
                  </>
                )}
                
                {currentExpense.status === "pending" && (
                  <>
                    <Button 
                      variant="default"
                      className="bg-green-600 hover:bg-green-700" 
                      onClick={() => handleStatus("approved")}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Goedkeuren
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleStatus("rejected")}
                    >
                      Afkeuren
                    </Button>
                  </>
                )}
                
                {currentExpense.status === "approved" && (
                  <Button
                    variant="outline"
                    onClick={() => handleStatus("processed")}
                  >
                    Markeren als verwerkt
                  </Button>
                )}
                
                {currentExpense.status === "rejected" && (
                  <Button
                    variant="outline"
                    onClick={() => handleStatus("draft")}
                  >
                    Opnieuw bewerken
                  </Button>
                )}
                
                <Button
                  variant="outline"
               
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Exporteren als PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receipt" className="space-y-6 pt-4">
          {currentExpense.receiptUrl ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bon details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 flex flex-col items-center">
                  <img 
                    src={currentExpense.receiptUrl} 
                    alt="Receipt" 
                    className="max-w-full max-h-96 object-contain mb-4"
                  />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-center text-muted-foreground">
                  Ontvangstbewijs geüpload op {format(new Date(currentExpense.createdAt), 'dd MMMM yyyy', { locale: nl })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bon toevoegen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <Receipt className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    Er is nog geen bon gekoppeld aan deze uitgave. Upload een foto of scan van je bon.
                  </p>
                  <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    Bon uploaden
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {currentExpense.projectId && (
          <TabsContent value="project" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {linkedProject ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">{linkedProject.name}</h3>
                        <p className="text-muted-foreground">{linkedProject.description}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/projects/${linkedProject.id}`)}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Project openen
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Startdatum</p>
                        <p className="font-medium">
                          {format(new Date(linkedProject.startDate), 'dd MMM yyyy', { locale: nl })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">{linkedProject.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">{formatCurrency(linkedProject.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Locatie</p>
                        <p className="font-medium">{linkedProject.location}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Project niet gevonden of is verwijderd.</p>
                    <Button 
                      variant="link" 
                      className="mt-2"
                      onClick={() => setCurrentExpense({...currentExpense, projectId: undefined})}
                    >
                      Koppeling verwijderen
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
