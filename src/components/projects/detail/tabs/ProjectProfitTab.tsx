
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types/project";
import { formatCurrency } from "@/utils/format";
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

interface ProjectProfitTabProps {
  project: Project;
}

export const ProjectProfitTab: React.FC<ProjectProfitTabProps> = ({ project }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Calculate expenses
    const expensesTotal = project.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const personnelTotal = project.personnel.reduce((sum, person) => sum + person.totalCost, 0);
    const totalCosts = expensesTotal + personnelTotal;
    
    // Prepare chart data
    const data = [
      { name: "Inkomsten", amount: project.revenue, color: "#10b981" },
      { name: "Materiaal kosten", amount: expensesTotal, color: "#f97316" },
      { name: "Personeelskosten", amount: personnelTotal, color: "#3b82f6" },
      { name: "Winst", amount: project.revenue - totalCosts, color: "#8b5cf6" },
    ];
    
    setChartData(data);
  }, [project]);

  const expensesTotal = project.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const personnelTotal = project.personnel.reduce((sum, person) => sum + person.totalCost, 0);
  const totalCosts = expensesTotal + personnelTotal;
  const profit = project.revenue - totalCosts;
  const profitPercentage = project.revenue > 0 ? (profit / project.revenue) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Inkomsten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(project.revenue)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Kosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCosts)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Winst</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                {formatCurrency(profit)}
              </div>
              {profit >= 0 ? 
                <TrendingUp className="h-5 w-5 text-green-500" /> : 
                <TrendingDown className="h-5 w-5 text-red-500" />
              }
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
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
              <TableRow>
                <TableCell>Materiaal kosten</TableCell>
                <TableCell className="text-right">{formatCurrency(expensesTotal)}</TableCell>
                <TableCell className="text-right">
                  {totalCosts > 0 ? ((expensesTotal / totalCosts) * 100).toFixed(1) : 0}%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Personeelskosten</TableCell>
                <TableCell className="text-right">{formatCurrency(personnelTotal)}</TableCell>
                <TableCell className="text-right">
                  {totalCosts > 0 ? ((personnelTotal / totalCosts) * 100).toFixed(1) : 0}%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Totaal kosten</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(totalCosts)}</TableCell>
                <TableCell className="text-right font-bold">100%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Inkomsten</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(project.revenue)}</TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  Winst
                </TableCell>
                <TableCell className={`text-right font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {formatCurrency(profit)}
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
