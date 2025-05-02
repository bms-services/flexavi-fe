import { fullpageApi } from "@fullpage/react-fullpage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building2, Upload } from "lucide-react";
import Dropzone from "@/components/ui/drop-zone";
import DropZone from "@/components/ui/drop-zone";

export default function CompanyInformation({
    state, fullpageApi
}: {
    state: unknown;
    fullpageApi: fullpageApi;
}) {
    return (
        <div className="section">
            <div className="sm:h-screen w-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
                <div className="w-full max-w-4xl">
                    <Card className="rounded-2xl shadow-xl overflow-hidden">
                        <CardHeader className="bg-blue-700 text-white px-6 py-5">
                            <div className="flex items-center gap-3">
                                <Building2 className="h-6 w-6" />
                                <div>
                                    <CardTitle className="text-xl">Bedrijfsgegevens</CardTitle>
                                    <CardDescription className="text-white/80">
                                        Beheer je bedrijfsinformatie die wordt weergegeven op offertes en facturen
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="bg-white p-6 space-y-8">
                            {/* Logo Upload */}
                            <div className="space-y-3">
                                <Label htmlFor="company-logo">Bedrijfslogo</Label>
                                <div className="flex items-start gap-4">
                                    {/* Future: Preview logo here if needed */}
                                    {/* <div className="space-y-2">
                                        <Label
                                            htmlFor="logo-upload"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md cursor-pointer hover:bg-blue-800 transition"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Logo uploaden
                                        </Label>
                                        <Input
                                            id="logo-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            PNG of JPG bestand (max 2MB)
                                        </p>
                                    </div> */}

                                    <DropZone className="" />
                                </div>
                            </div>

                            <Separator />

                            {/* Company Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Bedrijfsnaam</Label>
                                    <Input id="company-name" placeholder="Bijv. Mijn Dakbedrijf B.V." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tax-id">BTW Nummer</Label>
                                    <Input id="tax-id" placeholder="NL123456789B01" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="kvk">KvK Nummer</Label>
                                    <Input id="kvk" placeholder="12345678" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" type="url" placeholder="https://jouwbedrijf.nl" />
                                </div>
                            </div>

                            <Separator />

                            {/* About */}
                            <div className="space-y-2">
                                <Label htmlFor="about">Over ons</Label>
                                <Textarea
                                    id="about"
                                    placeholder="Schrijf een korte beschrijving over je bedrijf..."
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => fullpageApi.moveSectionDown()}
                                    className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
                                >
                                    Volgende stap
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    );
}
