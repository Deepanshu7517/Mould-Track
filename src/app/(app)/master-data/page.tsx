import { PageHeader } from "../../../components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { MouldMaster } from "../../../components/settings/mould-master";
import { MachineMaster } from "../../../components/settings/machine-master";
import { TeamMaster } from "../../../components/settings/team-master";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { FileText, SlidersHorizontal, List, Users, Wrench } from "lucide-preact";
import { FixtureMaster } from "../../../components/settings/fixture-master";

export default function MasterDataPage() {
  return (
    <div className="space-y-8 pb-12 max-md:pb-24 max-sm:pb-30">
      <PageHeader
        title="Master Data Management"
        description="Manage moulds, machines, teams, spares, and system configurations."
      />
      <Tabs defaultValue="moulds" className="space-y-4">
        <TabsList>
          <TabsTrigger value="moulds">
            <Wrench className="mr-2 h-4 w-4" /> Mould Master
          </TabsTrigger>
          <TabsTrigger value="machines">
            <SlidersHorizontal className="mr-2 h-4 w-4" />Mould Machine Master
          </TabsTrigger>
          <TabsTrigger value="teams">
            <Users className="mr-2 h-4 w-4" /> User Master
          </TabsTrigger>
          <TabsTrigger value="fixture">
            <Users className="mr-2 h-4 w-4" /> Fixture
          </TabsTrigger>
          <TabsTrigger value="spares">
            <List className="mr-2 h-4 w-4" /> Spares List
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" /> Maintenance Templates
          </TabsTrigger>
        </TabsList>
        <TabsContent value="moulds">
            <MouldMaster />
        </TabsContent>
        <TabsContent value="machines">
            <MachineMaster />
        </TabsContent>
        <TabsContent value="teams">
            <TeamMaster />
        </TabsContent>
        <TabsContent value="fixture">
            <FixtureMaster />
        </TabsContent>
         <TabsContent value="spares">
            <Card>
                <CardHeader>
                    <CardTitle>Spare Parts & Consumables</CardTitle>
                    <CardDescription>Manage the inventory of spare parts and consumables. This feature is under development.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">A table to add, edit, and delete spare parts with details like Part No., Name, Stock, and Location will be available here.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="templates">
             <Card>
                <CardHeader>
                    <CardTitle>Maintenance Templates</CardTitle>
                    <CardDescription>Create and manage standardized checklists for PM and ZBM tasks. This feature is under development.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">A section to define templates for maintenance checklists will be available here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
