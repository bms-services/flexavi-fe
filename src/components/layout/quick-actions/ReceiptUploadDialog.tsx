
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from "@/components/ui/sonner";
import { ReceiptData } from './types/quickActions';
import { ReceiptUploadArea } from './receipt-upload/ReceiptUploadArea';
import { ReceiptFilePreview } from './receipt-upload/ReceiptFilePreview';
import { ReceiptFormFields } from './receipt-upload/ReceiptFormFields';
import { ReceiptFormActions } from './receipt-upload/ReceiptFormActions';

interface ReceiptUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResult?: (data: ReceiptData) => void;
}

export const ReceiptUploadDialog: React.FC<ReceiptUploadDialogProps> = ({
  open,
  onOpenChange,
  onResult,
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [receiptData, setReceiptData] = React.useState<ReceiptData>({
    company: '',
    description: '',
    subtotal: '',
    vat: '',
    vatPaid: '',
    total: '',
    project: '',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsProcessing(true);
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);

          // Simulate AI processing
          setTimeout(() => {
            setReceiptData({
              company: 'Bouwmarkt Nederland',
              description: 'Aanschaf bouwmaterialen',
              subtotal: '245.50',
              vat: '21',
              vatPaid: '51.56',
              total: '297.06',
              project: '',
            });
            setIsProcessing(false);
          }, 2000);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReceiptData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Call onResult callback if provided
    if (onResult) {
      onResult(receiptData);
    }

    onOpenChange(false);
    setReceiptData({
      company: '',
      description: '',
      subtotal: '',
      vat: '',
      vatPaid: '',
      total: '',
      project: '',
    });
    setUploadedImage(null);

    toast("Bon verwerkt", {
      description: "De bon is succesvol verwerkt en opgeslagen",
    });
  };

  const handleClearFile = () => {
    setUploadedImage(null);
    setIsProcessing(false);
    setReceiptData({
      company: '',
      description: '',
      subtotal: '',
      vat: '',
      vatPaid: '',
      total: '',
      project: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bon uploaden</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {!uploadedImage ? (
            <ReceiptUploadArea onFileUpload={handleFileUpload} />
          ) : (
            <div className="space-y-4">
              <ReceiptFilePreview imageSrc={uploadedImage} onClear={handleClearFile} />
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-sm text-center text-muted-foreground">
                    Bon wordt geanalyseerd...
                  </p>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                  <ReceiptFormFields
                    receiptData={receiptData}
                    onInputChange={handleInputChange}
                  />
                  <ReceiptFormActions
                    onCancel={() => onOpenChange(false)}
                    onSave={handleSave}
                  />
                </form>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
