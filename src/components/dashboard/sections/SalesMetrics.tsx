
import React from "react";
import { StatsCardWithChart } from "../stats/StatsCardWithChart";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { format, startOfMonth, endOfMonth, addDays } from "date-fns";
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
    
    while (currentDay <= monthEnd && dailyData.length < 31) {
      const baseAmount = Math.random() * 2000 + 1000; // Random base between 1000-3000
      dailyData.push({
        time: format(currentDay, "d", { locale: nl }),
        today: Math.round(baseAmount),
        yesterday: Math.round(baseAmount * 0.9)
      });
      currentDay = addDays(currentDay, 1);
    }
    
    return dailyData;
  };

  const salesData = generateDailyData();

  // Custom tooltip formatter
  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatYAxis = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <StatsCardWithChart
      title="Totale omzet"
      value={formatCurrency(totalAmount)}
      change={2.6}
      chipData={[
        { label: "Bedrijfsales", value: formatCurrency(totalAmount * 0.7), change: 3.2 }
      ]}
      subTitle="OMZET DEZE MAAND"
      chart={
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={salesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 8 }} 
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={20}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 8 }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip 
              formatter={(value: number) => [formatTooltip(value), 'Omzet']}
              labelFormatter={(label) => `Dag: ${label}`}
              contentStyle={{ 
                fontSize: '10px', 
                borderRadius: '4px',
                padding: '2px 4px'
              }}
            />
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
