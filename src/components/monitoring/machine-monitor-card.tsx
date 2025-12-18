
"use client";

import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import type { RealTimeMachineData } from "../../lib/data";
import { cn } from "../../lib/utils";
import { Stethoscope, AlertTriangle, Timer, Package, Play, Pause } from "lucide-preact";
import { useToast } from "../../hooks/use-toast";

const statusVariant: { [key: string]: "default" | "destructive" | "secondary" | "outline" } = {
  Running: "default",
  Breakdown: "destructive",
  Maintenance: "secondary",
  Idle: "outline",
};

const statusConfig = {
  Running: { color: 'bg-green-500', icon: <Play className="h-4 w-4" /> },
  Breakdown: { color: 'bg-red-500', icon: <AlertTriangle className="h-4 w-4" /> },
  Maintenance: { color: 'bg-blue-500', icon: <Stethoscope className="h-4 w-4" /> },
  Idle: { color: 'bg-gray-400', icon: <Pause className="h-4 w-4" /> },
};


export function MachineMonitorCard({ machine }: { machine: RealTimeMachineData }) {
  const { toast } = useToast();
  const utilization = (machine.partCount / machine.utilizationLimit) * 100;

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 95) return "bg-red-500";
    if (utilization >= 85) return "bg-yellow-500";
    return "bg-primary";
  };
  
  const isNearThreshold = utilization >= 95;

  useEffect(() => {
    if (isNearThreshold && machine.liveStatus === 'Running') {
      toast({
        title: "Maintenance Alert",
        description: `Machine ${machine.name} is nearing its maintenance threshold. An email has been sent to schedule a health check.`,
        variant: "destructive",
      });
    }
  }, [isNearThreshold, machine.name, machine.liveStatus, toast]);

  const handleManualCheck = () => {
    toast({
      title: "Health Check Triggered",
      description: `A manual health check has been initiated for ${machine.name}.`,
    });
  }

  const currentStatusConfig = statusConfig[machine.liveStatus];

  return (
    <Card className={cn("flex flex-col", isNearThreshold && machine.liveStatus === 'Running' && "border-destructive/50 ring-2 ring-destructive/20")}>
        <CardHeader>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <CardTitle className="text-lg font-bold md:text-lg">{machine.name}</CardTitle>
                    <CardDescription>{machine.id}</CardDescription>
                </div>
                <Badge variant={statusVariant[machine.liveStatus]} className="flex items-center gap-2 shrink-0">
                    <span className={cn("h-2 w-2 rounded-full", currentStatusConfig.color)}></span>
                    {machine.liveStatus}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-5">
            <div className="text-sm md:text-xs">
                <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-muted-foreground">Utilization</span>
                    <span className="font-bold">{utilization.toFixed(1)}%</span>
                </div>
                <Progress value={utilization} indicatorClassName={getUtilizationColor(utilization)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-xs text-muted-foreground">Part Count</p>
                        <p className="font-bold text-base">{machine.partCount.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                    <Timer className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-xs text-muted-foreground">Cycle Time</p>
                        <p className="font-bold text-base">{machine.cycleTime.toFixed(2)}s</p>
                    </div>
                </div>
            </div>

            {isNearThreshold && machine.liveStatus === 'Running' && (
                 <div className="flex items-center gap-2 text-sm p-3 rounded-lg bg-destructive/10 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    <p className="font-medium">Maintenance threshold nearly reached.</p>
                </div>
            )}

        </CardContent>
        <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleManualCheck} disabled={machine.liveStatus !== 'Running'}>
                <Stethoscope className="mr-2 h-4 w-4" />
                Trigger Manual Health Check
            </Button>
        </CardFooter>
    </Card>
  );
}
