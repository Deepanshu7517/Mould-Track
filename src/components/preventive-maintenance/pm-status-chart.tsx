'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import type { PMTask } from '../../lib/data';
import { cn } from '../../lib/utils';

// Reliable Hex Colors
const STATUS_COLORS: Record<string, string> = {
  Completed: '#10b981',   // Emerald
  Overdue: '#f97316',     // Orange
  'In Progress': '#ef4444', // Red
  Scheduled: '#3b82f6',   // Blue
};

interface PMStatusChartProps {
  tasks: PMTask[];
  onStatusSelect: (status: string | null) => void;
  activeStatus: string | null;
}

export function PMStatusChart({ tasks, onStatusSelect, activeStatus }: PMStatusChartProps) {
  // 1. Process Data
  const stats = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(stats).map(([name, value]) => ({ name, value }));
  const totalTasks = tasks.length;

  // 2. SVG Constants for Donut
  const size = 200;
  const strokeWidth = 24; // Wide border look
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Maintenance Status</CardTitle>
        <CardDescription>Breakdown of all PM tasks by status. Click a status to filter.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-8 py-4">
          
          {/* --- CUSTOM DONUT START --- */}
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              {data.map((entry) => {
                const percentage = (entry.value / totalTasks) * 100;
                const strokeDashoffset = circumference - (percentage / 100) * circumference;
                const currentOffset = cumulativeOffset;
                
                // Update offset for next segment
                cumulativeOffset += (percentage / 100) * circumference;

                const isActive = activeStatus === entry.name || !activeStatus;
                const color = STATUS_COLORS[entry.name] || '#cbd5e1';

                return (
                  <circle
                    key={entry.name}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (percentage / 100) * circumference}
                    style={{
                      transform: `rotate(${(currentOffset / circumference) * 360}deg)`,
                      transformOrigin: '50% 50%',
                      transition: 'all 0.5s ease',
                      opacity: isActive ? 1 : 0.2
                    }}
                    className="cursor-pointer hover:brightness-110"
                    onClick={() => onStatusSelect(activeStatus === entry.name ? null : entry.name)}
                  />
                );
              })}
            </svg>

            {/* Center Text Component */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none"
              onClick={() => onStatusSelect(null)}
            >
              <span className="text-4xl font-extrabold text-foreground leading-none">{totalTasks}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Total Tasks</span>
            </div>
          </div>
          {/* --- CUSTOM DONUT END --- */}

          {/* CUSTOM LEGEND */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 w-full">
            {data.map((entry) => {
              const isActive = activeStatus === entry.name || !activeStatus;
              return (
                <button
                  key={entry.name}
                  onClick={() => onStatusSelect(activeStatus === entry.name ? null : entry.name)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all",
                    isActive ? "bg-secondary border-border" : "opacity-40 grayscale-[0.5]"
                  )}
                >
                  <span 
                    className="h-2.5 w-2.5 rounded-full" 
                    style={{ backgroundColor: STATUS_COLORS[entry.name] }} 
                  />
                  <span className="text-xs font-bold text-foreground">
                    {entry.name}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 rounded">
                    {entry.value}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}