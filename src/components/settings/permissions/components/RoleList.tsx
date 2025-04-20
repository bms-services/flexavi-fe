
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, Plus } from "lucide-react";
import { Role } from "../types";

interface RoleListProps {
  roles: Role[];
  selectedRole: Role | null;
  onSelectRole: (role: Role) => void;
  onEditRole: (role: Role) => void;
  onAddRole: () => void;
}

export const RoleList: React.FC<RoleListProps> = ({
  roles,
  selectedRole,
  onSelectRole,
  onEditRole,
  onAddRole,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" /> Rollen
        </h3>
        <Button size="sm" onClick={onAddRole}>
          <Plus className="h-4 w-4 mr-2" />
          Rol toevoegen
        </Button>
      </div>
      
      <div className="space-y-2">
        {roles.map((role) => (
          <div 
            key={role.id}
            className={`p-3 border rounded-md cursor-pointer hover:bg-accent ${selectedRole?.id === role.id ? 'bg-accent' : ''}`}
            onClick={() => onSelectRole(role)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{role.name}</h4>
                {role.description && (
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                )}
              </div>
              {role.id !== "admin" && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditRole(role);
                  }}
                >
                  Bewerken
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
