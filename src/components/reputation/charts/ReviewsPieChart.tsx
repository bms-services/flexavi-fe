
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Review } from "@/types/reputation";

export const ReviewsPieChart = ({ reviews }: { reviews: Review[] }) => {
  // Process data for chart - count reviews by rating
  const chartData = useMemo(() => {
    // Filter out reviews with no rating (pending)
    const ratedReviews = reviews.filter(review => review.rating > 0);
    
    // Count reviews by rating
    const counts = {
      "5 Sterren": 0, 
      "4 Sterren": 0, 
      "3 Sterren": 0, 
      "2 Sterren": 0, 
      "1 Ster": 0
    };
    
    ratedReviews.forEach(review => {
      if (review.rating === 5) counts["5 Sterren"]++;
      else if (review.rating === 4) counts["4 Sterren"]++;
      else if (review.rating === 3) counts["3 Sterren"]++;
      else if (review.rating === 2) counts["2 Sterren"]++;
      else if (review.rating === 1) counts["1 Ster"]++;
    });
    
    // Convert to array for pie chart
    return Object.keys(counts).map(label => ({
      name: label,
      value: counts[label as keyof typeof counts]
    }));
  }, [reviews]);

  // Colors for each rating
  const COLORS = ['#16a34a', '#22c55e', '#f97316', '#ef4444', '#dc2626'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">Aantal: {payload[0].value}</p>
          <p className="text-sm">Percentage: {((payload[0].value / reviews.filter(r => r.rating > 0).length) * 100).toFixed(1)}%</p>
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
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
};
