
import React from "react";
import { Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReceiptUploadAreaProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ReceiptUploadArea: React.FC<ReceiptUploadAreaProps> = ({ onFileUpload }) => (
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
        onChange={onFileUpload}
      />
      <Button variant="outline" type="button">
        Kies bestand
      </Button>
    </label>
  </div>
);
