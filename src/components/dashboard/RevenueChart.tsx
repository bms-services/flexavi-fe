
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockInvoices } from "@/data/mockData";
import { format, parseISO, subMonths } from "date-fns";
import { nl } from "date-fns/locale";
import { useIsMobile } from "@/hooks/use-mobile";

interface RevenueChartProps {
  timeRange: string;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ timeRange }) => {
  const isMobile = useIsMobile();
  
  // Generate sample data based on invoices
  const generateChartData = () => {
    const now = new Date();
    let months = 12;
    
    if (timeRange === "week") months = 1;
    if (timeRange === "month") months = 3;
    if (timeRange === "quarter") months = 6;

    // For mobile, reduce data points for better display
    const dataLength = isMobile ? Math.min(6, months) : months;

    const data = Array.from({ length: dataLength }).map((_, i) => {
      const date = subMonths(now, dataLength - i - 1);
      const monthStr = format(date, "yyyy-MM");
      
      const monthlyTotal = mockInvoices
        .filter(inv => {
          const invDate = parseISO(inv.dueDate);
          return format(invDate, "yyyy-MM") === monthStr && inv.status === "paid";
        })
        .reduce((sum, inv) => sum + inv.amount, 0);
        
      return {
        month: format(date, "MMM", { locale: nl }),
        revenue: monthlyTotal || Math.random() * 15000, // Ensure we have some data to show
        target: 15000 + Math.random() * 5000,
      };
    });

    return data;
  };

  const data = generateChartData();
  
  const formatYAxis = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  return (
    <ResponsiveContainer width="99%" height="99%">
      <LineChart 
        data={data} 
        margin={{ 
          top: 5, 
          right: isMobile ? 5 : 20, 
          left: isMobile ? 0 : 10, 
          bottom: 5 
        }}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke="#f0f0f0" 
          opacity={0.5}
        />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false}
          tick={{ fontSize: isMobile ? 9 : 11 }}
          interval={isMobile ? 0 : "preserveStartEnd"}
          dy={5}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: isMobile ? 9 : 11 }}
          tickFormatter={formatYAxis}
          width={isMobile ? 35 : 50}
          tickCount={isMobile ? 3 : 5}
        />
        <Tooltip 
          formatter={(value: number, name: string) => [
            formatTooltip(Number(value)), 
            name === 'revenue' ? 'Omzet' : 'Doelstelling'
          ]}
          contentStyle={{ 
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            fontSize: isMobile ? '10px' : '11px',
            padding: isMobile ? '2px 4px' : '4px 6px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#0c97e8" 
          strokeWidth={2}
          dot={{ strokeWidth: 2, r: isMobile ? 1 : 3, fill: "white" }}
          activeDot={{ r: isMobile ? 3 : 5, fill: "#0c97e8" }}
          name="Omzet"
        />
        <Line 
          type="monotone" 
          dataKey="target" 
          stroke="#d4d4d4" 
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
          name="Doelstelling"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
