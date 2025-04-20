
import React from "react";
import Signature from "@/components/customer/Signature";

interface QuoteSignatureSectionProps {
  onSignatureChange: (signature: string | null) => void;
}

export const QuoteSignatureSection: React.FC<QuoteSignatureSectionProps> = ({
  onSignatureChange,
}) => {
  return (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-lg font-medium mb-4">Handtekening</h3>
      <p className="text-sm text-gray-500 mb-4">
        Om deze offerte te accepteren, plaats uw handtekening hieronder en klik op 'Accepteren'.
      </p>
      <div className="bg-white border rounded-md p-4 shadow-sm">
        <Signature onSignatureChange={onSignatureChange} />
      </div>
    </div>
  );
};
