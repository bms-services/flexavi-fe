
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerSearch } from "@/components/quotes/CustomerSearch";
import { Lead } from "@/types";

interface CustomerCardProps {
  selectedCustomer: Lead | null;
  onSelectCustomer: (customer: Lead | null) => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  selectedCustomer,
  onSelectCustomer,
}) => {
  return (
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
              onSelectCustomer={onSelectCustomer}
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
  );
};
