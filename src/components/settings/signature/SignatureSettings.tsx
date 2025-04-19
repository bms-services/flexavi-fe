
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Signature from "@/components/customer/Signature";
import { useToast } from "@/hooks/use-toast";
import { Upload, Mail } from "lucide-react";

export const SignatureSettings = () => {
  const { toast } = useToast();
  const [documentSignature, setDocumentSignature] = useState<string | null>(null);
  const [emailSignature, setEmailSignature] = useState(`
Met vriendelijke groet,

[Naam]
[Functie]

[Bedrijfsnaam]
[Telefoonnummer]
[E-mailadres]
[Website]`);

  const handleDocumentSignatureChange = (signatureData: string | null) => {
    setDocumentSignature(signatureData);
    if (signatureData) {
      toast({
        title: "Handtekening opgeslagen",
        description: "Je handtekening is succesvol opgeslagen.",
      });
    }
  };

  const handleEmailSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailSignature(e.target.value);
  };

  const saveEmailSignature = () => {
    toast({
      title: "E-mail handtekening opgeslagen",
      description: "Je e-mail handtekening is succesvol opgeslagen.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Document Handtekening</CardTitle>
              <CardDescription>
                Upload je handtekening voor gebruik op offertes, facturen en werkovereenkomsten
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Signature onSignatureChange={handleDocumentSignatureChange} />
            {documentSignature && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Voorbeeld van je handtekening:</p>
                <img 
                  src={documentSignature} 
                  alt="Handtekening voorbeeld" 
                  className="border rounded-md p-2 max-w-[200px]"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>E-mail Handtekening</CardTitle>
              <CardDescription>
                Maak je standaard e-mail handtekening voor alle uitgaande e-mails
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-signature">E-mail handtekening</Label>
              <Textarea
                id="email-signature"
                value={emailSignature}
                onChange={handleEmailSignatureChange}
                className="min-h-[200px] font-mono"
                placeholder="Voer je e-mail handtekening in..."
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Beschikbare variabelen:</p>
              <ul className="list-disc list-inside">
                <li>[Naam] - Je volledige naam</li>
                <li>[Functie] - Je functietitel</li>
                <li>[Bedrijfsnaam] - Naam van je bedrijf</li>
                <li>[Telefoonnummer] - Je telefoonnummer</li>
                <li>[E-mailadres] - Je e-mailadres</li>
                <li>[Website] - Je website URL</li>
              </ul>
            </div>
            <Button onClick={saveEmailSignature}>Handtekening opslaan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
