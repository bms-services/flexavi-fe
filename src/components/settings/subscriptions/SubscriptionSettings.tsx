
import React, { useEffect, useState } from "react";

import { mockInvoices } from "@/data/mockInvoices";
import { PlanCard } from "./components/PlanCard";
import { InvoiceHistory } from "./components/InvoiceHistory";
import { CurrentPlan } from "./components/CurrentPlan";
import { CancelSubscription } from "./components/CancelSubscription";
import { useAppDispatch } from "@/hooks/use-redux";
import { getPackageIndex } from "@/actions/packageAction";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PaginatedResponse } from "@/lib/redux-thunk";
import { CompanyPackageItem, Package, PackageItem, PackageTypeEnum, PackageTypeT } from "@/types/package";
import { putSettingPackageUpdate } from "@/actions/settingAction";
import { User } from "@/types/user";



export const SubscriptionSettings = () => {
  const dispatch = useAppDispatch();

  // const { loading, response: responsePackageIndex } = useSelector((state: RootState) => state.package.index);
  // const { response: responseProfileUpdatePackage } = useSelector((state: RootState) => state.setting.package.update);
  // const { response: responseProfileShow } = useSelector((state: RootState) => state.profile.show);


  const packageIndexRedux = useSelector((state: RootState) => state.package.index);
  const settingPackageUpdateRedux = useSelector((state: RootState) => state.setting.package.update);
  const profileShowRedux = useSelector((state: RootState) => state.profile.show);

  // const result = responsePackageIndex?.result as PaginatedResponse<Package>;
  // const resultProfileShow = responseProfileShow?.result as User;
  // const resultProfileUpdatePackage = responseProfileUpdatePackage?.result as CompanyPackageItem;

  const [packageType, setPackageType] = useState<PackageTypeT>(PackageTypeEnum.MONTHLY);
  const [activePackage, setActivePackage] = useState<string | null>(null);
  const [packageMonthly, setPackageMonthly] = useState<PackageItem[]>([]);
  const [packageYearly, setPackageYearly] = useState<PackageItem[]>([]);

  const filteredPackages = packageType === PackageTypeEnum.MONTHLY ? packageMonthly : packageYearly;

  useEffect(() => {
    dispatch(getPackageIndex())
  }, [dispatch]);


  // useEffect(() => {
  //   if (packageIndexRedux.success) {
  //     const allItems = packageIndexRedux.result.data.flatMap(pkg => pkg.items.map(item => ({
  //       ...item,
  //       package_id: pkg.id,
  //       package_name: pkg.name,
  //       package_description: pkg.description,
  //       package_features: JSON.parse(pkg.features || "[]"),
  //     })));

  //     setPackageMonthly(allItems.filter(item => item.interval === "month"));
  //     setPackageYearly(allItems.filter(item => item.interval === "year"));
  //   }
  // }, [packageIndexRedux]);


  // useEffect(() => {
  //   if (profileShowRedux.success) {
  //     const selectedPackageItem = profileShowRedux.result.subscription.selected_package_item;
  //     setActivePackage(selectedPackageItem.package_item_id);
  //   }
  // }, [profileShowRedux]);

  // useEffect(() => {
  //   if (settingPackageUpdateRedux.success) {
  //     setActivePackage(settingPackageUpdateRedux.result.package_item_id);
  //   }
  // }, [settingPackageUpdateRedux]);

  const handleUpgrade = (id: string) => {
    dispatch(putSettingPackageUpdate(id));
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
