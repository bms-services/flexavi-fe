
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerSearch } from "@/components/quotes/CustomerSearch";
import { QuoteDetailsForm } from "@/components/quotes/forms/QuoteDetailsForm";
import { LineItemsList } from "@/components/quotes/LineItemsList";
import { QuoteSummary } from "@/components/quotes/QuoteSummary";
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
  vatRate: 21,
});

const QuoteEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [quote, setQuote] = useState<Omit<Quote, "id" | "createdAt" | "updatedAt">>(emptyQuote);
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([createEmptyLineItem()]);
  const [selectedCustomer, setSelectedCustomer] = useState<Lead | null>(null);
  const [productSuggestions, setProductSuggestions] = useState<Record<string, any[]>>({});
  
  // Calculate total amount
  const totalAmount = lineItems.reduce((sum, item) => sum + item.total, 0);

  // Load quote data when editing
  useEffect(() => {
    if (isEditing && id) {
      const quotes = Array.isArray(mockQuotes) ? mockQuotes : [];
      const foundQuote = quotes.find(q => q.id === id);
      
      if (foundQuote) {
        setQuote({
          leadId: foundQuote.leadId,
          amount: foundQuote.amount,
          description: foundQuote.description,
          status: foundQuote.status,
          location: foundQuote.location || "",
          plannedStartDate: foundQuote.plannedStartDate || new Date().toISOString(),
          notes: foundQuote.notes || "",
          lineItems: Array.isArray(foundQuote.lineItems) ? foundQuote.lineItems : [],
        });
        
        setLineItems(Array.isArray(foundQuote.lineItems) ? foundQuote.lineItems : [createEmptyLineItem()]);
        
        const leads = Array.isArray(mockLeads) ? mockLeads : [];
        const customer = leads.find(l => l.id === foundQuote.leadId);
        if (customer) {
          setSelectedCustomer(customer);
        }
      } else {
        toast.error("Offerte niet gevonden");
        navigate("/quotes");
      }
    }
  }, [id, isEditing, navigate]);

  const handleLineItemChange = (index: number, updatedItem: QuoteLineItem) => {
    const newLineItems = [...lineItems];
    newLineItems[index] = updatedItem;
    setLineItems(newLineItems);
  };

  const handleAddLineItem = () => {
    setLineItems([...lineItems, createEmptyLineItem()]);
  };

  const handleRemoveLineItem = (index: number) => {
    if (lineItems.length > 1) {
      const newLineItems = [...lineItems];
      newLineItems.splice(index, 1);
      setLineItems(newLineItems);
    }
  };

  const handleCustomerSelect = (customer: Lead | null) => {
    setSelectedCustomer(customer);
    if (customer) {
      setQuote(prev => ({ ...prev, leadId: customer.id }));
    } else {
      setQuote(prev => ({ ...prev, leadId: "" }));
    }
  };

  const handleQuoteFieldChange = (field: string, value: string) => {
    setQuote(prev => ({ ...prev, [field]: value }));
  };

  const getProductSuggestions = (title: string, index: string) => {
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

  const handleSaveQuote = () => {
    if (!selectedCustomer) {
      toast.error("Selecteer een klant");
      return;
    }

    if (lineItems.some(item => !item.description || item.quantity <= 0)) {
      toast.error("Vul alle velden van de offerteregels in");
      return;
    }

    const finalQuote = {
      ...quote,
      leadId: selectedCustomer.id,
      amount: totalAmount,
      lineItems: lineItems,
    };

    if (isEditing) {
      toast.success("Offerte bijgewerkt");
    } else {
      toast.success("Nieuwe offerte aangemaakt");
    }
    
    console.log("Saving quote:", finalQuote);
    navigate("/quotes");
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
              <QuoteDetailsForm 
                description={quote.description}
                location={quote.location}
                plannedStartDate={quote.plannedStartDate}
                status={quote.status}
                notes={quote.notes || ""}
                onFieldChange={handleQuoteFieldChange}
              />
            </CardContent>
          </Card>

          {/* Offerte regels */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Offerteregels</CardTitle>
              <CardDescription>Voeg producten en diensten toe aan de offerte</CardDescription>
            </CardHeader>
            <CardContent>
              <LineItemsList 
                lineItems={lineItems}
                onLineItemChange={handleLineItemChange}
                onAddLineItem={handleAddLineItem}
                onRemoveLineItem={handleRemoveLineItem}
                productSuggestions={productSuggestions}
                onProductSearch={getProductSuggestions}
              />
              <QuoteSummary subtotal={totalAmount} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default QuoteEdit;
