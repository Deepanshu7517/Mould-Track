
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import type { Machine } from "../../lib/data";
import { cn } from "../../lib/utils";
import { Wrench, TrendingUp } from "lucide-preact";
import { format } from "date-fns";

const statusVariant: { [key: string]: "default" | "destructive" | "secondary" | "outline" } = {
  Running: "default",
  Breakdown: "destructive",
  Maintenance: "secondary",
  Idle: "outline",
};

const statusColor = (status: Machine['status']) => {
  switch (status) {
    case 'Running': return 'bg-green-500';
    case 'Breakdown': return 'bg-red-500';
    case 'Maintenance': return 'bg-blue-500';
    case 'Idle': return 'bg-gray-400';
  }
}

export function MachineCard({ machine }: { machine: Machine }) {
  const utilization = (machine.strokeCount / machine.utilizationLimit) * 100;
  const oilLevel = machine.oilLevel || 0;

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "bg-red-500";
    if (utilization >= 75) return "bg-yellow-500";
    return "bg-primary";
  };
  
  const getOilLevelColor = (level: number) => {
    if (level < 25) return "bg-red-500";
    if (level < 50) return "bg-yellow-500";
    return "bg-green-500";
  }

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-bold md:text-lg">{machine.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{machine.id}</p>
                </div>
                <Badge variant={statusVariant[machine.status]} className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", statusColor(machine.status))}></span>
                    {machine.status}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm md:space-y-4 md:text-xs">
            <div>
                <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-muted-foreground">Utilization</span>
                    <span className="font-bold">{machine.strokeCount.toLocaleString()} / {machine.utilizationLimit.toLocaleString()}</span>
                </div>
                <Progress value={utilization} indicatorClassName={getUtilizationColor(utilization)} />
            </div>

            <div>
                <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-muted-foreground">Oil Level</span>
                    <span className="font-bold">{oilLevel}%</span>
                </div>
                <Progress value={oilLevel} indicatorClassName={getOilLevelColor(oilLevel)} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between rounded-lg bg-secondary p-3 text-sm">
                <div className="flex items-center gap-2 font-medium">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Health Score</span>
                </div>
                <span className="text-xl font-bold text-primary">{machine.healthScore}</span>
            </div>
        </CardContent>
        <CardFooter className="flex items-center text-xs text-muted-foreground pt-4">
            <Wrench className="mr-2 h-3 w-3" />
            <span>Last serviced on {format(new Date(machine.lastServiced), "PPP")}</span>
        </CardFooter>
    </Card>
  );
}
