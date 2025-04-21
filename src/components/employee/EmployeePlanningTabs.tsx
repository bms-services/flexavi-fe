
import React, { useState } from "react";
import { EmployeeWorklist } from "./EmployeeWorklist";
import { Appointment } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [activeTab, setActiveTab] = useState<number>(0); // Default: today

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-full">
      <div className="bg-white p-2 border-b">
        <Tabs defaultValue={String(activeTab)} onValueChange={(value) => setActiveTab(Number(value))}>
          <div className="flex items-center">
            <button 
              className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full flex-shrink-0"
              onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
              disabled={activeTab === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <ScrollArea className="w-full max-w-full">
              <TabsList className="w-full justify-start bg-gray-50 p-1 flex space-x-2 overflow-x-auto">
                {days.map((day, idx) => (
                  <TabsTrigger 
                    key={day.label} 
                    value={String(idx)}
                    className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md whitespace-nowrap flex-shrink-0"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {day.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
            
            <button 
              className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full flex-shrink-0"
              onClick={() => setActiveTab(prev => Math.min(days.length - 1, prev + 1))}
              disabled={activeTab === days.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
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
