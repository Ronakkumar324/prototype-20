import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { deriveFeatureAdoption, UpsellUserWithScore } from "@/lib/upsellLogic";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface FeatureAdoptionChartProps {
  users: UpsellUserWithScore[];
}

const FeatureAdoptionChart = ({ users }: FeatureAdoptionChartProps) => {
  const chartData = deriveFeatureAdoption(users);

  return (
    <Card className="overflow-hidden border-border/60 bg-card/90 shadow-subtle">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Feature Adoption Overview</CardTitle>
          <CardDescription>
            Frequency of advanced feature usage across your customer base.
          </CardDescription>
        </div>
        <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
          AI weighted signals
        </Badge>
      </CardHeader>
      <CardContent className="h-[280px] px-2 pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={26}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.1)" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "rgba(59, 130, 246, 0.08)" }}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid rgba(59, 130, 246, 0.2)",
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 20px 45px -30px rgba(14, 116, 231, 0.55)",
              }}
            />
            <Bar dataKey="frequency" fill="hsl(var(--primary))" radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FeatureAdoptionChart;
