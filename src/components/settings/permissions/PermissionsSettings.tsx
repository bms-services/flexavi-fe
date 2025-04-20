import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { RoleList } from "./components/RoleList";
import { PermissionsTable } from "./components/PermissionsTable";
import { RoleDialog } from "./components/RoleDialog";
import { Role, Module, Permission } from "./types";

export const PermissionsSettings: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Volledige toegang tot alle functies",
      permissions: {
        leads: ["view", "create", "edit", "delete"],
        appointments: ["view", "create", "edit", "delete"],
        quotes: ["view", "create", "edit", "delete"],
        invoices: ["view", "create", "edit", "delete"],
        projects: ["view", "create", "edit", "delete"],
        products: ["view", "create", "edit", "delete"],
        teams: ["view", "create", "edit", "delete"],
        settings: ["view", "create", "edit", "delete"],
      },
    },
    {
      id: "sales",
      name: "Verkoop",
      description: "Verkoopteam met beperkte rechten",
      permissions: {
        leads: ["view", "create", "edit"],
        appointments: ["view", "create", "edit"],
        quotes: ["view", "create", "edit"],
        invoices: ["view", "create"],
        projects: ["view"],
        products: ["view"],
        teams: ["view"],
        settings: [],
      },
    },
    {
      id: "installation",
      name: "Uitvoering",
      description: "Uitvoeringsteam met beperkte rechten",
      permissions: {
        leads: ["view"],
        appointments: ["view", "edit"],
        quotes: ["view"],
        invoices: ["view"],
        projects: ["view", "edit"],
        products: ["view"],
        teams: ["view"],
        settings: [],
      },
    },
  ]);

  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleAddRole = () => {
    setEditingRoleId(null);
    setDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRoleId(role.id);
    setDialogOpen(true);
  };

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  const togglePermission = (moduleKey: Module, permission: Permission) => {
    if (!selectedRole) return;

    setRoles(roles.map(role => {
      if (role.id === selectedRole.id) {
        const currentPermissions = role.permissions[moduleKey];
        const updatedPermissions = currentPermissions.includes(permission)
          ? currentPermissions.filter(p => p !== permission)
          : [...currentPermissions, permission];
        
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [moduleKey]: updatedPermissions,
          }
        };
      }
      return role;
    }));

    setSelectedRole(roles.find(r => r.id === selectedRole.id) || null);
  };

  const onSubmit = (values: { name: string; description: string }) => {
    if (editingRoleId) {
      // Update existing role
      setRoles(roles.map(role => 
        role.id === editingRoleId 
          ? { ...role, name: values.name, description: values.description || "" } 
          : role
      ));
      
      toast({
        title: "Rol bijgewerkt",
        description: `De rol "${values.name}" is succesvol bijgewerkt.`,
      });
    } else {
      // Create new role
      const newRole: Role = {
        id: uuidv4(),
        name: values.name,
        description: values.description || "",
        permissions: {
          leads: [],
          appointments: [],
          quotes: [],
          invoices: [],
          projects: [],
          products: [],
          teams: [],
          settings: [],
        },
      };
      
      setRoles([...roles, newRole]);
      
      toast({
        title: "Rol toegevoegd",
        description: `De rol "${values.name}" is succesvol toegevoegd.`,
      });
    }
    
    setDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rollen & Rechten</CardTitle>
        <CardDescription>
          Beheer gebruikersrollen en bijbehorende rechten voor verschillende onderdelen van het systeem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <RoleList
              roles={roles}
              selectedRole={selectedRole}
              onSelectRole={handleSelectRole}
              onEditRole={handleEditRole}
              onAddRole={handleAddRole}
            />
          </div>
          
          <div className="md:col-span-2">
            {selectedRole ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{selectedRole.name} Rechten</h3>
                
                <PermissionsTable
                  selectedRole={selectedRole}
                  onTogglePermission={togglePermission}
                />
                
                {selectedRole.id === "admin" && (
                  <p className="text-sm text-muted-foreground italic">
                    De Administrator rol heeft altijd volledige rechten en kan niet worden aangepast.
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full border rounded-md p-8">
                <div className="text-center">
                  <Shield className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">Selecteer een rol</h3>
                  <p className="text-muted-foreground">
                    Selecteer een rol aan de linkerkant om de rechten te bekijken en te bewerken.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <RoleDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={onSubmit}
          editingRoleId={editingRoleId}
          defaultValues={
            editingRoleId 
              ? roles.find(r => r.id === editingRoleId)
              : undefined
          }
        />
      </CardContent>
    </Card>
  );
};
