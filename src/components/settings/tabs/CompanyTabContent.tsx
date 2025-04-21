
import React from "react";
import { CompanySettings } from "../company/CompanySettings";
import { DomainSettings } from "../company/DomainSettings";

export const CompanyTabContent = () => {
  return (
    <>
      <CompanySettings />
      <div className="mt-6">
        <DomainSettings />
      </div>
    </>
  );
};
