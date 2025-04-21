
import React from "react";
import { PersonalInfoSettings } from "../account/PersonalInfoSettings";
import { PasswordSettings } from "../account/PasswordSettings";

export const AccountTabContent = () => {
  return (
    <>
      <PersonalInfoSettings />
      <div className="mt-6">
        <PasswordSettings />
      </div>
    </>
  );
};
