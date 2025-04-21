
import React, { useState } from "react";
import { EmployeeWorklist } from "./EmployeeWorklist";
import { Appointment } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface DayTab {
  label: string;
  offset: number;
}

interface EmployeePlanningTabsProps {
  days: DayTab[];
  getAppointmentsForDay: (offset: number) => Appointment[];
}

export const EmployeePlanningTabs: React.FC<EmployeePlanningTabsProps> = ({
  days,
  getAppointmentsForDay,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const isMobile = useIsMobile();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-roof-50 p-1.5 sm:p-2 border-b">
        <Tabs defaultValue={String(activeTab)} onValueChange={(value) => setActiveTab(Number(value))}>
          <ScrollArea className="w-full" type="scroll">
            <TabsList className="w-full justify-start bg-roof-50 p-0.5 sm:p-1 flex space-x-1 sm:space-x-2">
              {days.map((day, idx) => (
                <TabsTrigger 
                  key={day.label} 
                  value={String(idx)}
                  className="px-2 sm:px-4 py-1 sm:py-2 data-[state=active]:bg-white data-[state=active]:text-roof-700 data-[state=active]:shadow-sm whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
                >
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span>{day.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
          
          {days.map((day, idx) => (
            <TabsContent key={idx} value={String(idx)} className="m-0 focus-visible:outline-none focus-visible:ring-0">
              <EmployeeWorklist 
                appointments={getAppointmentsForDay(day.offset)} 
                dayLabel={day.label} 
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
