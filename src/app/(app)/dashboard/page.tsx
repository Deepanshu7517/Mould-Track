
import { PageHeader } from "../../../components/page-header";
import { HealthChart } from "../../../components/dashboard/health-chart";
import { machineData, healthHistory, machineStats } from "../../../lib/data";
import { MachineCard } from "../../../components/dashboard/machine-card";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { CalendarClock, AlertTriangle, ShieldCheck } from "lucide-preact";

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6 pb-12 max-md:pb-24 max-sm:pb-30">
      <PageHeader title="Home Dashboard" description="Live snapshot of all mould machines and maintenance health." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending PM / ZBM</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{machineStats.pendingPM}</div>
            <p className="text-xs text-muted-foreground">Tasks due for maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Breakdowns</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{machineStats.activeBreakdowns}</div>
            <p className="text-xs text-muted-foreground">Machines currently offline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Part Quality Alerts</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{machineStats.qualityAlerts}</div>
            <p className="text-xs text-muted-foreground">High rejection rate batches</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {machineData.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <HealthChart history={healthHistory} />
      </div>
    </div>
  );
}
