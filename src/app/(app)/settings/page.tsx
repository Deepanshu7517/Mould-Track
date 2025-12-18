import { PageHeader } from "../../../components/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Bell,UserCog, Settings2, History, PenSquare, Server } from "lucide-preact";

export default function SettingsPage() {
  return (
    <div className="space-y-4 md:space-y-6 pb-12 max-md:pb-24 max-sm:pb-30">
      <PageHeader
        title="System Settings & Administration"
        description="Manage system configurations, user access, and audit trails."
      />
       <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5" /> User Role Management
              </CardTitle>
              <CardDescription>
                Add/remove users and assign access roles. This section will be available soon.
              </CardDescription>
            </CardHeader>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" /> System Configuration
              </CardTitle>
              <CardDescription>
                Set thresholds, alert rules, and backup settings. This section will be available soon.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" /> Audit Logs
              </CardTitle>
              <CardDescription>
                Track who updated what and when. This section will be available soon.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenSquare className="h-5 w-5" /> Digital Signatures
              </CardTitle>
              <CardDescription>
                Manage digital signature configurations for approvals. This section will be available soon.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" /> System Health
              </CardTitle>
              <CardDescription>
                Monitor server uptime and data sync status. This section will be available soon.
              </CardDescription>
            </CardHeader>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" /> Notifications
              </CardTitle>
              <CardDescription>
                Configure email/SMS alerts and escalation levels. This section will be available soon.
              </CardDescription>
            </CardHeader>
          </Card>
       </div>
    </div>
  );
}
