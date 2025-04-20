
import React from 'react';
import { Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from "@/components/ui/sonner";
import { ReceiptData } from './types/quickActions';

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bon uploaden</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {!uploadedImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
              <Receipt className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-center text-muted-foreground mb-4">
                Upload een foto of scan van je bon om automatisch de gegevens te laten herkennen
              </p>
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
                <Button variant="outline" type="button">
                  Kies bestand
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative border rounded-md p-2 max-h-[200px] overflow-hidden">
                <img src={uploadedImage} alt="Uploaded receipt" className="w-full object-contain max-h-[180px]" />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0" 
                  onClick={() => {
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
                  }}
                >
                  X
                </Button>
              </div>
              
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-sm text-center text-muted-foreground">
                    Bon wordt geanalyseerd...
                  </p>
                </div>
              ) : (
                <form className="space-y-3">
                  <div>
                    <label htmlFor="company" className="text-sm font-medium">Bedrijf</label>
                    <input 
                      id="company"
                      name="company"
                      value={receiptData.company}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="text-sm font-medium">Omschrijving</label>
                    <input 
                      id="description"
                      name="description"
                      value={receiptData.description}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="subtotal" className="text-sm font-medium">Subtotaal</label>
                      <input 
                        id="subtotal"
                        name="subtotal"
                        value={receiptData.subtotal}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="vat" className="text-sm font-medium">BTW %</label>
                      <input 
                        id="vat"
                        name="vat"
                        value={receiptData.vat}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="vatPaid" className="text-sm font-medium">BTW betaald</label>
                      <input 
                        id="vatPaid"
                        name="vatPaid"
                        value={receiptData.vatPaid}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="total" className="text-sm font-medium">Totaal bedrag</label>
                      <input 
                        id="total"
                        name="total"
                        value={receiptData.total}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="project" className="text-sm font-medium">Project (optioneel)</label>
                    <select 
                      id="project"
                      name="project"
                      value={receiptData.project}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1"
                    >
                      <option value="">Selecteer een project</option>
                      <option value="project1">Renovatie Amsterdam</option>
                      <option value="project2">Nieuwbouw Utrecht</option>
                      <option value="project3">Verbouwing Rotterdam</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                      Annuleren
                    </Button>
                    <Button onClick={handleSave}>
                      Opslaan
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
