
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Upload } from "lucide-react";
import { RoofMaterialType, RoofCondition, RoofPhotoAnalysis } from "@/types/roof-measurement";

interface RoofPhotoUploadProps {
  onAnalysisComplete: (analysis: RoofPhotoAnalysis) => void;
}

export function RoofPhotoUpload({ onAnalysisComplete }: RoofPhotoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const analyzePhoto = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with mock data
    // In a real implementation, this would make an API call to an AI service
    setTimeout(() => {
      const mockAnalysis: RoofPhotoAnalysis = {
        estimatedArea: 80,
        estimatedMaterial: "tiles",
        estimatedCondition: "good",
        confidence: 0.85,
        notes: "Standaard hellend dak met keramische dakpannen, één verdieping"
      };
      
      onAnalysisComplete(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Camera className="mr-2 h-5 w-5" />
          Foto analyse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {previewUrl ? (
          <div className="relative border rounded-md overflow-hidden">
            <img 
              src={previewUrl} 
              alt="Geüpload dak" 
              className="w-full h-[200px] object-cover"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
            >
              Verwijderen
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-center text-muted-foreground mb-4">
                Upload een foto van het dak voor AI-analyse
              </p>
              <label>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button variant="outline" type="button">
                  Kies bestand
                </Button>
              </label>
            </div>
          </div>
        )}

        {selectedFile && (
          <Button 
            className="w-full" 
            onClick={analyzePhoto}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Bezig met analyseren..." : "Foto analyseren"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
