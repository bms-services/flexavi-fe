
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { InvoiceRes, InvoiceSendReq } from "@/zustand/types/invoiceT";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SendInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: InvoiceRes;
}

export const SendInvoiceDialog: React.FC<SendInvoiceDialogProps> = ({
  open,
  onOpenChange,
  invoice,
}) => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useFormContext<InvoiceSendReq>();

  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Factuur verzenden</DialogTitle>
          <DialogDescription>
            Vul de e-mailgegevens in om de factuur te verzenden
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            id="to"
            name="to"
            label="E-mailadres"
            placeholder="email@voorbeeld.nl"
            rules={{
              register,
              name: "email",
              options: {
                required: t('invoice.error.required.email'),
              },
              errors,
            }}
          />
          <Input
            id="cc"
            name="cc"
            label="CC E-mailadres (optioneel)"
            placeholder="email@voorbeeld.nl"
            rules={{
              register,
              name: "cc",
              options: {
                required: t('invoice.error.required.cc'),
              },
              errors,
            }}
          />
          <Input
            id="subject"
            name="subject"
            label="Onderwerp"
            placeholder={`Factuur ${invoice.invoice_number} verzenden`}
            rules={{
              register,
              name: "subject",
              options: {
                required: t('invoice.error.required.subject'),
              },
              errors,
            }}
          />
          <Textarea
            id="message"
            name="message"
            label="Bericht"
            placeholder="Geachte heer/mevrouw, Hierbij sturen wij u de factuur..."
            rows={5}
            rules={{
              register,
              name: "message",
              options: {
                required: t('invoice.error.required.message'),
              },
              errors,
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button type="submit">
            Verzenden</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
