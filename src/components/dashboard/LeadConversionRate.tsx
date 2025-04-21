
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { mockLeads } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

interface LeadConversionRateProps {
  timeRange: string;
}

export const LeadConversionRate: React.FC<LeadConversionRateProps> = ({ timeRange }) => {
  const isMobile = useIsMobile();
  
  // Calculate conversion rates based on lead statuses
  const calculateConversionData = () => {
    const totalLeads = mockLeads.length;
    
    // Count leads by status
    const statusCounts = mockLeads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Map to visualization format
    const data = [
      {
        name: "Nieuwe leads",
        value: statusCounts["new"] || 0,
        color: "#9BA5B7",
      },
      {
        name: "In gesprek",
        value: (statusCounts["contacted"] || 0) + (statusCounts["qualified"] || 0),
        color: "#36b0f7",
      },
      {
        name: "Offertes",
        value: (statusCounts["proposal"] || 0) + (statusCounts["negotiation"] || 0),
        color: "#0c97e8",
      },
      {
        name: "Gewonnen",
        value: statusCounts["won"] || 0,
        color: "#0260a1",
      },
      {
        name: "Verloren",
        value: statusCounts["lost"] || 0,
        color: "#f97171",
      },
    ];
    
    return data.filter(item => item.value > 0);
  };

  const data = calculateConversionData();
  
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: any) => {
    // Don't render labels on mobile or if percentage is small
    if (isMobile || percent < 0.1) return null;
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="99%" height="99%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={isMobile ? 45 : 80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value} leads`, null]}
          contentStyle={{ 
            borderRadius: 6,
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            fontSize: isMobile ? '9px' : '11px',
            padding: isMobile ? '2px 4px' : '6px 8px'
          }}
        />
        <Legend 
          layout={isMobile ? "horizontal" : "vertical"} 
          verticalAlign="bottom"
          align={isMobile ? "center" : "right"}
          iconSize={isMobile ? 6 : 8}
          iconType="circle"
          formatter={(value) => 
            <span className={`text-${isMobile ? 'xs' : 'sm'}`}>{value}</span>
          }
          wrapperStyle={{
            fontSize: isMobile ? "8px" : "10px",
            paddingTop: "6px"
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
