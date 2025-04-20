
import React, { useState } from "react";
import { EmployeeWorklist } from "./EmployeeWorklist";
import { Appointment } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<number>(1); // Default: today

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-roof-50 p-2 border-b">
        <Tabs defaultValue={String(activeTab)} onValueChange={(value) => setActiveTab(Number(value))}>
          <TabsList className="w-full justify-start bg-roof-50 p-1">
            {days.map((day, idx) => (
              <TabsTrigger 
                key={day.label} 
                value={String(idx)}
                className={`px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-roof-700 data-[state=active]:shadow-sm`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
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
