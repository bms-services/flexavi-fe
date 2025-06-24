
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lead } from "@/types";
import { mockLeads } from "@/data/mockData";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/format";

interface CustomerCardProps {
  selectedCustomer: Lead | null;
  onSelectCustomer: (customer: Lead | null) => void;
  disabled?: boolean;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  selectedCustomer,
  onSelectCustomer,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (customerId: string) => {
    const customer = mockLeads.find(c => c.id === customerId) || null;
    onSelectCustomer(customer);
    setOpen(false);
  };

  const filteredCustomers = mockLeads.filter(
    customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Klant</CardTitle>
        <CardDescription>Selecteer de klant voor deze werkovereenkomst</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customer">Klant selecteren</Label>
          <Popover open={open && !disabled} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                disabled={disabled}
              >
                {selectedCustomer ? selectedCustomer.name : "Selecteer klant..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder="Zoek klant..."
                  onValueChange={setSearchTerm}
                />
                <CommandEmpty>Geen klanten gevonden.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-72">
                    <CommandList>
                      {filteredCustomers.map((customer) => (
                        <CommandItem
                          key={customer.id}
                          value={customer.id}
                          onSelect={() => handleSelect(customer.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCustomer?.id === customer.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{customer.name}</span>
                            <span className="text-xs text-muted-foreground">{customer.email}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandList>
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {selectedCustomer && (
          <div className="space-y-2 border rounded-md p-3">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-sm">
                <span className="font-medium">Naam: </span>
                {selectedCustomer.name}
              </div>
              <div className="text-sm">
                <span className="font-medium">Email: </span>
                {selectedCustomer.email}
              </div>
              <div className="text-sm">
                <span className="font-medium">Telefoon: </span>
                {selectedCustomer.phone}
              </div>
              <div className="text-sm">
                <span className="font-medium">Adres: </span>
                {selectedCustomer.address}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
