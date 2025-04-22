
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  subscription?: any;
}

export function SubscriptionDialog({ open, onOpenChange, onSave, subscription }: SubscriptionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {subscription ? 'Abonnement Bewerken' : 'Nieuw Abonnement'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="customerName">Klantnaam</Label>
            <Input id="customerName" defaultValue={subscription?.customerName} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={subscription?.email} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plan">Plan</Label>
            <Select defaultValue={subscription?.plan}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Bedrag</Label>
            <Input 
              id="amount" 
              type="number" 
              defaultValue={subscription?.amount}
              step="0.01"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={() => onSave({})}>Opslaan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
