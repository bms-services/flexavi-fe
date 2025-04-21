
import React from "react";
import { StatsCardWithChart } from "../stats/StatsCardWithChart";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { addDays, format, startOfMonth } from "date-fns";
import { nl } from "date-fns/locale";

interface QuoteMetricsProps {
  totalQuoteAmount: number;
  formatCurrency: (amount: number) => string;
}

export const QuoteMetrics: React.FC<QuoteMetricsProps> = ({ 
  totalQuoteAmount, 
  formatCurrency 
}) => {
  const generateQuoteData = () => {
    const data = [];
    const startDate = startOfMonth(new Date());
    
    for (let i = 0; i < 30; i++) {
      const baseAmount = Math.random() * 3000 + 2000; // Random amount between 2000-5000
      data.push({
        time: format(addDays(startDate, i), 'd', { locale: nl }),
        value: Math.round(baseAmount),
      });
    }
    
    return data;
  };

  const quoteData = generateQuoteData();

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
      title="Offerte waarde"
      value={formatCurrency(totalQuoteAmount)}
      change={4.2}
      chipData={[
        { label: "Acceptatie ratio", value: "68%", change: 2.8 }
      ]}
      subTitle="OFFERTES DEZE MAAND"
      chart={
        <ResponsiveContainer width="99%" height="99%">
          <LineChart data={quoteData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
              width={25}
            />
            <Tooltip 
              formatter={(value: number) => [formatTooltip(value), 'Offerte']}
              labelFormatter={(label) => `Dag: ${label}`}
              contentStyle={{ 
                fontSize: '9px', 
                borderRadius: '4px',
                padding: '2px 4px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={1.5} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};
