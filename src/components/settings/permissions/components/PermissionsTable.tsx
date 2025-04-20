
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Calendar, FileText, Briefcase, Package, Settings } from "lucide-react";
import { Role, Module, Permission } from "../types";

interface PermissionsTableProps {
  selectedRole: Role;
  onTogglePermission: (moduleKey: Module, permission: Permission) => void;
}

export const PermissionsTable: React.FC<PermissionsTableProps> = ({
  selectedRole,
  onTogglePermission,
}) => {
  const moduleIcons: Record<Module, React.ReactNode> = {
    leads: <Users className="h-4 w-4" />,
    appointments: <Calendar className="h-4 w-4" />,
    quotes: <FileText className="h-4 w-4" />,
    invoices: <FileText className="h-4 w-4" />,
    projects: <Briefcase className="h-4 w-4" />,
    products: <Package className="h-4 w-4" />,
    teams: <Users className="h-4 w-4" />,
    settings: <Settings className="h-4 w-4" />,
  };

  const moduleLabels: Record<Module, string> = {
    leads: "Leads",
    appointments: "Afspraken",
    quotes: "Offertes",
    invoices: "Facturen",
    projects: "Projecten",
    products: "Producten",
    teams: "Teams",
    settings: "Instellingen",
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Module</TableHead>
          <TableHead>Bekijken</TableHead>
          <TableHead>Aanmaken</TableHead>
          <TableHead>Bewerken</TableHead>
          <TableHead>Verwijderen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(Object.keys(selectedRole.permissions) as Module[]).map((moduleKey) => (
          <TableRow key={moduleKey}>
            <TableCell className="font-medium flex items-center gap-2">
              {moduleIcons[moduleKey]}
              {moduleLabels[moduleKey]}
            </TableCell>
            {(["view", "create", "edit", "delete"] as Permission[]).map((permission) => (
              <TableCell key={permission}>
                <Checkbox 
                  checked={selectedRole.permissions[moduleKey].includes(permission)}
                  onCheckedChange={() => onTogglePermission(moduleKey, permission)}
                  disabled={selectedRole.id === "admin" || (permission !== "view" && !selectedRole.permissions[moduleKey].includes("view"))}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
