
'use client';

import { PageHeader } from "../../../components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { DollarSign, Wrench, Package, ShieldCheck, TrendingDown, TrendingUp, Users, ClipboardList } from "lucide-preact";
import { PmPlanVsActualChart } from "../../../components/analytics/pm-plan-vs-actual-plan";
import { KpiCard } from "../../../components/analytics/kpi-card";
import { SkillMatrix } from "../../../components/analytics/skill-matrix";
import { BreakdownTrendChart } from "../../../components/analytics/breakdown-trend-chart";
import { TopBreakdownsChart } from "../../../components/analytics/top-breakdown-chart";
import { pmPlanningStats, sparePartStats } from "../../../lib/data";


export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics Dashboard"
        description="Deep dive into maintenance, operations, and team performance."
      />
      <Tabs defaultValue="pm-planning" className="space-y-4">
        <TabsList className="grid grid-cols-2 h-auto sm:grid-cols-4">
            <TabsTrigger value="pm-planning">
                <ClipboardList className="mr-2 h-4 w-4" /> PM Planning
            </TabsTrigger>
            <TabsTrigger value="breakdowns">
                <Wrench className="mr-2 h-4 w-4" /> Breakdowns
            </TabsTrigger>
            <TabsTrigger value="spares">
                <Package className="mr-2 h-4 w-4" /> Spares
            </TabsTrigger>
            <TabsTrigger value="health">
                <ShieldCheck className="mr-2 h-4 w-4" /> Health
            </TabsTrigger>
        </TabsList>
        <TabsContent value="pm-planning">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Monthly PM Status" value={`${pmPlanningStats.monthlyStatus}%`} description="On Date" icon={<TrendingUp />} />
                <KpiCard title="Passed Due" value={pmPlanningStats.passedDue} description="Moulds" icon={<TrendingDown />} />
                 <KpiCard title="Yearly Plan vs Actual" value={`${pmPlanningStats.yearlyPlanVsActual.plan}/${pmPlanningStats.yearlyPlanVsActual.actual}`} description="PMs Completed" icon={<ClipboardList />} />
                <KpiCard title="Team Members" value={pmPlanningStats.teamMembers} description="Active" icon={<Users />} />
            </div>
            <div className="grid gap-4 mt-4 grid-cols-1">
                <PmPlanVsActualChart />
            </div>
             <div className="grid gap-4 mt-4 grid-cols-1">
                <SkillMatrix />
            </div>
        </TabsContent>
         <TabsContent value="breakdowns">
           <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <BreakdownTrendChart />
                <TopBreakdownsChart />
           </div>
        </TabsContent>
        <TabsContent value="spares">
           <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
              <KpiCard title="Mould Spare Consumption" value={`$${sparePartStats.mouldSpareConsumption}`} description="This Month" icon={<DollarSign />} />
              <KpiCard title="Fixture Spare Consumption" value={`$${sparePartStats.fixtureSpareConsumption}`} description="This Month" icon={<DollarSign />} />
              <KpiCard title="Re-Order Level Met" value={sparePartStats.reorderLevelMet} description="Items" icon={<Package />} />
           </div>
           <div className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>More spare part analytics are under development.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Detailed graphs for Mould-wise, Fixture-wise, and monthly consumption trends are being built.</p>
                </CardContent>
            </Card>
           </div>
        </TabsContent>
         <TabsContent value="health">
           <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>Mould health analytics are under development.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Charts for yearly/monthly health check plans and plan vs. actual graphs will be available here soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
