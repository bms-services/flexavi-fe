
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText as FileTextIcon, Edit, Pen } from "lucide-react";
import Signature from "@/components/customer/Signature";


interface SignatureSectionProps {
  customerSignature?: string;
  onSignatureChange: (signatureData: string | null) => void;
  onSign: () => void;
  onRevisionRequest: () => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  customerSignature,
  onSignatureChange,
  onSign,
  onRevisionRequest,
}) => {
  if (customerSignature) {
    return (
      <Card className="p-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <FileTextIcon className="h-4 w-4 text-primary" />
          Handtekening
        </h3>
        <div className="bg-muted rounded-lg p-4">
          <img 
            src={customerSignature} 
            alt="Handtekening" 
            className="max-h-40 mx-auto"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="font-medium flex items-center gap-2">
        <FileTextIcon className="h-4 w-4 text-primary" />
        Handtekening
      </h3>
      <Signature onSignatureChange={onSignatureChange} />
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={onRevisionRequest}
          className="gap-2"
        >
          <Edit className="h-4 w-4" />
          Revisie Verzoeken
        </Button>
        <Button
          onClick={onSign}
          className="gap-2"
        >
          <Pen className="h-4 w-4" />
          Ondertekenen
        </Button>
      </div>
    </Card>
  );
};
