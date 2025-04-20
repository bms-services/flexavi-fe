
import React from "react";
import { Button } from "@/components/ui/button";

interface ReceiptFilePreviewProps {
  imageSrc: string;
  onClear: () => void;
}

export const ReceiptFilePreview: React.FC<ReceiptFilePreviewProps> = ({ imageSrc, onClear }) => (
  <div className="relative border rounded-md p-2 max-h-[200px] overflow-hidden">
    <img src={imageSrc} alt="Uploaded receipt" className="w-full object-contain max-h-[180px]" />
    <Button
      variant="outline"
      size="sm"
      className="absolute top-2 right-2 h-8 w-8 p-0"
      onClick={onClear}
      aria-label="Bestand verwijderen"
    >
      X
    </Button>
  </div>
);
