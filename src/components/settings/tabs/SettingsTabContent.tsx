import { TabsContent } from "@/components/ui/tabs";
import { CompanyTabContent } from "./CompanyTabContent";
import { TeamsTabContent } from "./TeamsTabContent";
import { EmployeesTabContent } from "./EmployeesTabContent";
import { PermissionsTabContent } from "./PermissionsTabContent";
import { AppointmentsTabContent } from "./AppointmentsTabContent";
import { AccountTabContent } from "./AccountTabContent";
import { AttachmentsTabContent } from "./AttachmentsTabContent";
import { EmailTemplatesTabContent } from "./EmailTemplatesTabContent";
import { SignatureTabContent } from "./SignatureTabContent";
import { SubscriptionTabContent } from "./SubscriptionTabContent";
import { WorkAgreementsTabContent } from "./WorkAgreementsTabContent";
import { IntegrationsTabContent } from "./IntegrationsTabContent";
import { ReputationTabContent } from "./ReputationTabContent";

export const SettingsTabContent = () => {
  return (
    <>
      <TabsContent value="company">
        <CompanyTabContent />
      </TabsContent>
      <TabsContent value="teams">
        <TeamsTabContent />
      </TabsContent>
      <TabsContent value="employees">
        <EmployeesTabContent isInvitation={false} />
      </TabsContent>
      <TabsContent value="employees-invitation">
        <EmployeesTabContent isInvitation={true} />
      </TabsContent>
      <TabsContent value="permissions">
        <PermissionsTabContent />
      </TabsContent>
      <TabsContent value="appointments">
        <AppointmentsTabContent />
      </TabsContent>
      <TabsContent value="account">
        <AccountTabContent />
      </TabsContent>
      <TabsContent value="attachments">
        <AttachmentsTabContent />
      </TabsContent>
      <TabsContent value="email">
        <EmailTemplatesTabContent />
      </TabsContent>
      <TabsContent value="signature">
        <SignatureTabContent />
      </TabsContent>
      <TabsContent value="subscription">
        <SubscriptionTabContent />
      </TabsContent>
      <TabsContent value="workagreements">
        <WorkAgreementsTabContent />
      </TabsContent>
      <TabsContent value="reputation">
        <ReputationTabContent />
      </TabsContent>
      <TabsContent value="integrations">
        <IntegrationsTabContent />
      </TabsContent>
    </>
  );
};
