
import React, { useState } from "react";
import { EmployeeWorklist } from "./EmployeeWorklist";
import { Appointment } from "@/types";

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
  const [activeTab, setActiveTab] = useState<number>(1); // Standaard: vandaag

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {days.map((day, idx) => (
          <button
            key={day.label}
            className={`px-4 py-2 rounded-t ${activeTab === idx ? "bg-roof-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab(idx)}
            type="button"
          >
            {day.label}
          </button>
        ))}
      </div>
      <div className="border rounded-b p-0 pb-4 bg-white">
        <EmployeeWorklist appointments={getAppointmentsForDay(days[activeTab].offset)} dayLabel={days[activeTab].label} />
      </div>
    </div>
  );
};
