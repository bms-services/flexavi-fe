import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatEuro } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, BarChart } from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { useGetProjectProfit } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";

export const ProjectProfitTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const getProjectProfitZ = useGetProjectProfit(id || "");
  const data = getProjectProfitZ.data?.result;

  const revenue = data?.revenue || 0;
  const costs = data?.costs || 0;
  const profit = data?.profit || 0;
  const profitPercentage = revenue > 0 ? (profit / revenue) * 100 : 0;

  const chartData = [
    { name: "Inkomsten", amount: revenue, color: "#10b981" },
    { name: "Kosten", amount: costs, color: "#f97316" },
    { name: "Winst", amount: profit, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Inkomsten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatEuro(revenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Kosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatEuro(costs)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Winst</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                {formatEuro(profit)}
              </div>
              {profit >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className={`text-sm ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
              {profitPercentage.toFixed(1)}% marge
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Financieel overzicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatEuro(value)} />
                <Legend />
                <Bar dataKey="amount">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kosten specificatie</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categorie</TableHead>
                <TableHead className="text-right">Bedrag</TableHead>
                <TableHead className="text-right">% van totaal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.cost_specification.map((cost) => (
                <TableRow key={cost.id}>
                  <TableCell>{cost.name}</TableCell>
                  <TableCell className="text-right">{formatEuro(Number(cost.url))}</TableCell>
                  <TableCell className="text-right">
                    {costs > 0 ? ((Number(cost.url) / costs) * 100).toFixed(1) : 0}%
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Totaal kosten</TableCell>
                <TableCell className="text-right font-bold">{formatEuro(costs)}</TableCell>
                <TableCell className="text-right font-bold">100%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Inkomsten</TableCell>
                <TableCell className="text-right font-bold">{formatEuro(revenue)}</TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>Winst</TableCell>
                <TableCell className={`text-right font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {formatEuro(profit)}
                </TableCell>
                <TableCell className={`text-right font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {profitPercentage.toFixed(1)}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};