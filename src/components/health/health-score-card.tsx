
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { TrendingUp, Zap } from 'lucide-preact';

export function HealthScoreCard() {
  const healthScore = 72; // Example score
  const getHealthColor = (score: number) => {
    if (score < 50) return 'text-destructive';
    if (score < 80) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Health Score</CardTitle>
        <CardDescription>Mould: MLD-45B-01</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        <div
          className={`relative flex h-32 w-32 items-center justify-center rounded-full bg-secondary ${getHealthColor(
            healthScore
          )}`}
        >
          <span className="absolute text-4xl font-bold">{healthScore}</span>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 text-left">
          <div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
            <Zap className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Utilization</p>
              <p className="font-bold">High</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
            <TrendingUp className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Quality</p>
              <p className="font-bold">Declining</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
