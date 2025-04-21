
import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, TooltipProps } from "recharts";
import { format, parseISO, subMonths } from "date-fns";
import { nl } from "date-fns/locale";
import { Review } from "@/types/reputation";

export const ReputationChart = ({ reviews }: { reviews: Review[] }) => {
  // Process data for chart - group by month and calculate average rating
  const chartData = useMemo(() => {
    // Filter out reviews with no rating (pending)
    const ratedReviews = reviews.filter(review => review.rating > 0);
    
    // Get date range - last 6 months
    const today = new Date();
    const sixMonthsAgo = subMonths(today, 6);
    
    // Create a map of months
    const monthMap: Record<string, { month: string, count: number, totalRating: number, avgRating: number }> = {};
    
    // Initialize months
    for (let i = 0; i <= 6; i++) {
      const date = subMonths(today, i);
      const monthKey = format(date, "yyyy-MM");
      const monthLabel = format(date, "MMM yyyy", { locale: nl });
      monthMap[monthKey] = { month: monthLabel, count: 0, totalRating: 0, avgRating: 0 };
    }
    
    // Aggregate reviews by month
    ratedReviews.forEach(review => {
      const date = parseISO(review.createdAt);
      if (date >= sixMonthsAgo) {
        const monthKey = format(date, "yyyy-MM");
        if (monthMap[monthKey]) {
          monthMap[monthKey].count += 1;
          monthMap[monthKey].totalRating += review.rating;
        }
      }
    });
    
    // Calculate average and convert to array
    const result = Object.keys(monthMap).map(key => {
      const month = monthMap[key];
      return {
        ...month,
        avgRating: month.count > 0 ? month.totalRating / month.count : 0
      };
    });
    
    // Sort by date (most recent last)
    return result.sort((a, b) => {
      const monthA = a.month.split(" ")[0];
      const yearA = a.month.split(" ")[1];
      const monthB = b.month.split(" ")[0];
      const yearB = b.month.split(" ")[1];
      
      return yearA === yearB 
        ? new Date(Date.parse(`1 ${monthA} 2000`)).getTime() - new Date(Date.parse(`1 ${monthB} 2000`)).getTime()
        : parseInt(yearA) - parseInt(yearB);
    });
  }, [reviews]);

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm">Gemiddelde: {payload[0].value?.toFixed(1)} ⭐</p>
          <p className="text-sm">Aantal reviews: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12 }} 
        />
        <YAxis 
          yAxisId="left"
          domain={[0, 5]} 
          tick={{ fontSize: 12 }} 
          tickCount={6}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          domain={[0, 'auto']} 
          tick={{ fontSize: 12 }} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="avgRating"
          name="Gemiddelde beoordeling"
          stroke="#1a56db"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="count"
          name="Aantal reviews"
          stroke="#10b981"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
