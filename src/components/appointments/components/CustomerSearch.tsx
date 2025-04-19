
import React from "react";
import { Check, PlusCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { mockLeads } from "@/data/mockLeads";
import { cn } from "@/lib/utils";
import { Lead } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateCustomerForm } from "./CreateCustomerForm";

interface CustomerSearchProps {
  selectedCustomer: Lead | null;
  onSelectCustomer: (customer: Lead | null) => void;
}

export const CustomerSearch: React.FC<CustomerSearchProps> = ({
  selectedCustomer,
  onSelectCustomer,
}) => {
  const [open, setOpen] = React.useState(false);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = React.useState(false);

  const handleCreateNewCustomer = (customerData: Partial<Lead>) => {
    // In a real app, this would make an API call
    console.log("Creating new customer:", customerData);
    setShowNewCustomerDialog(false);
    // For now, we'll just close the dialog
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedCustomer ? selectedCustomer.name : "Selecteer een klant"}
            <User className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Zoek een klant..." />
            <CommandList>
              <CommandEmpty>
                <div className="flex flex-col items-center justify-center p-4 gap-2">
                  <p>Geen klanten gevonden.</p>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewCustomerDialog(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nieuwe klant toevoegen
                  </Button>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {mockLeads.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.name}
                    onSelect={() => {
                      onSelectCustomer(customer);
                      setOpen(false);
                    }}
                  >
                    {customer.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedCustomer?.id === customer.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe Klant Toevoegen</DialogTitle>
          </DialogHeader>
          <CreateCustomerForm onSubmit={handleCreateNewCustomer} />
        </DialogContent>
      </Dialog>
    </>
  );
};
