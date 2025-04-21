
import React from "react";
import { StatsCardWithChart } from "../stats/StatsCardWithChart";
import { generateTimeData } from "@/utils/dashboardCalculations";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface SalesMetricsProps {
  totalAmount: number;
  formatCurrency: (amount: number) => string;
}

export const SalesMetrics: React.FC<SalesMetricsProps> = ({ totalAmount, formatCurrency }) => {
  const salesData = generateTimeData(24, 50);

  return (
    <StatsCardWithChart
      title="Totale omzet"
      value={formatCurrency(totalAmount)}
      change={2.6}
      chipData={[
        { label: "Online winkel", value: formatCurrency(totalAmount * 0.6), change: 3.2 },
        { label: "Persoonlijk", value: formatCurrency(totalAmount * 0.4), change: 7.0 }
      ]}
      subTitle="OMZET OVER TIJD"
      chart={
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={salesData}>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Line type="monotone" dataKey="yesterday" stroke="#e2e8f0" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="today" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      }
      chartLegend={[
        { label: "Gisteren", color: "#e2e8f0" },
        { label: "Vandaag", color: "#8b5cf6" }
      ]}
    />
  );
};

