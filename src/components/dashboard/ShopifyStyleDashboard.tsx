import React from "react";
import { 
  mockInvoices, 
  mockQuotes, 
  mockLeads, 
  mockProducts
} from "@/data/mockData";
import { 
  calculateQuoteMetrics,
  calculateLeadMetrics,
  calculateInvoiceMetrics,
  generateTimeData
} from "@/utils/dashboardCalculations";
import { SalesMetrics } from "./sections/SalesMetrics";
import { ProductMetrics } from "./sections/ProductMetrics";
import { ConversionMetrics } from "./sections/ConversionMetrics";
import { StatsCardWithChart } from "./stats/StatsCardWithChart";
import { StatsCardWithTable } from "./stats/StatsCardWithTable";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

interface ShopifyStyleDashboardProps {
  timeRange: string;
}

export const ShopifyStyleDashboard: React.FC<ShopifyStyleDashboardProps> = ({ timeRange }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const { totalInvoiceAmount } = calculateInvoiceMetrics(mockInvoices);
  const { totalLeads } = calculateLeadMetrics(mockLeads);

  const trafficSources = [
    { source: "Direct", count: 201, change: 5.8 },
    { source: "Search", count: 167, change: 3.2 },
    { source: "Social", count: 124, change: 7.5 },
    { source: "Email", count: 98, change: -2.1 },
    { source: "Referral", count: 76, change: 9.3 }
  ];

  const locations = [
    { country: "Nederland", count: 1438, change: 5.8 },
    { country: "België", count: 928, change: 51.2 },
    { country: "Duitsland", count: 674, change: 17.1 },
    { country: "Frankrijk", count: 258, change: 15.8 },
    { country: "Verenigd Koninkrijk", count: 90, change: 9.8 }
  ];

  const landingPages = [
    { url: "/producten/dakisolatie", visits: 14234, change: 5.8 },
    { url: "/diensten/zonnepanelen", visits: 14234, change: -3.2 },
    { url: "/producten/dakkapellen", visits: 14234, change: 2.1 },
    { url: "/producten/dakbedekking", visits: 14234, change: 4.8 },
    { url: "/diensten/advies", visits: 14234, change: 9.8 }
  ];

  const socialSources = [
    { platform: "Facebook", count: 167, change: 5.8 },
    { platform: "Instagram", count: 103, change: 12.4 },
    { platform: "Twitter", count: 54, change: -2.3 },
    { platform: "LinkedIn", count: 48, change: 7.9 }
  ];

  const visitsData = generateTimeData(24, 100);
  const ordersData = generateTimeData(24, 15);
  const customersData = generateTimeData(24, 10);
  const averageOrderData = generateTimeData(24, 50);
  const marketingData = generateTimeData(24, 50);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SalesMetrics totalAmount={totalInvoiceAmount} formatCurrency={formatCurrency} />
      
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

      <ConversionMetrics leads={mockLeads} quotes={mockQuotes} />

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

      <StatsCardWithTable
        title="Top producten per verkocht aantal"
        table={mockProducts
          .sort((a, b) => b.pricePerUnit - a.pricePerUnit)
          .slice(0, 4)
          .map(product => ({
            name: product.title,
            count: Math.floor(Math.random() * 100) + 1,
            change: Math.floor(Math.random() * 30) + 1
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
