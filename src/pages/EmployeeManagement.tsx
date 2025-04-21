
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useEmployeeDialog } from "@/components/employees/useEmployeeDialog";

export default function EmployeeManagement() {
  const { openDialog } = useEmployeeDialog();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Medewerkers</h1>
          </div>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Medewerker
          </Button>
        </div>
        <EmployeeList />
      </div>
    </Layout>
  );
}
