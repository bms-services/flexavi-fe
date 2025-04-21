
import React from "react";
import { StatsCardWithTable } from "../stats/StatsCardWithTable";
import { Product } from "@/types";
import { getTopProducts } from "@/utils/dashboardCalculations";

interface ProductMetricsProps {
  products: Product[];
}

export const ProductMetrics: React.FC<ProductMetricsProps> = ({ products }) => {
  const topProducts = getTopProducts(products);

  return (
    <StatsCardWithTable
      title="Top producten per verkocht aantal"
      table={topProducts.map(product => ({
        label: product.name,
        value: product.count.toString(),
        change: product.change
      }))}
    />
  );
};

