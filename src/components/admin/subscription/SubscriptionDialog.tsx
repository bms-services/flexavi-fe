
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
import { Subscription } from '@/types/subscription';

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Subscription) => void;
  subscription?: Subscription | null;
}

export function SubscriptionDialog({ open, onOpenChange, onSave, subscription }: SubscriptionDialogProps) {
  const [customerName, setCustomerName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [planValue, setPlanValue] = React.useState('starter');
  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    if (subscription) {
      setCustomerName(subscription.customerName);
      setEmail(subscription.email);
      setPlanValue(subscription.plan);
      setAmount(subscription.amount);
    } else {
      setCustomerName('');
      setEmail('');
      setPlanValue('starter');
      setAmount(0);
    }
  }, [subscription]);

  const handleSave = () => {
    const data: Subscription = {
      id: subscription?.id || Date.now().toString(),
      customerName,
      email,
      plan: planValue,
      status: subscription?.status || 'active',
      startDate: subscription?.startDate || new Date().toISOString(),
      nextBilling: subscription?.nextBilling || new Date().toISOString(),
      amount,
    };
    onSave(data);
  };

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
            <Input id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plan">Plan</Label>
            <Select value={planValue} onValueChange={setPlanValue}>
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
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              step="0.01"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSave}>Opslaan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
