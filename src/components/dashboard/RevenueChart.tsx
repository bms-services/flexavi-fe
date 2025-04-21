
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

    const data = Array.from({ length: months }).map((_, i) => {
      const date = subMonths(now, months - i - 1);
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
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={250}>
        <LineChart 
          data={data} 
          margin={{ 
            top: 10, 
            right: isMobile ? 10 : 30, 
            left: isMobile ? 0 : 10, 
            bottom: 10 
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#f0f0f0" 
          />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            interval={isMobile ? 1 : 0}
            label={isMobile ? undefined : {
              value: 'Maanden',
              position: 'insideBottom',
              offset: -10,
              fontSize: 12,
              fill: '#666'
            }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={formatYAxis}
            width={isMobile ? 40 : 60}
            label={isMobile ? undefined : {
              value: 'Omzet (EUR)',
              angle: -90,
              position: 'insideLeft',
              fontSize: 12,
              fill: '#666'
            }}
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
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#0c97e8" 
            strokeWidth={3}
            dot={isMobile ? false : { strokeWidth: 3, r: 4, fill: "white" }}
            activeDot={{ r: 6, fill: "#0c97e8" }}
            name="Omzet"
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#d4d4d4" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Doelstelling"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
