
import React from "react";
import { StatsCardWithChart } from "../stats/StatsCardWithChart";
import { LineChart, Line, ResponsiveContainer } from "recharts";
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
        time: format(addDays(startDate, i), 'd MMM', { locale: nl }),
        value: Math.round(baseAmount),
      });
    }
    
    return data;
  };

  const quoteData = generateQuoteData();

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
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={quoteData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};
