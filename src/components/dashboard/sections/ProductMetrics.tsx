
import React from "react";
import { StatsCardWithTable } from "../stats/StatsCardWithTable";

interface ProductMetricsProps {
  products: any[];
}

export const ProductMetrics: React.FC<ProductMetricsProps> = () => {
  const services = [
    { name: "Installatie zonnepanelen", count: 28, change: 12.4 },
    { name: "Energieadvies", count: 15, change: 8.2 },
    { name: "Onderhoud installaties", count: 12, change: -2.1 },
    { name: "Systeemontwerp", count: 8, change: 5.7 }
  ];

  return (
    <StatsCardWithTable
      title="Meest verkochte diensten"
      table={services.map(service => ({
        label: service.name,
        value: service.count.toString(),
        change: service.change
      }))}
    />
  );
};
