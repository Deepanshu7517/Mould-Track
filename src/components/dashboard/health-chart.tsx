
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { ChartTooltipContent, ChartContainer } from "../../components/ui/chart";
import type { HealthHistory } from "../../lib/data";

const chartConfig = {
    avgHealthScore: {
      label: "Avg. Health Score",
      color: "#3b82f6",
    },
  };
  

export function HealthChart({ history }: { history: HealthHistory[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Machine Health Score Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} domain={[60, 100]} />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="avgHealthScore" fill="var(--color-avgHealthScore)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
