
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Group } from "@/types/community";
import { useCommunityGroups } from "@/hooks/use-community";
import { Users, Camera, Briefcase, MessageSquare, FileImage, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunityGroupsProps {
  onSelectGroup: (group: Group) => void;
  selectedGroup: Group | null;
}

export function CommunityGroups({ onSelectGroup, selectedGroup }: CommunityGroupsProps) {
  const { groups } = useCommunityGroups();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Groepen</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1 px-4 pb-2">
          <button
            onClick={() => onSelectGroup(null as any)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100",
              !selectedGroup && "bg-gray-100 font-medium"
            )}
          >
            <Users className="h-4 w-4" />
            <span>Alle groepen</span>
          </button>
          
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100",
                selectedGroup?.id === group.id && "bg-gray-100 font-medium"
              )}
            >
              <span className="flex-shrink-0" style={{ color: group.color }}>
                {group.icon === 'users' && <Users className="h-4 w-4" />}
                {group.icon === 'camera' && <Camera className="h-4 w-4" />}
                {group.icon === 'briefcase' && <Briefcase className="h-4 w-4" />}
                {group.icon === 'message-square' && <MessageSquare className="h-4 w-4" />}
                {group.icon === 'headphones' && <Headphones className="h-4 w-4" />}
                {group.icon === 'file-image' && <FileImage className="h-4 w-4" />}
              </span>
              <span className="truncate">{group.name}</span>
              <Badge variant="outline" className="ml-auto">
                {group.postCount}
              </Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
