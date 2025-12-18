"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "../../../components/page-header";
import { MachineMonitorCard } from "../../../components/monitoring/machine-monitor-card";
import type { RealTimeMachineData } from "../../../lib/data";
import { machineData } from "../../../lib/data";

export default function MonitoringPage() {
  const [monitoringData, setMonitoringData] = useState<RealTimeMachineData[]>(
    []
  );

  useEffect(() => {
    // Initialize data on the client to avoid hydration mismatch
    const initialRealTimeData: RealTimeMachineData[] = machineData.map(
      (machine) => ({
        ...machine,
        cycleTime: Math.random() * (15 - 12) + 12, // Random initial cycle time between 12-15s
        partCount: machine.strokeCount,
        liveStatus: machine.status,
      })
    );
    setMonitoringData(initialRealTimeData);

    const interval = setInterval(() => {
      setMonitoringData((prevData) =>
        prevData.map((machine) => {
          if (machine.liveStatus !== "Running") {
            return machine;
          }

          const strokeIncrement = Math.floor(Math.random() * 5) + 1;
          const newStrokeCount = machine.partCount + strokeIncrement;
          const newUtilization =
            (newStrokeCount / machine.utilizationLimit) * 100;

          let newStatus: any = machine.liveStatus;
          if (newUtilization >= 98) {
            newStatus = "Maintenance"; // Trigger maintenance state
          }

          return {
            ...machine,
            partCount: newStrokeCount,
            cycleTime: Math.random() * (15 - 12) + 12, // Simulate cycle time fluctuation
            liveStatus: newStatus,
          };
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 pb-12 max-md:pb-24 max-sm:pb-30">
      <PageHeader
        title="Real-Time Monitoring"
        description="Track mould performance and utilization during operation."
      />
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {monitoringData.map((machine) => (
          <MachineMonitorCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
