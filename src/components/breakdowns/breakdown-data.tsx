
'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { PlusCircle, AlertCircle, Wrench, Repeat, Clock } from 'lucide-preact';
import { BreakdownReportForm } from './breakdown-report-form';
import { BreakdownTable } from './breakdown-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '../../components/ui/dialog';
import { breakdownLogs as initialBreakdownLogs, type BreakdownLog } from '../../lib/data';

export function BreakdownData() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [breakdownLogs, setBreakdownLogs] = useState<BreakdownLog[]>(initialBreakdownLogs);

  const kpiData = {
    mttr: '2.8h',
    mtbf: '635h',
    recurrence: 1.8,
  };

  const handleReportSuccess = (newLog: Omit<BreakdownLog, 'id' | 'downtimeEnd' | 'status' | 'recurrence'>) => {
    const newBreakdown: BreakdownLog = {
      ...newLog,
      id: `BD-00${breakdownLogs.length + 1}`,
      downtimeStart: new Date().toISOString(),
      downtimeEnd: null,
      status: 'Open',
      recurrence: 1, 
    };
    setBreakdownLogs(prevLogs => [newBreakdown, ...prevLogs]);
    setIsDialogOpen(false);
  };
  
  const handleCloseTicket = (id: string) => {
      setBreakdownLogs(prevLogs => prevLogs.map(log => 
          log.id === id ? { ...log, status: 'Closed', downtimeEnd: new Date().toISOString() } : log
      ));
  };


  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Breakdowns</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">{breakdownLogs.filter(log => log.status === 'Open').length}</div>
                <p className="text-xs text-muted-foreground">Machines currently offline</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. MTTR</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{kpiData.mttr}</div>
                <p className="text-xs text-muted-foreground">Mean Time To Repair</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. MTBF</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{kpiData.mtbf}</div>
                <p className="text-xs text-muted-foreground">Mean Time Between Failures</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Recurrence</CardTitle>
                <Repeat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{kpiData.recurrence.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">Avg. issue recurrence count</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Breakdown Logs</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Report Breakdown
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Report a New Breakdown</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to log a new machine breakdown
                    event.
                  </DialogDescription>
                </DialogHeader>
                <BreakdownReportForm onSubmitSuccess={handleReportSuccess as any} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <BreakdownTable breakdownLogs={breakdownLogs} onCloseTicket={handleCloseTicket} />
        </CardContent>
      </Card>
    </>
  );
}
