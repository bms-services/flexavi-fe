import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { RoofMeasurement, RoofMaterialType, RoofCondition, RoofPhotoAnalysis } from "@/types/roof-measurement";
import { RoofPhotoUpload } from "./RoofPhotoUpload";

const formSchema = z.object({
  address: z.string().min(5, {
    message: "Adres moet minimaal 5 tekens bevatten.",
  }),
  area: z.coerce.number().min(1, {
    message: "Oppervlakte moet groter zijn dan 0 m².",
  }),
  pitch: z.coerce.number().min(0).max(90, {
    message: "Hellingshoek moet tussen 0 en 90 graden zijn.",
  }),
  materialType: z.enum(["tiles", "slate", "metal", "flat", "shingles", "unknown"] as const),
  condition: z.enum(["excellent", "good", "fair", "poor", "critical"] as const),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RoofMeasurementFormProps {
  onSubmit: (data: RoofMeasurement) => void;
  initialData?: Partial<RoofMeasurement>;
  isLoading?: boolean;
}

export function RoofMeasurementForm({
  onSubmit,
  initialData,
  isLoading = false,
}: RoofMeasurementFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: initialData?.address || "",
      area: initialData?.area || 0,
      pitch: initialData?.pitch || 0,
      materialType: initialData?.materialType || "unknown",
      condition: initialData?.condition || "good",
      notes: initialData?.notes || "",
    },
  });

  const handlePhotoAnalysis = (analysis: RoofPhotoAnalysis) => {
    form.setValue("area", analysis.estimatedArea);
    form.setValue("materialType", analysis.estimatedMaterial);
    form.setValue("condition", analysis.estimatedCondition);
    form.setValue("notes", (form.getValues("notes") || "") + "\nAI Analyse: " + analysis.notes);
  };

  const handleSubmit = (values: FormValues) => {
    const measurementData: RoofMeasurement = {
      id: initialData?.id || uuidv4(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      address: values.address,
      area: values.area,
      pitch: values.pitch,
      materialType: values.materialType,
      condition: values.condition,
      notes: values.notes,
      imageUrl: initialData?.imageUrl,
      leadId: initialData?.leadId,
      latitude: initialData?.latitude,
      longitude: initialData?.longitude,
    };

    onSubmit(measurementData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <RoofPhotoUpload onAnalysisComplete={handlePhotoAnalysis} />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input placeholder="Voer het adres in" {...field} />
              </FormControl>
              <FormDescription>
                Voer het volledige adres in voor de dakmeting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dakoppervlak (m²)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pitch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hellingshoek (graden)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="materialType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dakbedekking</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer type dakbedekking" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tiles">Dakpannen</SelectItem>
                    <SelectItem value="slate">Leisteen</SelectItem>
                    <SelectItem value="metal">Metaal</SelectItem>
                    <SelectItem value="flat">Plat dak</SelectItem>
                    <SelectItem value="shingles">Shingles</SelectItem>
                    <SelectItem value="unknown">Onbekend</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staat</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer staat van het dak" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="excellent">Uitstekend</SelectItem>
                    <SelectItem value="good">Goed</SelectItem>
                    <SelectItem value="fair">Redelijk</SelectItem>
                    <SelectItem value="poor">Matig</SelectItem>
                    <SelectItem value="critical">Kritiek</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notities</FormLabel>
              <FormControl>
                <Textarea placeholder="Optionele notities over het dak" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Bezig met verwerken..." : initialData?.id ? "Bijwerken" : "Toevoegen"}
        </Button>
      </form>
    </Form>
  );
}
