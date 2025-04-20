
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Plus, User, Users, Calendar, FileText, Briefcase, Package, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

type Permission = "view" | "create" | "edit" | "delete";
type Module = "leads" | "appointments" | "quotes" | "invoices" | "projects" | "products" | "teams" | "settings";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<Module, Permission[]>;
}

const roleSchema = z.object({
  name: z.string().min(1, "Rol naam is verplicht"),
  description: z.string().optional(),
});

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

  const form = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleAddRole = () => {
    setEditingRoleId(null);
    form.reset({
      name: "",
      description: "",
    });
    setDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRoleId(role.id);
    form.reset({
      name: role.name,
      description: role.description || "",
    });
    setDialogOpen(true);
  };

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  const onSubmit = (values: z.infer<typeof roleSchema>) => {
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

    // Update selectedRole to reflect changes
    setSelectedRole(roles.find(r => r.id === selectedRole.id) || null);
  };

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

  const permissionLabels: Record<Permission, string> = {
    view: "Bekijken",
    create: "Aanmaken",
    edit: "Bewerken",
    delete: "Verwijderen",
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" /> Rollen
              </h3>
              <Button size="sm" onClick={handleAddRole}>
                <Plus className="h-4 w-4 mr-2" />
                Rol toevoegen
              </Button>
            </div>
            
            <div className="space-y-2">
              {roles.map((role) => (
                <div 
                  key={role.id}
                  className={`p-3 border rounded-md cursor-pointer hover:bg-accent ${selectedRole?.id === role.id ? 'bg-accent' : ''}`}
                  onClick={() => handleSelectRole(role)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{role.name}</h4>
                      {role.description && (
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      )}
                    </div>
                    {role.id !== "admin" && (
                      <Button variant="ghost" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        handleEditRole(role);
                      }}>
                        Bewerken
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            {selectedRole ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{selectedRole.name} Rechten</h3>
                
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
                              onCheckedChange={() => togglePermission(moduleKey, permission)}
                              disabled={selectedRole.id === "admin" || (permission !== "view" && !selectedRole.permissions[moduleKey].includes("view"))}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
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
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRoleId ? "Rol bewerken" : "Nieuwe rol toevoegen"}
              </DialogTitle>
              <DialogDescription>
                {editingRoleId ? "Bewerk de geselecteerde rol" : "Voeg een nieuwe rol toe met aangepaste rechten"}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol naam</FormLabel>
                      <FormControl>
                        <Input placeholder="Bijv. Manager, Verkoper, Monteur" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschrijving (optioneel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Beschrijf de rol en verantwoordelijkheden" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">
                    {editingRoleId ? "Rol bijwerken" : "Rol toevoegen"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
