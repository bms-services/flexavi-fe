
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { mockLeads } from "@/data/mockLeads";
import { cn } from "@/utils/format";
import { Lead } from "@/types";
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
    const newCustomer: Lead = {
      id: `temp-${Date.now()}`, // In a real app, this would come from the backend
      name: customerData.name || "",
      email: customerData.email || "",
      phone: customerData.phone || "",
      address: customerData.address || "",
      status: "new_lead",
      source: "Manual Entry",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Here we would normally make an API call to create the customer
    // For now, we'll just simulate success
    onSelectCustomer(newCustomer);
    setShowNewCustomerDialog(false);
    setOpen(false);


  };

  const handleOpenNewCustomerDialog = () => {
    setShowNewCustomerDialog(true);
    setOpen(false);
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
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Zoek een klant..." />
            <CommandList>
              <CommandEmpty>
                <div className="flex flex-col items-center justify-center p-4 gap-2">
                  <p>Geen klanten gevonden.</p>
                  <Button
                    variant="outline"
                    onClick={handleOpenNewCustomerDialog}
                    type="button"
                    className="mt-2"
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
                    className="cursor-pointer"
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
              <div className="p-2 border-t">
                <Button
                  variant="outline"
                  onClick={handleOpenNewCustomerDialog}
                  type="button"
                  className="w-full cursor-pointer"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nieuwe klant toevoegen
                </Button>
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nieuwe Klant Toevoegen</DialogTitle>
            <DialogDescription>
              Vul de gegevens in om een nieuwe klant toe te voegen.
            </DialogDescription>
          </DialogHeader>
          <CreateCustomerForm onSubmit={handleCreateNewCustomer} />
        </DialogContent>
      </Dialog>
    </>
  );
};
