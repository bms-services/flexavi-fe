
import { Group } from "@/types/community";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface CommunityGroupDetailProps {
  group: Group;
  onClose: () => void;
}

export function CommunityGroupDetail({ group, onClose }: CommunityGroupDetailProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{group.name}</h2>
        <p className="text-muted-foreground">{group.description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{group.memberCount}</CardTitle>
            <CardDescription>Leden</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{group.postCount}</CardTitle>
            <CardDescription>Berichten</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-4">
        <h3 className="font-medium text-indigo-700 mb-2">Over deze groep</h3>
        <p className="text-indigo-900">{group.description}</p>
        
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-indigo-700">
            <Calendar className="h-4 w-4" />
            <span>Gecreëerd op {format(new Date(2023, 3, 15), 'd MMMM yyyy', { locale: nl })}</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-700">
            <MessageSquare className="h-4 w-4" />
            <span>{group.postCount} berichten geplaatst</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-700">
            <Users className="h-4 w-4" />
            <span>{group.memberCount} leden</span>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onClose}
        className="w-full"
        variant="outline"
      >
        Sluiten
      </Button>
    </div>
  );
}
