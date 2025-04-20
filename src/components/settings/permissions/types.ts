
export type Permission = "view" | "create" | "edit" | "delete";
export type Module = "leads" | "appointments" | "quotes" | "invoices" | "projects" | "products" | "teams" | "settings";

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<Module, Permission[]>;
}
