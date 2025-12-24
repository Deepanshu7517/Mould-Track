
'use client';

import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const data = {
  yearly: [
    { name: 'Jan', plan: 400, actual: 240 },
    { name: 'Feb', plan: 300, actual: 139 },
    { name: 'Mar', plan: 200, actual: 980 },
    { name: 'Apr', plan: 278, actual: 390 },
    { name: 'May', plan: 189, actual: 480 },
    { name: 'Jun', plan: 239, actual: 380 },
    { name: 'Jul', plan: 349, actual: 430 },
  ],
  quarterly: [
    { name: 'Q1', plan: 900, actual: 1359 },
    { name: 'Q2', plan: 600, actual: 1250 },
    { name: 'Q3', plan: 500, actual: 800 },
    { name: 'Q4', plan: 400, actual: 600 },
  ],
  monthly: [
    { name: 'Week 1', plan: 100, actual: 60 },
    { name: 'Week 2', plan: 80, actual: 50 },
    { name: 'Week 3', plan: 70, actual: 65 },
    { name: 'Week 4', plan: 90, actual: 80 },
  ],
  '7-days': [
    { name: 'Day 1', plan: 20, actual: 15 },
    { name: 'Day 2', plan: 20, actual: 18 },
    { name: 'Day 3', plan: 15, actual: 12 },
    { name: 'Day 4', plan: 15, actual: 15 },
    { name: 'Day 5', plan: 25, actual: 22 },
    { name: 'Day 6', plan: 20, actual: 19 },
    { name: 'Day 7', plan: 10, actual: 8 },
  ],
};

type TimeFrame = '7-days' | 'monthly' | 'quarterly' | 'yearly';

export function PmPlanVsActualChart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('yearly');

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>PM Plan vs. Actual</CardTitle>
            <CardDescription>Comparison of planned vs. actual preventive maintenance tasks.</CardDescription>
          </div>
          <Select onValueChange={(value: TimeFrame) => setTimeframe(value)} defaultValue={timeframe}>
            <SelectTrigger className="w-full sm:w-[180px] mt-2 sm:mt-0">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7-days">Last 7 Days</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data[timeframe]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
              <Legend />
              <Bar dataKey="plan" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
