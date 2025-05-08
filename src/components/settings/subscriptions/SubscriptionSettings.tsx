
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockInvoices } from "@/data/mockInvoices";
import { PlanCard } from "./components/PlanCard";
import { InvoiceHistory } from "./components/InvoiceHistory";
import { CurrentPlan } from "./components/CurrentPlan";
import { CancelSubscription } from "./components/CancelSubscription";
import { useAppDispatch } from "@/hooks/use-redux";
import { getPackage } from "@/actions/packageAction";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PaginatedResponse } from "@/lib/redux-thunk";
import { Package, PackageItem, PackageTypeEnum, PackageTypeT } from "@/types/package";
import { updateProfilePackage } from "@/actions/profileAction";
import { User } from "@/types/user";



export const SubscriptionSettings = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  // const [currentPlan, setCurrentPlan] = useState("basic");

  const { loading, response } = useSelector((state: RootState) => state.package.index);
  const { response: responseProfileUpdatePackage } = useSelector((state: RootState) => state.profile.updatePackage);
  const { response: responseProfileShow } = useSelector((state: RootState) => state.profile.show);

  const result = response?.result as PaginatedResponse<Package>;
  const resultProfileShow = responseProfileShow?.result as User;
  const resultProfileUpdate = responseProfileUpdatePackage?.result as User;

  useEffect(() => {
    dispatch(getPackage())
  }, [dispatch]);


  // const plans = [
  //   {
  //     id: "basic",
  //     name: "Basis",
  //     price: "€29,99",
  //     period: "maand",
  //     features: [
  //       "Maximaal 10 leads per maand",
  //       "Maximaal 5 offertes per maand",
  //       "Maximaal 5 facturen per maand",
  //       "Geen werkovereenkomsten",
  //       "Beperkte email templates"
  //     ],
  //     isCurrent: currentPlan === "basic"
  //   },
  //   {
  //     id: "pro",
  //     name: "Pro",
  //     price: "€59,99",
  //     period: "maand",
  //     features: [
  //       "Onbeperkt aantal leads",
  //       "Maximaal 25 offertes per maand",
  //       "Maximaal 25 facturen per maand",
  //       "10 werkovereenkomsten",
  //       "Alle email templates"
  //     ],
  //     isCurrent: currentPlan === "pro"
  //   },
  //   {
  //     id: "enterprise",
  //     name: "Enterprise",
  //     price: "€99,99",
  //     period: "maand",
  //     features: [
  //       "Onbeperkt aantal leads",
  //       "Onbeperkt aantal offertes",
  //       "Onbeperkt aantal facturen",
  //       "Onbeperkt aantal werkovereenkomsten",
  //       "Aangepaste email templates",
  //       "Prioriteit support",
  //       "Aangepaste branding"
  //     ],
  //     isCurrent: currentPlan === "enterprise"
  //   }
  // ];

  // const handleUpgrade = (planId: string) => {
  //   if (planId === currentPlan) {
  //     toast({
  //       title: "Dit is je huidige abonnement",
  //       description: "Je gebruikt dit abonnement al.",
  //     });
  //     return;
  //   }

  //   toast({
  //     title: "Abonnement gewijzigd",
  //     description: `Je abonnement is gewijzigd naar ${plans.find(p => p.id === planId)?.name}.`,
  //   });
  //   setCurrentPlan(planId);
  // };

  // const handleCancelSubscription = () => {
  //   toast({
  //     title: "Abonnement opgezegd",
  //     description: "Je abonnement is opgezegd en loopt af aan het einde van de huidige periode.",
  //     variant: "destructive",
  //   });
  // };

  const [packageType, setPackageType] = useState<PackageTypeT>(PackageTypeEnum.MONTHLY);
  const [activePackage, setActivePackage] = useState<string | null>(null);
  const [packageMonthly, setPackageMonthly] = useState<PackageItem[]>([]);
  const [packageYearly, setPackageYearly] = useState<PackageItem[]>([]);

  const filteredPackages = packageType === PackageTypeEnum.MONTHLY ? packageMonthly : packageYearly;


  useEffect(() => {
    if (response.success && result?.data) {
      const allItems = result.data.flatMap(pkg => pkg.items.map(item => ({
        ...item,
        package_id: pkg.id,
        package_name: pkg.name,
        package_description: pkg.description,
        package_features: JSON.parse(pkg.features || "[]"),
      })));

      setPackageMonthly(allItems.filter(item => item.interval === "month"));
      setPackageYearly(allItems.filter(item => item.interval === "year"));
    }
  }, [response, result?.data]);


  useEffect(() => {
    if (responseProfileShow.success && resultProfileShow?.subscription?.selected_package_item) {
      const selectedPackageItem = resultProfileShow.subscription.selected_package_item;
      setActivePackage(selectedPackageItem.package_item_id);
    }
  }, [responseProfileShow, resultProfileShow?.subscription?.selected_package_item]);

  useEffect(() => {
    if (responseProfileUpdatePackage.success && resultProfileUpdate?.subscription?.selected_package_item) {
      const selectedPackageItem = resultProfileUpdate.subscription.selected_package_item;
      setActivePackage(selectedPackageItem.package_item_id);
    }
  }, [responseProfileUpdatePackage, resultProfileUpdate?.subscription?.selected_package_item]);

  const handleUpgrade = (id: string) => {
    dispatch(updateProfilePackage(id));
  }

  return (
    <div className="space-y-8">
      {/* <CurrentPlan
        name={currentPlanDetails?.name || ""}
        price={currentPlanDetails?.price || ""}
        period={currentPlanDetails?.period || ""}
      /> */}

      <ToggleGroup
        type="single"
        value={packageType}
        onValueChange={(value) => value && setPackageType(value as PackageTypeT)}
        className="mb-4"
      >
        <ToggleGroupItem value={PackageTypeEnum.MONTHLY}>Monthly</ToggleGroupItem>
        <ToggleGroupItem value={PackageTypeEnum.YEARLY}>Yearly</ToggleGroupItem>
      </ToggleGroup>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPackages.map(plan => (
          <PlanCard
            key={plan.id}
            handleUpgrade={handleUpgrade}
            activePackage={activePackage === plan.id}
            packageType={packageType}
            {...plan}
          />
        ))}
      </div>

      {/* <InvoiceHistory
        invoices={mockInvoices.slice(0, 5)}
      /> */}

      {/* <CancelSubscription
        onCancel={handleCancelSubscription}
      /> */}
    </div>
  );
};
