
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import type { PMTask } from '../../lib/data';
import { cn } from '../../lib/utils';


const COLORS = {
  Completed: 'hsl(var(--chart-1))',
  Overdue: 'hsl(var(--destructive))',
  'In Progress': 'hsl(var(--chart-2))',
  Scheduled: 'hsl(var(--chart-3))',
};

interface PMStatusChartProps {
    tasks: PMTask[];
    onStatusSelect: (status: string | null) => void;
    activeStatus: string | null;
}

export function PMStatusChart({ tasks, onStatusSelect, activeStatus }: PMStatusChartProps) {
  const data = Object.entries(tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }));

  const totalTasks = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomLegend = (props: any) => {
      const { payload } = props;
      return (
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {payload.map((entry: any, index: number) => (
                  <li
                      key={`item-${index}`}
                      onClick={() => onStatusSelect(entry.value === activeStatus ? null : entry.value)}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer transition-opacity",
                        activeStatus && activeStatus !== entry.value ? "opacity-50" : "opacity-100"
                      )}
                  >
                      <span style={{ backgroundColor: entry.color }} className="h-3 w-3 rounded-full inline-block" />
                      <span>{entry.value}: {entry.payload.value}</span>
                  </li>
              ))}
          </ul>
      );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Status</CardTitle>
        <CardDescription>Breakdown of all PM tasks by status. Click a status to filter the table.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                onClick={(pieData) => onStatusSelect(pieData.name === activeStatus ? null : pieData.name)}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} className={cn("cursor-pointer outline-none ring-primary/50 focus:ring-2", activeStatus && activeStatus !== entry.name && "opacity-50" )} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => onStatusSelect(null)}
            title="Show all tasks"
          >
            <span className="text-3xl font-bold">{totalTasks}</span>
            <span className="text-sm text-muted-foreground">Total Tasks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
