
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle } from "lucide-react";

interface Feature {
  name: string;
  starter: boolean;
  professional: boolean;
  enterprise: boolean;
}

interface Category {
  name: string;
  features: Feature[];
}

interface DetailedFeatures {
  categories: Category[];
}

interface FeatureComparisonProps {
  detailedFeatures: DetailedFeatures;
}

export function FeatureComparison({ detailedFeatures }: FeatureComparisonProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Functie</TableHead>
            <TableHead className="text-center">Starter</TableHead>
            <TableHead className="text-center">Professional</TableHead>
            <TableHead className="text-center">Enterprise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {detailedFeatures.categories.map((category) => (
            <React.Fragment key={category.name}>
              <TableRow>
                <TableCell colSpan={4} className="bg-muted/50 font-semibold">
                  {category.name}
                </TableCell>
              </TableRow>
              {category.features.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell>{feature.name}</TableCell>
                  <TableCell className="text-center">
                    {feature.starter ? (
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.professional ? (
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.enterprise ? (
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
