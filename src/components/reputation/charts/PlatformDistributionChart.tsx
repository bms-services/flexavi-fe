
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Review } from "@/types/reputation";

export const PlatformDistributionChart = ({ reviews }: { reviews: Review[] }) => {
  // Process data for chart - count reviews by platform
  const chartData = useMemo(() => {
    // Filter out reviews with no rating (pending)
    const publishedReviews = reviews.filter(
      review => review.status === "published" || review.status === "approved"
    );
    
    // Count reviews by platform
    const counts = {
      "Google": 0, 
      "Trustpilot": 0, 
      "Facebook": 0, 
      "Eigen website": 0
    };
    
    publishedReviews.forEach(review => {
      if (review.platform === "google") counts["Google"]++;
      else if (review.platform === "trustpilot") counts["Trustpilot"]++;
      else if (review.platform === "facebook") counts["Facebook"]++;
      else if (review.platform === "internal") counts["Eigen website"]++;
    });
    
    // Convert to array for pie chart and filter out zeros
    return Object.keys(counts)
      .filter(key => counts[key as keyof typeof counts] > 0)
      .map(label => ({
        name: label,
        value: counts[label as keyof typeof counts]
      }));
  }, [reviews]);

  // Colors for each platform
  const COLORS = ['#4285F4', '#00B67A', '#1877F2', '#6366f1'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">Aantal: {payload[0].value}</p>
          <p className="text-sm">Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};
