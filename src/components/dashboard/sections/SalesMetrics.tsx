
import React from "react";
import { StatsCardWithChart } from "../stats/StatsCardWithChart";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Invoice } from "@/types";
import { format, parseISO, startOfMonth, endOfMonth, addDays } from "date-fns";
import { nl } from "date-fns/locale";

interface SalesMetricsProps {
  totalAmount: number;
  formatCurrency: (amount: number) => string;
}

export const SalesMetrics: React.FC<SalesMetricsProps> = ({ 
  totalAmount, 
  formatCurrency 
}) => {
  // Generate daily data for current month with sample data
  const generateDailyData = () => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const dailyData = [];
    let currentDay = monthStart;
    
    while (currentDay <= monthEnd) {
      const baseAmount = Math.random() * 2000 + 1000; // Random base between 1000-3000
      dailyData.push({
        time: format(currentDay, 'd MMM', { locale: nl }),
        today: Math.round(baseAmount),
        yesterday: Math.round(baseAmount * 0.9)
      });
      currentDay = addDays(currentDay, 1);
    }
    
    return dailyData;
  };

  const salesData = generateDailyData();

  return (
    <StatsCardWithChart
      title="Totale omzet"
      value={formatCurrency(totalAmount)}
      change={2.6}
      chipData={[
        { label: "Bedrijfsales", value: formatCurrency(totalAmount), change: 3.2 }
      ]}
      subTitle="OMZET DEZE MAAND"
      chart={
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={salesData}>
            <Line 
              type="monotone" 
              dataKey="today" 
              stroke="#8b5cf6" 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};
