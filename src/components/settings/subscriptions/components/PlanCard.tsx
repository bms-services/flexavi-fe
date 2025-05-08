
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEuro } from "@/lib/utils";
import { Package, PackageItem, PackageTypeT } from "@/types/package";
import { ArrowUpCircle } from "lucide-react";

interface PlanCardProps extends PackageItem {
  activePackage?: boolean;
  package_name?: string;
  package_description?: string;
  package_features?: {
    email_templates?: string;
    max_invoices?: string;
    max_leads?: string;
    max_offers?: string;
    price?: string;
    work_contracts?: string;
  };
  stripe_price_id?: string;
  packageType?: PackageTypeT;
  handleUpgrade?: (id: string) => void;
}

export const PlanCard = ({
  id,
  package_name,
  package_description,
  package_features,
  unit_amount,
  activePackage,
  stripe_price_id,
  handleUpgrade,
}: PlanCardProps) => {
  return (
    <Card
      className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg 
      ${activePackage
          ? 'border-primary ring-1 ring-primary/20'
          : 'hover:border-primary/20'
        }`
      }
    >
      {activePackage && (
        <div className="absolute -right-12 top-6 rotate-45 bg-primary text-primary-foreground px-12 py-1 text-sm font-medium">
          Selected
        </div>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>{package_name}</span>
          <Badge variant="outline" className={
            activePackage ? 'bg-primary/10 text-primary border-primary/30' : 'bg-secondary text-secondary-foreground'
          }>
            {formatEuro(unit_amount)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 min-h-[280px]">
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">✓</span>
            <span>{package_features.email_templates}</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">✓</span>
            <span>{package_features.max_invoices}</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">✓</span>
            <span>{package_features.max_leads}</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">✓</span>
            <span>{package_features.max_offers}</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">✓</span>
            <span>{package_features.work_contracts}</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">✓</span>
            <span>{package_features.price}</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="pt-4 border-t bg-muted/50">
        <Button
          className={`w-full ${activePackage
            ? 'bg-muted text-muted-foreground hover:bg-muted/80 cursor-default'
            : ''
            }`}
          onClick={() => handleUpgrade(id)}
          disabled={activePackage}
          variant={activePackage ? "outline" : "default"}
        >
          <ArrowUpCircle className="mr-2 h-4 w-4" />
          {activePackage ? 'Huidig plan' : 'Upgrade'}
        </Button>
      </CardFooter>
    </Card>
  );
};
