
import { LeadList } from "@/components/leads/LeadList";

const Leads = () => {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">
          Beheer al je leads op één plek.
        </p>
      </div>

      <LeadList />
    </div>
  );
};

export default Leads;
