import { PageHeader } from "../../../components/page-header";
import { BreakdownData } from "../../../components/breakdowns/breakdown-data";

export default function BreakdownsPage() {
  return (
    <div className="space-y-8 pb-12 max-md:pb-24 max-sm:pb-30">
      <PageHeader 
        title="Breakdown Monitoring" 
        description="Digitally log, analyze, and track breakdown events from initiation to resolution."
      />
      <BreakdownData />
    </div>
  );
}
