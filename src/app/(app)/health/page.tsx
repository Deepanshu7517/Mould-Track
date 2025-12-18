
'use client';

import { useState } from 'react';
import { PageHeader } from '../../../components/page-header';
import { Button } from '../../../components/ui/button';
import { Stethoscope, AlertTriangle, Zap, } from 'lucide-preact';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../../components/ui/card';
import { HealthCheckForm } from '../../../components/health/health-check-form';
import { QualityDataTable } from '../../../components/health/quality-data-table';
import { HealthScoreCard } from '../../../components/health/health-score-card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { useToast } from '../../../hooks/use-toast';

export default function HealthPage() {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleTriggerZBM = () => {
    toast({
      title: 'ZBM Process Initiated',
      description:
        'Zero Based Maintenance for Mould MLD-45B-01 has been scheduled.',
    });
  };

  return (
    <div className="space-y-8 pb-12 max-md:pb-24 max-sm:pb-30">
      <PageHeader
        title="Tool Health & Quality"
        description="Monitor part quality and tool health for ZBM condition tracking."
      >
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button>
              <Stethoscope className="mr-2 h-4 w-4" />
              Start Health Check
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Digital Health Check</DialogTitle>
              <DialogDescription>
                Submit visual inspection results for a selected mould.
              </DialogDescription>
            </DialogHeader>
            <HealthCheckForm onSubmitSuccess={() => setShowForm(false)} />
          </DialogContent>
        </Dialog>
      </PageHeader>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quality Inspection Data</CardTitle>
              <CardDescription>
                Part rejection rates linked to mould condition.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QualityDataTable />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <HealthScoreCard />
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Repeated Issues Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-destructive">
                High part rejection rate (cavity scratches) detected for Mould
                MLD-45B-01 over the last 3 checks.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleTriggerZBM}
              >
                <Zap className="mr-2 h-4 w-4" />
                Trigger ZBM
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
