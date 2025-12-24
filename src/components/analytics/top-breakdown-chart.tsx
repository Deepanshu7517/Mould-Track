
'use client';

import { RadialBar, RadialBarChart, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { topBreakdownsData } from '../../lib/data';

export function TopBreakdownsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 3 Breakdowns</CardTitle>
        <CardDescription>Most frequent breakdown reasons this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
                innerRadius="10%" 
                outerRadius="80%" 
                data={topBreakdownsData} 
                startAngle={180} 
                endAngle={0}
            >
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                dataKey="value"
              />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
