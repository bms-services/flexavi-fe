
import React from "react";
import { StatsCardWithTable } from "../stats/StatsCardWithTable";
import { Employee } from "@/types/employee-management";

interface EmployeeMetricsProps {
  employees: Employee[];
}

export const EmployeeMetrics: React.FC<EmployeeMetricsProps> = ({ employees }) => {
  // Metrics calculations
  const activeEmployees = employees.filter(emp => emp.active);
  
  // Group employees by role
  const employeesByRole = activeEmployees.reduce((acc, emp) => {
    acc[emp.role] = acc[emp.role] || [];
    acc[emp.role].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

  // Prepare table data
  const roleData = Object.entries(employeesByRole)
    .map(([role, roleEmployees]) => ({
      label: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize role
      value: roleEmployees.length.toString(),
      // Calculate average daily rate for the role
      subLabel: `€${Math.round(roleEmployees.reduce((sum, emp) => sum + emp.rates.dailyRate, 0) / roleEmployees.length)}/dag`,
      change: parseFloat((Math.random() * 6 - 1).toFixed(1)) // Random change for demo
    }))
    .sort((a, b) => parseInt(b.value) - parseInt(a.value))
    .slice(0, 4);

  return (
    <StatsCardWithTable
      title="Werknemers"
      value={activeEmployees.length.toString()}
      change={2.3}
      tooltip="Overzicht van actieve werknemers per rol"
      viewReportLink="/employees"
      subTitle="TEAM SAMENSTELLING"
      table={roleData}
    />
  );
};
