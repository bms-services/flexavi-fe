import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Signature from "@/components/customer/Signature";
import { useToast } from "@/hooks/use-toast";
import { Upload, Mail } from "lucide-react";

export const SignatureSettings = () => {
  const { toast } = useToast();
  const [documentSignature, setDocumentSignature] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  const defaultEmailSignature = `
    <table style="font-family: Arial, sans-serif; color: #333333; font-size: 14px; line-height: 1.6; width: 100%; max-width: 600px; margin: 0; padding: 0; border-collapse: collapse;">
      <tr>
        <td style="padding: 20px 0;">
          ${companyLogo ? `<img src="${companyLogo}" alt="[Bedrijfsnaam]" style="max-width: 200px; height: auto; margin-bottom: 15px;" />` : ''}
          <div style="border-top: 2px solid #2563eb; margin: 15px 0;"></div>
          <p style="margin: 0;">Met vriendelijke groet,</p>
          <p style="margin: 5px 0; font-weight: bold;">[Naam]</p>
          <p style="margin: 0; color: #666;">[Functie]</p>
          <div style="margin: 15px 0;">
            <table style="border-collapse: collapse;">
              <tr>
                <td style="padding: 2px 0;"><strong>[Bedrijfsnaam]</strong></td>
              </tr>
              <tr>
                <td style="padding: 2px 0;"><span style="color: #666;">T:</span> [Telefoonnummer]</td>
              </tr>
              <tr>
                <td style="padding: 2px 0;"><span style="color: #666;">E:</span> [E-mailadres]</td>
              </tr>
              <tr>
                <td style="padding: 2px 0;"><span style="color: #666;">W:</span> <a href="[Website]" style="color: #2563eb; text-decoration: none;">[Website]</a></td>
              </tr>
            </table>
          </div>
          <div style="border-top: 1px solid #e5e7eb; margin: 15px 0; padding-top: 15px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              Dit e-mailbericht is uitsluitend bestemd voor de geadresseerde(n).
            </p>
          </div>
        </td>
      </tr>
    </table>
  `;

  const handleDocumentSignatureChange = (signatureData: string | null) => {
    setDocumentSignature(signatureData);
    if (signatureData) {
      toast({
        title: "Handtekening opgeslagen",
        description: "Je handtekening is succesvol opgeslagen.",
      });
    }
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
                Professionele e-mail handtekening met bedrijfslogo
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-white">
              <div dangerouslySetInnerHTML={{ __html: defaultEmailSignature }} />
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
