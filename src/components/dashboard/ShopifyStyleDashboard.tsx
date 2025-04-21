
import React from "react";
import { 
  mockInvoices, 
  mockQuotes, 
  mockProjects, 
  mockLeads, 
  mockWorkAgreements, 
  mockEmployees, 
  mockProducts
} from "@/data/mockData";
import { StatsCard } from "./stats/StatsCard";
import { StatsCardWithChart } from "./stats/StatsCardWithChart";
import { StatsCardWithTable } from "./stats/StatsCardWithTable";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Info, Users, Clock, BarChart as BarChartIcon } from "lucide-react";

interface ShopifyStyleDashboardProps {
  timeRange: string;
}

export const ShopifyStyleDashboard: React.FC<ShopifyStyleDashboardProps> = ({ timeRange }) => {
  // Formatting helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate KPIs
  const totalInvoiceAmount = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = mockInvoices.filter(inv => inv.status === "paid");
  const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  
  const activeProjects = mockProjects.filter(p => p.status === "active").length;
  const totalProjects = mockProjects.length;
  
  const totalQuotes = mockQuotes.length;
  const acceptedQuotes = mockQuotes.filter(q => q.status === "accepted").length;
  const quoteConversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;
  
  const totalLeads = mockLeads.length;
  const convertedLeads = mockLeads.filter(l => l.status === "won").length;
  const leadConversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  
  const generateTimeData = (count: number, max: number) => {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      today: i < 12 ? Math.random() * max : Math.random() * max * 0.7,
      yesterday: Math.random() * max * 0.9
    }));
  };

  const salesData = generateTimeData(24, 50);
  const visitsData = generateTimeData(24, 100);
  const ordersData = generateTimeData(24, 15);
  const customersData = generateTimeData(24, 10);
  const averageOrderData = generateTimeData(24, 50);
  const marketingData = generateTimeData(24, 50);

  // Top products
  const topProducts = mockProducts
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 4)
    .map(product => ({
      name: product.name,
      count: product.stock,
      change: Math.floor(Math.random() * 30) + 1
    }));

  // Traffic sources
  const trafficSources = [
    { source: "Direct", count: 201, change: 5.8 },
    { source: "Search", count: 167, change: 3.2 },
    { source: "Social", count: 124, change: 7.5 },
    { source: "Email", count: 98, change: -2.1 },
    { source: "Referral", count: 76, change: 9.3 }
  ];

  // Locations
  const locations = [
    { country: "Nederland", count: 1438, change: 5.8 },
    { country: "België", count: 928, change: 51.2 },
    { country: "Duitsland", count: 674, change: 17.1 },
    { country: "Frankrijk", count: 258, change: 15.8 },
    { country: "Verenigd Koninkrijk", count: 90, change: 9.8 }
  ];

  // Landing pages
  const landingPages = [
    { url: "/producten/dakisolatie", visits: 14234, change: 5.8 },
    { url: "/diensten/zonnepanelen", visits: 14234, change: -3.2 },
    { url: "/producten/dakkapellen", visits: 14234, change: 2.1 },
    { url: "/producten/dakbedekking", visits: 14234, change: 4.8 },
    { url: "/diensten/advies", visits: 14234, change: 9.8 }
  ];

  // Conversion funnel
  const conversionFunnel = [
    { stage: "Bekeken", count: mockLeads.length, rate: (mockLeads.length / mockLeads.length * 100).toFixed(2), change: 4.0 },
    { stage: "Contact", count: mockLeads.filter(l => l.status !== "new").length, rate: (mockLeads.filter(l => l.status !== "new").length / mockLeads.length * 100).toFixed(2), change: 2.0 },
    { stage: "Offerte", count: mockQuotes.length, rate: (mockQuotes.length / mockLeads.length * 100).toFixed(2), change: 1.4 }
  ];

  // Social sources
  const socialSources = [
    { platform: "Facebook", count: 167, change: 5.8 },
    { platform: "Instagram", count: 103, change: 12.4 },
    { platform: "Twitter", count: 54, change: -2.3 },
    { platform: "LinkedIn", count: 48, change: 7.9 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* First row */}
      <StatsCardWithChart
        title="Totale omzet"
        value={formatCurrency(totalInvoiceAmount)}
        change={2.6}
        chipData={[
          { label: "Online winkel", value: formatCurrency(totalInvoiceAmount * 0.6), change: 3.2 },
          { label: "Persoonlijk", value: formatCurrency(totalInvoiceAmount * 0.4), change: 7.0 }
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

      <StatsCardWithChart
        title="Totale websitebezoekers"
        value={totalLeads.toString()}
        change={-9.6}
        isNegativeChange={true}
        subTitle="BEZOEKERS OVER TIJD"
        chart={
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={visitsData}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Area type="monotone" dataKey="yesterday" fillOpacity={0.2} fill="#e2e8f0" stroke="#e2e8f0" strokeWidth={2} />
              <Area type="monotone" dataKey="today" fillOpacity={0.2} fill="#8b5cf6" stroke="#8b5cf6" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        }
        chartLegend={[
          { label: "Gisteren", color: "#e2e8f0" },
          { label: "Vandaag", color: "#8b5cf6" }
        ]}
      />

      <StatsCardWithChart
        title="Herhalende klanten percentage"
        value={`${5.43}%`}
        change={2.6}
        subTitle="KLANTEN"
        chart={
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={customersData}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Area type="monotone" dataKey="yesterday" stackId="1" fillOpacity={0.2} fill="#36b0f7" stroke="#36b0f7" strokeWidth={0} />
              <Area type="monotone" dataKey="today" stackId="1" fillOpacity={0.2} fill="#8b5cf6" stroke="#8b5cf6" strokeWidth={0} />
            </AreaChart>
          </ResponsiveContainer>
        }
        chartLegend={[
          { label: "Eerste keer", color: "#8b5cf6" },
          { label: "Terugkerend", color: "#36b0f7" }
        ]}
      />

      {/* Second row */}
      <StatsCardWithChart
        title="Totaal orders"
        value={mockInvoices.length.toString()}
        change={92}
        subTitle="ORDERS OVER TIJD"
        chart={
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={ordersData}>
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

      <StatsCardWithTable
        title="Online conversie percentage"
        value={`${leadConversionRate.toFixed(2)}%`}
        change={3.6}
        subTitle="CONVERSIE TRECHTER"
        table={conversionFunnel.map(item => ({
          label: item.stage,
          value: `${item.rate}%`,
          subLabel: `${item.count} bezoeken`,
          change: item.change
        }))}
      />

      <StatsCardWithChart
        title="Gemiddelde order waarde"
        value={formatCurrency(totalInvoiceAmount / mockInvoices.length)}
        change={6.7}
        subTitle=""
        chart={
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={averageOrderData}>
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

      {/* Third row */}
      <StatsCardWithTable
        title="Top producten per verkocht aantal"
        table={topProducts.map(product => ({
          label: product.name,
          value: product.count.toString(),
          change: product.change
        }))}
      />

      <StatsCardWithTable
        title="Websitebezoeken per locatie"
        table={locations.map(location => ({
          label: location.country,
          value: location.count.toString(),
          change: location.change
        }))}
      />

      <StatsCardWithTable
        title="Top landingspagina's per bezoek"
        table={landingPages.map(page => ({
          label: page.url,
          value: page.visits.toString(),
          change: page.change
        }))}
      />

      {/* Fourth row */}
      <StatsCardWithTable
        title="Websitebezoeken per verkeersbron"
        table={trafficSources.map(source => ({
          label: source.source,
          value: source.count.toString(),
          change: source.change
        }))}
      />

      <StatsCardWithChart
        title="Totale omzet via marketing campagnes"
        value={formatCurrency(totalInvoiceAmount)}
        change={2.6}
        chart={
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={marketingData}>
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

      <StatsCardWithTable
        title="Websitebezoeken via sociale media"
        table={socialSources.map(source => ({
          label: source.platform,
          value: source.count.toString(),
          change: source.change
        }))}
      />
    </div>
  );
};
