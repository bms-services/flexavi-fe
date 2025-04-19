
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlusCircle, Save, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomerSearch } from "@/components/quotes/CustomerSearch";
import { LineItemRow } from "@/components/quotes/LineItemRow";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockLeads, mockQuotes } from "@/data/mockData";
import { Lead, Quote, QuoteLineItem, QuoteStatus } from "@/types";
import { toast } from "sonner";

// Empty quote template
const emptyQuote: Omit<Quote, "id" | "createdAt" | "updatedAt"> = {
  leadId: "",
  amount: 0,
  description: "",
  status: "draft",
  lineItems: [],
  location: "",
  plannedStartDate: new Date().toISOString(),
  notes: "",
};

// Create empty line item
const createEmptyLineItem = (): QuoteLineItem => ({
  id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  description: "",
  quantity: 1,
  unit: "stuk",
  pricePerUnit: 0,
  total: 0,
});

const QuoteEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // State for form
  const [quote, setQuote] = useState<Omit<Quote, "id" | "createdAt" | "updatedAt">>(emptyQuote);
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([createEmptyLineItem()]);
  const [selectedCustomer, setSelectedCustomer] = useState<Lead | null>(null);
  const [productSuggestions, setProductSuggestions] = useState<Record<string, any[]>>({});
  
  // Calculate total amount
  const totalAmount = lineItems.reduce((sum, item) => sum + item.total, 0);

  // Load quote data when editing
  useEffect(() => {
    if (isEditing && id) {
      const foundQuote = mockQuotes.find(q => q.id === id);
      
      if (foundQuote) {
        setQuote({
          leadId: foundQuote.leadId,
          amount: foundQuote.amount,
          description: foundQuote.description,
          status: foundQuote.status,
          location: foundQuote.location || "",
          plannedStartDate: foundQuote.plannedStartDate || new Date().toISOString(),
          notes: foundQuote.notes || "",
          lineItems: foundQuote.lineItems,
        });
        
        setLineItems(foundQuote.lineItems);
        
        // Find the customer
        const customer = mockLeads.find(l => l.id === foundQuote.leadId);
        if (customer) {
          setSelectedCustomer(customer);
        }
      } else {
        toast.error("Offerte niet gevonden");
        navigate("/quotes");
      }
    }
  }, [id, isEditing, navigate]);

  // Update line item
  const handleLineItemChange = (index: number, updatedItem: QuoteLineItem) => {
    const newLineItems = [...lineItems];
    newLineItems[index] = updatedItem;
    setLineItems(newLineItems);
  };

  // Add new line item
  const handleAddLineItem = () => {
    setLineItems([...lineItems, createEmptyLineItem()]);
  };

  // Remove line item
  const handleRemoveLineItem = (index: number) => {
    if (lineItems.length > 1) {
      const newLineItems = [...lineItems];
      newLineItems.splice(index, 1);
      setLineItems(newLineItems);
    }
  };

  // Handle customer selection
  const handleCustomerSelect = (customer: Lead | null) => {
    setSelectedCustomer(customer);
    if (customer) {
      setQuote(prev => ({ ...prev, leadId: customer.id }));
    } else {
      setQuote(prev => ({ ...prev, leadId: "" }));
    }
  };

  // Save quote
  const handleSaveQuote = () => {
    if (!selectedCustomer) {
      toast.error("Selecteer een klant");
      return;
    }

    if (lineItems.some(item => !item.description || item.quantity <= 0)) {
      toast.error("Vul alle velden van de offerteregels in");
      return;
    }

    // Calculate final amount
    const finalQuote = {
      ...quote,
      leadId: selectedCustomer.id,
      amount: totalAmount,
      lineItems: lineItems,
    };

    // Here we would normally save to backend
    // For now we'll just show a success message
    
    if (isEditing) {
      toast.success("Offerte bijgewerkt");
    } else {
      toast.success("Nieuwe offerte aangemaakt");
    }
    
    console.log("Saving quote:", finalQuote);
    navigate("/quotes");
  };

  // Mock product suggestions functionality
  const getProductSuggestions = (title: string, index: string) => {
    // Simulate API call for product suggestions based on title
    // In a real app, this would query your product database
    if (title.length > 2) {
      const suggestions = [
        {
          title: `${title} Premium`,
          description: `Premium versie van ${title}`,
          unit: "stuk",
          pricePerUnit: 150,
          vat: 21
        },
        {
          title: `${title} Standaard`,
          description: `Standaard versie van ${title}`,
          unit: "m²",
          pricePerUnit: 75,
          vat: 21
        },
        {
          title: `${title} Basis`,
          description: `Basis versie van ${title}`,
          unit: "stuk",
          pricePerUnit: 50,
          vat: 21
        }
      ];
      setProductSuggestions(prev => ({ ...prev, [index]: suggestions }));
    } else {
      setProductSuggestions(prev => ({ ...prev, [index]: [] }));
    }
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate("/quotes")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Terug naar offertes
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditing ? "Offerte bewerken" : "Nieuwe offerte"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing
                ? "Bewerk de gegevens van de offerte"
                : "Voeg een nieuwe offerte toe"}
            </p>
          </div>
          <Button onClick={handleSaveQuote}>
            <Save className="mr-2 h-4 w-4" />
            Offerte opslaan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Klantgegevens */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Klantgegevens</CardTitle>
              <CardDescription>Selecteer een klant voor deze offerte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customer">Klant</Label>
                  <CustomerSearch 
                    selectedCustomer={selectedCustomer}
                    onSelectCustomer={handleCustomerSelect}
                  />
                </div>
                
                {selectedCustomer && (
                  <div className="border rounded-md p-4 space-y-2 bg-muted/30">
                    <div>
                      <span className="text-sm text-muted-foreground">Naam:</span>
                      <p className="font-medium">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <p>{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Telefoon:</span>
                      <p>{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Adres:</span>
                      <p>{selectedCustomer.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Offerte details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Offerte details</CardTitle>
              <CardDescription>Vul de details van de offerte in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Omschrijving</Label>
                  <Input
                    id="description"
                    value={quote.description}
                    onChange={e => setQuote({ ...quote, description: e.target.value })}
                    placeholder="Bijv. Dakrenovatie en isolatie"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Locatie</Label>
                    <Input
                      id="location"
                      value={quote.location}
                      onChange={e => setQuote({ ...quote, location: e.target.value })}
                      placeholder="Bijv. Amsterdam, Prinsengracht 123"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="plannedStartDate">Geplande startdatum</Label>
                    <Input
                      id="plannedStartDate"
                      type="date"
                      value={quote.plannedStartDate ? new Date(quote.plannedStartDate).toISOString().split('T')[0] : ''}
                      onChange={e => setQuote({ ...quote, plannedStartDate: new Date(e.target.value).toISOString() })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={quote.status}
                    onValueChange={(value: QuoteStatus) => setQuote({ ...quote, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Concept</SelectItem>
                      <SelectItem value="sent">Verzonden</SelectItem>
                      <SelectItem value="accepted">Geaccepteerd</SelectItem>
                      <SelectItem value="rejected">Afgewezen</SelectItem>
                      <SelectItem value="revised">Herzien</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notities</Label>
                  <Textarea
                    id="notes"
                    value={quote.notes || ""}
                    onChange={e => setQuote({ ...quote, notes: e.target.value })}
                    placeholder="Interne notities voor deze offerte"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offerte regels */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Offerteregels</CardTitle>
                  <CardDescription>Voeg producten en diensten toe aan de offerte</CardDescription>
                </div>
                <Button onClick={handleAddLineItem}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Regel toevoegen
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 font-medium text-sm border-b pb-2">
                  <div className="col-span-4">Product / Dienst</div>
                  <div className="col-span-1 text-center">Aantal</div>
                  <div className="col-span-2">Eenheid</div>
                  <div className="col-span-1 text-center">BTW</div>
                  <div className="col-span-2">Prijs per eenheid</div>
                  <div className="col-span-1 text-right">Totaal</div>
                  <div className="col-span-1"></div>
                </div>

                {lineItems.map((item, index) => (
                  <LineItemRow
                    key={item.id}
                    lineItem={item}
                    onChange={updatedItem => handleLineItemChange(index, updatedItem)}
                    onRemove={() => handleRemoveLineItem(index)}
                    productSuggestions={productSuggestions[item.id] || []}
                    onProductSearch={(title) => getProductSuggestions(title, item.id)}
                    showRemoveButton={lineItems.length > 1}
                  />
                ))}

                <div className="flex justify-end mt-6 pt-4 border-t">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotaal:</span>
                      <span>€ {totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>BTW (21%):</span>
                      <span>€ {(totalAmount * 0.21).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Totaal:</span>
                      <span>€ {(totalAmount * 1.21).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default QuoteEdit;
