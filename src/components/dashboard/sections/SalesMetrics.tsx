
import React from "react";
import { StatsCardWithChart } from "../stats/StatsCardWithChart";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Invoice } from "@/types";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";
import { nl } from "date-fns/locale";

interface SalesMetricsProps {
  totalAmount: number;
  formatCurrency: (amount: number) => string;
}

export const SalesMetrics: React.FC<SalesMetricsProps> = ({ 
  totalAmount, 
  formatCurrency 
}) => {
  // Generate daily data for current month
  const generateDailyData = () => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    
    // Create a map of dates to track amounts
    const dailyAmounts = new Map();
    const days = [];
    let currentDay = monthStart;
    
    while (currentDay <= monthEnd) {
      const dateStr = format(currentDay, 'yyyy-MM-dd');
      dailyAmounts.set(dateStr, {
        time: format(currentDay, 'd MMM', { locale: nl }),
        today: 0,
        yesterday: 0
      });
      days.push(dateStr);
      currentDay = new Date(currentDay.setDate(currentDay.getDate() + 1));
    }
    
    return Array.from(dailyAmounts.values());
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
